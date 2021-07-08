import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const { token } = auth;
  return (
    <Route
      {...rest}
      component={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
