import React from "react";
import { useParams } from "react-router-dom";
import AlbumsImages from "./AlbumsImages";
import useImages from "../hooks/useImages";

const Albums = () => {
  // hämta bilder från DB där de har samma uid som album !

  const { albumId } = useParams();
  const { images } = useImages(albumId);
  return (
    <div>
      <h5 className="mt-5">This is Album component "{albumId}"</h5>

      <AlbumsImages images={images} />
    </div>
  );
};

export default Albums;
