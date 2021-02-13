import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import useAlbums from "../../hooks/useAlbums";
import Picsses from "../../assets/imgs/1.jpg";

const Albums = () => {
  const { albums, loading } = useAlbums();

  return (
    <>
      <h2 className="mt-5">Albums</h2>
      <div className="mt-5">{loading && <p>Loading...</p>}</div>
      <Button className="btn btn-info btn-lg mb-5 mt-3">
        <Link className="text-light text-decoration-none " to="/albums/create">
          Create Album
        </Link>
      </Button>
      {!loading && (
        <Row>
          {albums.map((album) => (
            <Col sm={6} md={4} lg={3} key={album.id}>
              <Card className="mb-3 w-90 mr-3 ml-3">
                <Link to={`/albums/${album.id}`}>
                  <Card.Img variant="top" title={album.title} src={Picsses} />
                </Link>
                <Card.Body>
                  <Card.Title className="mb-0">
                    <Link
                      className="text-uppercase text-dark font-weight-light text-decoration-none "
                      to={`/albums/${album.id}`}
                    >
                      {album.title}
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Albums;
