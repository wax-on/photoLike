import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { logout, currentUser } = useAuth();
  let history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/");
    window.location.reload();
  };

  const refreshPageAlbums = () => {
    history.push("/albums");
    window.location.reload();
  };

  const refreshPageLogin = () => {
    history.push("/login");
    window.location.reload();
  };

  return (
    <>
      <div className="navbar-container">
        <div className="container">
          <nav>
            <input type="checkbox" id="nav" className="hidden" />
            <label htmlFor="nav" className="nav-btn">
              <i></i>
              <i></i>
            </label>
            <div className="logo">
              <a href="/">Photo Review</a>
            </div>
            <div className="nav-wrapper">
              <ul>
                <li className="nav-item">
                  <Link onClick={refreshPageAlbums}>Albums</Link>
                </li>
                {currentUser ? (
                  <li className="nav-item">
                    <Link className="button-navbar" onClick={handleLogout}>
                      Log Out
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="button-navbar"
                      onClick={refreshPageLogin}
                      to="/albums"
                    >
                      Log in
                    </Link>
                  </li>
                )}

                {currentUser ? (
                  <p></p>
                ) : (
                  <li className="nav-item">
                    <a href="/signup" className="button-navbar">
                      Sign up
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
