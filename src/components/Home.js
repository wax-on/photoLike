import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div>
        <p>This is home</p>
        <p>Du är inloggad som {currentUser && currentUser.email}</p>
      </div>
    </>
  );
};

export default Home;
