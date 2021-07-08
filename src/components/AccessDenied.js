import React from "react";
import "../assets/accessDenied.scss";
import { Link } from "react-router-dom";
const AccessDenied = () => {
  return (
    <div class="page-wrap">
      <div class="page-not-found">
        <h1 class="text-xl">
          <span>4</span>
          <span>0</span>
          <span class="broken">3</span>
        </h1>
        <h4 class="text-md">Access Denied !</h4>
        <h4 class="text-sm text-sm-btm">
          You don’t have access to this area of application. Speak to your
          administrator to unblock this feature. You can go back to{" "}
          <Link to="/">Home</Link>
        </h4>
      </div>
    </div>
  );
};

export default AccessDenied;
