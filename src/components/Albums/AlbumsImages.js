import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { IoIosHeart } from "react-icons/io";

const AlbumsImages = ({ images, handleImageArray, handleLikes }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <Row className="mb-3 w-90 mr-3 ml-3 mt-4">
        {images &&
          images.map((image) => (
            <Col sm={6} md={4} lg={3}>
              <Card key={image.id} className="mb-3 border-0 ">
                <Card.Img
                  style={{ width: "auto", height: "300px" }}
                  variant="top"
                  src={image.url}
                />
                {currentUser ? (
                  <div>
                    <input
                      type="checkbox"
                      id={image.id}
                      className="mr-2"
                      onChange={handleImageArray}
                    />
                    <label htmlFor="selected-photo">Select</label>
                  </div>
                ) : (
                  <>
                    <Row
                      id={image.id}
                      className="d-flex justify-content-between ml-5 mr-5 mt-3"
                    >
                      <button
                        className="iliked"
                        onClick={() => handleLikes(image, true)}
                      >
                        <IoIosHeart className="likeHeart" size="2em" />
                      </button>

                      <button
                        className="idisLiked"
                        onClick={() => handleLikes(image, false)}
                      >
                        <IoIosHeart className="disLikedHeart" size="2em" />
                      </button>
                    </Row>
                  </>
                )}
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default AlbumsImages;
