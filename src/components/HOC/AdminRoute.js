import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const { role, token } = auth;
  return (
    <Route
      {...rest}
      render={(props) =>
        token && role === "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/access-denied"} />
        )
      }
    />
  );
};

export default AdminPrivateRoute;
