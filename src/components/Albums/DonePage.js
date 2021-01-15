import React from "react";
import { Link } from "react-router-dom";

const DonePage = () => {
  return (
    <>
      <h2 className="text-center center mb-5">
        Thank you for your Review of my album.
      </h2>
      <Link className="center  mt-5 btn btn-info btn-lg " to="/login">
        Log in
      </Link>
    </>
  );
};

export default DonePage;
