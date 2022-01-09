import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  let navigate = useNavigate()

  const verifyToken = () => {
    setIsLoading(true)
    const localJWTToken = localStorage.getItem("authToken");
    if (localJWTToken) {
      axios
        .get(`/verify`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          const userJWT = response.data;
          setUser(userJWT); // this is essential to create the context for auth
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setUser(null);
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    } else {
      // The token is not in the localStorage
      setIsLoading(false);
    }
  };

  const logInUser = (JWTToken) => {
    localStorage.setItem("authToken", JWTToken);
    verifyToken(); // I do not pass it her because verify will read for localStorage.
    // This way I save subsequent requests to the back
  };

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");

    // Update the state variables
    setIsLoggedIn(false);
    setUser(null);
    navigate(`/`);
  };

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{ logInUser, logOutUser, user, isLoggedIn, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
