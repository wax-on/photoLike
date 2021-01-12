import React from "react";
import CardImage from "./CardImage";
import Row from "react-bootstrap/Row";

const AlbumsImages = ({ images }) => {
  return (
    <>
      {/* <div>
        denna kommer att hämta alla bilder i detta album! {images.length}
      </div> */}
      <Row className="mb-3 w-90 mr-3 ml-3 mt-4">
        {images.map((image) => (
          <CardImage image={image} key={image.id} />
        ))}
      </Row>
    </>
  );
};

export default AlbumsImages;
