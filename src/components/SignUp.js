import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { singup } = useAuth();
  const navigate = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords no match");
    }
    setError(null);

    try {
      setLoading(true);
      // skapa en användre med email och password
      await singup(emailRef.current.value, passwordRef.current.value);
      navigate.push("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
    // console.log("email", emailRef.current.value);
    // console.log("password", passwordRef.current.value);
    // console.log("passwordConf", passwordConfirmRef.current.value);

    //Kolla om användare har skrivit in samma lösen två ggr?
  };
  return (
    <>
      <Row className="text-left mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Sign Up</Card.Title>

              {error && (
                <Alert variant="danger" className="text-sm">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password confermation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />

                  <Button disabled={loading} type="submit" className="mt-3">
                    Create Account
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
