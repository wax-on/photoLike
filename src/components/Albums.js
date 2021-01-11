import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { db } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Picsses from "../assets/imgs/1.jpg";

const Albums = () => {
  const { currentUser } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // hämta alla album från DB som denna avändare äger!
  useEffect(() => {
    const unsub = db
      .collection("albums")
      .where("owner", "==", currentUser.uid)
      .orderBy("title")
      .onSnapshot((snapshot) => {
        setLoading(true);
        const dbAlbums = [];
        snapshot.forEach((doc) => {
          dbAlbums.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setAlbums(dbAlbums);
        setLoading(false);
      });
    return unsub;
  }, [currentUser]);
  return (
    <>
      <h2 className="mt-5">Albums</h2>
      <div className="mt-5">{loading && <p>Loading...</p>}</div>
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
      <div>
        <Button className="btn btn-info btn-lg">
          <Link className="text-light " to="/albums/create">
            Create Album
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Albums;
