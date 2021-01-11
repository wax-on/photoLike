import React from "react";
import CardImage from "./CardImage";
import useImages from "../hooks/useImages";
import ImageUpLoader from "./ImageUpLoader";
import Row from "react-bootstrap/Row";

const Photos = () => {
  const { images } = useImages();
  return (
    <div>
      <ImageUpLoader multiple={false} />
      <Row className="mb-5">
        {images.map((image) => (
          <CardImage image={image} key={image.id} />
        ))}
      </Row>
    </div>
  );
};

export default Photos;
