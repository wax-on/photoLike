import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebase";
import AlbumsImages from "./AlbumsImages";
import useImages from "../../hooks/useImages";
import useAlbum from "../../hooks/useAlbum";

const ReviewAlbum = () => {
  const { albumId } = useParams();

  const { images } = useImages(albumId);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [likedImage, setLikedImage] = useState([]);
  const [reviewImage, setReviewImage] = useState([]);

  const { album, loading } = useAlbum(albumId);
  const navigate = useHistory();

  useEffect(() => {
    async function getImages() {
      const imagesList = await Promise.all(
        images.map((image) => {
          return {
            id: image.id,
            like: undefined,
          };
        })
      );
      setReviewImage(imagesList);
    }
    getImages();
  }, [images]);

  useEffect(() => {
    let likedArray = reviewImage.filter((image) => {
      return image.like === true;
    });
    setLikedImage(likedArray);

    let result = reviewImage.every((image) => image.like !== undefined);
    if (result === false) {
      setDisabled(true);
      return;
    } else if (result === true) {
      setDisabled(false);
    }
  }, [reviewImage]);

  const handleReview = async () => {
    const date = new Date();
    const title = `${album.title} || ${date.toISOString().substring(0, 10)}`;

    setError(false);

    try {
      const docRef = await db.collection("albums").add({
        title,
        owner: album.owner,
      });
      await likedImage.forEach((image) => {
        db.collection("images")
          .doc(image.id)
          .update({
            album: firebase.firestore.FieldValue.arrayUnion(
              db.collection("albums").doc(docRef.id)
            ),
          });
      });
      navigate.push(`/done`);
    } catch (error) {
      setError(error.message);
    }
  };

  const likeOrDisLike = (id, liked) => {
    let Row = document.getElementById(id);
    if (liked === true) {
      Row.getElementsByClassName("iliked")[0].classList.add("iliked-active");
      Row.getElementsByClassName("idisLiked")[0].classList.remove(
        "idisLiked-active"
      );
    } else if (liked === false) {
      Row.getElementsByClassName("idisLiked")[0].classList.add(
        "idisLiked-active"
      );
      Row.getElementsByClassName("iliked")[0].classList.remove("iliked-active");
    }
  };

  const handleLikes = (image, liked) => {
    let updatedImagesArray = reviewImage.map((img) => {
      if (img.id === image.id) {
        return {
          id: img.id,
          like: liked,
        };
      } else {
        return img;
      }
    });
    setReviewImage(updatedImagesArray);
    likeOrDisLike(image.id, liked);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <h5 className="mt-5 mb-5">
        This is Album <strong>"{album.title}" </strong>
        that you can Review
      </h5>

      <AlbumsImages images={images} handleLikes={handleLikes} key={images.id} />

      <p className="text-center">
        You have liked : {likedImage.length} / {images.length}
      </p>

      <div className="d-flex justify-content-center mb-5">
        <button
          disabled={disabled}
          className="btn btn-info"
          onClick={handleReview}
        >
          Send Review
        </button>
      </div>

      {error && <p>{error}</p>}
    </>
  );
};

export default ReviewAlbum;
