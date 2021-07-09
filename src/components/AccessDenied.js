import React from "react";
import { useHistory } from "react-router";
import { Link } from "@material-ui/core";
import "../assets/accessDenied.scss";

const AccessDenied = () => {
  const history = useHistory();

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
          administrator to unblock this feature. For now you can{" "}
          <Link onClick={() => history.goBack()}>go back</Link>.
        </h4>
      </div>
    </div>
  );
};

export default AccessDenied;
