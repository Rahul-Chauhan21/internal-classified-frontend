import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  if (!token) return <Redirect to={"/login"} />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
