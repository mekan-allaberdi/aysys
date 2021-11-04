import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/account/Login";
import { UserContext } from "../context/userContext";

function LoginPage() {
  const { user } = useContext(UserContext);

  return user ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
