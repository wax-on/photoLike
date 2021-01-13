import React from "react";
import { useParams } from "react-router-dom";
import AlbumsImages from "./AlbumsImages";
import useImages from "../../hooks/useImages";
import useAlbum from "../../hooks/useAlbum";

const ReviewAlbum = () => {
  const { albumId } = useParams();
  const { album, loading } = useAlbum(albumId);
  const { images } = useImages(albumId);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <h5 className="mt-5 mb-5">
        This is Album <strong>"{album.title}" </strong>
        that you can Review
      </h5>

      <AlbumsImages images={images} />
    </>
  );
};

export default ReviewAlbum;
