import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AlbumsImages from "./AlbumsImages";
import useImages from "../../hooks/useImages";
import ImageUpLoader from "../ImageUpLoader";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAlbum from "../../hooks/useAlbum";
import useClipboard from "react-use-clipboard";

const Albums = () => {
  // hämta bilder från DB där de har samma uid som album !
  const { albumId } = useParams();
  const { images } = useImages(albumId);
  const { album, loading } = useAlbum(albumId);
  const [reviewLink, setReviewLink] = useState(null);
  const [isCopied, setCopied] = useClipboard(reviewLink);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  const createReviewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/review/${album}`;
    setReviewLink(url);
  };

  return (
    <>
      <div>
        <h5 className="mt-5 mb-5">
          This is Album <strong>"{album.title}"</strong>
        </h5>
        <Button className="btn btn-info btn-lg ">
          <Link
            className="text-light text-decoration-none "
            to={`/albums/edit/${albumId}`}
          >
            Edit Album
          </Link>
        </Button>
        <Button
          className="btn btn-info btn-lg ml-3"
          onClick={() => {
            createReviewLink(albumId);
          }}
        >
          Create client review
        </Button>
        {reviewLink && (
          <p>
            Review link:{" "}
            <Button className=" btn btn-info btn-lg ml-3" onClick={setCopied}>
              {isCopied ? "Copied " : "Copy Link "}
            </Button>
          </p>
        )}
        <ImageUpLoader albumId={albumId} />

        <AlbumsImages images={images} />
      </div>
    </>
  );
};

export default Albums;
