import React from "react";
import "../App.css";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const { logout, currentUser } = useAuth();
  let navigate = useHistory();

  const handleLogout = async () => {
    await logout();
    navigate.push("/");
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Photo Reviewer</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/albums">Albums</Nav.Link>
          <Nav.Link href="/reviedalbums">Reviewed</Nav.Link>

          {currentUser ? (
            <Nav.Link href="/" onClick={handleLogout}>
              Log out
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
