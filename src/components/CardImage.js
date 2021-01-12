import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const CardImage = ({ image }) => {
  return (
    <Col sm={6} md={4} lg={3}>
      <Card className="mb-3 ">
        <Card.Img variant="top" src={image.url} />

        <Card.Body>
          <Card.Text className="text-muted small">
            {image.name} ({Math.round(image.size / 1024)} kb)
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardImage;
