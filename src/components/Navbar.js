import React from "react";
import "../App.css";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory, NavLink } from "react-router-dom";
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
      <NavLink
        to="/"
        className="text-light mt-2 text-uppercase text-decoration-none"
      >
        Photo Reviewer
      </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavLink to="/albums" className="text-light mt-2 mr-2">
            Albums
          </NavLink>

          {currentUser ? (
            <NavLink to="/" onClick={handleLogout} className="text-light mt-2">
              Log out
            </NavLink>
          ) : (
            <NavLink to="/login" className="text-light mt-2">
              Login
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
