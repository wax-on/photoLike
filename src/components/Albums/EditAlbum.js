import { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Form, Row, Col, Button } from "react-bootstrap";
import { db } from "../../firebase";
import useAlbum from "../../hooks/useAlbum";

const EditAlbum = () => {
  const { albumId } = useParams();
  const editRef = useRef();
  const [error, setError] = useState(null);
  const navigate = useHistory();
  const { album, loading } = useAlbum(albumId);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await db.collection("albums").doc(albumId).update({
        title: editRef.current.value,
      });

      navigate.push(`/albums`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6} lg={4}>
        <h1>Edit Album</h1>
        {error && <Alert variant="warning">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              ref={editRef}
              defaultValue={album.title}
              required
            />
          </Form.Group>

          <Button className="btn btn-info btn-lg" type="submit">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default EditAlbum;
