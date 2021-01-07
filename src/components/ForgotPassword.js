import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your mail for the reset email!");
    } catch (e) {
      setError("No user or the user is deleted! or the email is wrong!");
      setLoading(false);
    }
  };
  return (
    <>
      <Row className="text-left mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Forgot your Password</Card.Title>

              {error && (
                <Alert variant="danger" className="text-sm">
                  {error}
                </Alert>
              )}
              {message && (
                <Alert variant="info" className="text-sm">
                  {message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Button disabled={loading} type="submit" className="mt-3">
                    Reset Password
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <div>
            <div className="text-center mt-3">
              No account? <Link to="/signup">Sign up now!</Link>
            </div>
            <div className="text-center">
              Login <Link to="/login">Log in</Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
