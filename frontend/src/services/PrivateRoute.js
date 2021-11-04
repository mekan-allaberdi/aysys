import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { userLogin } = useContext(UserContext);
  return (
    <Route {...rest}>{!userLogin ? <Redirect to="/login" /> : children}</Route>
  );
};

export default PrivateRoute;
