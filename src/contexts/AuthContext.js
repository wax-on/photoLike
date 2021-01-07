import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setCurrentUser(null);
    return auth.signOut();
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const singup = (email, password) => {
    // skapa konto till anvädanren
    console.log(
      `kommer att skapa anvädare med email ${email} och password ${password}`
    );
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      console.log("Auth staten ändras", user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubcribe;
  }, []);

  const contextValues = {
    loading,
    login,
    logout,
    singup,
    resetPassword,
    currentUser,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading && <p>LOADING...</p>}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
