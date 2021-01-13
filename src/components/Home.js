import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="background">
        <p className="text-center align-middle center">
          Hello {currentUser && currentUser.email}
        </p>
      </div>
    </>
  );
};

export default Home;
