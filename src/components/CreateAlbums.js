import React, { useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
const CreateAlbums = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const { currentUser } = useAuth();
  const navigate = useHistory();

  const handelTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (title.length < 4) {
      return;
    }
    console.log(`vill skapa ett album med titlen "${title}"`);

    setError(false);
    setLoading(true);
    try {
      const docRef = await db.collection("albums").add({
        title,
        owner: currentUser.uid,
      });

      navigate.push(`/albums/${docRef.id}`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="border-0">
            <Card.Body>
              <Card.Title>Create a New Album</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handelSubmit}>
                <Form.Group id="title">
                  <Form.Label>Album Title</Form.Label>
                  <Form.Control
                    type="title"
                    onChange={handelTitleChanged}
                    value={title}
                    required
                  />
                  {title && title.length < 4 && (
                    <Form.Text className="text-info">
                      Please enter a title at least 4 characters long.
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  className="btn btn-info btn-lg text-decoration-none"
                  disabled={loading}
                  type="submit"
                >
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateAlbums;
