import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AlbumsImages from "./AlbumsImages";
import useImages from "../../hooks/useImages";
import ImageUpLoader from "../ImageUpLoader";
import { Link } from "react-router-dom";
import useAlbum from "../../hooks/useAlbum";
import useClipboard from "react-use-clipboard";
import { db } from "../../firebase";
import firebase from "../../firebase/index";
import { useAuth } from "../../contexts/AuthContext";
import ImageLightBox from "../LightBox/ImageLightBox";

const Albums = () => {
  const { currentUser } = useAuth();
  const { albumId } = useParams();
  const { images } = useImages(albumId);
  const { album, loading } = useAlbum(albumId);
  const [error, setError] = useState(false);
  const [reviewLink, setReviewLink] = useState(null);
  const [selectedImages, setSelectedImage] = useState([]);
  const [isCopied, setCopied] = useClipboard(reviewLink);
  const [title, setTitle] = useState("");
  const [titleChanged, setTitleChanged] = useState(false);
  const navigate = useHistory();
  const [selectedImg, setSelectedImg] = useState(null);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const createReviewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/review/${album}`;
    setReviewLink(url);
  };

  const handleName = (e) => {
    setTitle(e.target.value);
  };

  const handleNewAlbum = async (e) => {
    e.preventDefault();

    try {
      const docRef = await db.collection("albums").add({
        title,
        owner: currentUser.uid,
      });

      await selectedImages.forEach((image) => {
        db.collection("images")
          .doc(image)
          .update({
            album: firebase.firestore.FieldValue.arrayUnion(
              db.collection("albums").doc(docRef.id)
            ),
          });
      });
      navigate.push(`/albums`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageArray = async (e) => {
    let newImages = [];
    if (e.target.checked === true) {
      if (selectedImages.includes(e.target.id)) {
        return;
      }
      newImages.push(e.target.id);
      setSelectedImage(selectedImages.concat(newImages));
    }
  };

  return (
    <>
      <div>
        <h5 className="mt-5 mb-5">
          This is Album <strong>"{album.title}"</strong>
        </h5>

        <Button className="btn btn-info btn-lg mt-2 ">
          <Link
            className="text-light text-decoration-none "
            to={`/albums/edit/${albumId}`}
          >
            Edit Album
          </Link>
        </Button>

        <Button
          className="btn btn-info btn-lg ml-3 mt-2 "
          onClick={() => {
            createReviewLink(albumId);
          }}
        >
          Create client review
        </Button>

        <Button
          className="btn btn-info btn-lg ml-3 mt-2"
          onClick={() => {
            setTitleChanged(!titleChanged);
          }}
        >
          {titleChanged ? "Close" : "Create album"}
        </Button>

        {titleChanged && (
          <div className="d-flex justify-content-center ">
            <Form onSubmit={handleNewAlbum} className="w-50 p-3 text-center">
              <Form.Group id="title">
                <Form.Label>New Album Title</Form.Label>
                <Form.Control
                  type="title"
                  onChange={handleName}
                  value={title}
                  required
                />
                {error && <p>{error}</p>}
                {title && title.length < 4 && (
                  <Form.Text className="text-info">
                    Please enter a title at least 4 characters long.
                  </Form.Text>
                )}
              </Form.Group>

              <Button
                className="btn btn-info btn-lg text-decoration-none"
                disabled={loading}
                type="submit"
              >
                Create New Album
              </Button>
            </Form>
          </div>
        )}

        {reviewLink && (
          <p className="mt-2 text-muted font-weight-light">
            {reviewLink}
            <Button className=" btn btn-info btn-sm ml-3" onClick={setCopied}>
              {isCopied ? "Copied " : "Copy Link "}
            </Button>
          </p>
        )}

        <ImageUpLoader albumId={albumId} />
        <AlbumsImages
          images={images}
          handleImageArray={handleImageArray}
          setSelectedImg={setSelectedImg}
        />
        {selectedImg && (
          <ImageLightBox
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
          />
        )}
      </div>
    </>
  );
};

export default Albums;
