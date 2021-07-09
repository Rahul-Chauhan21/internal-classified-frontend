import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const { role, token } = auth;

  if (!token) return <Redirect to={"/login"} />;

  if (token && role !== "Admin") return <Redirect to={"/access-denied"} />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AdminPrivateRoute;
