import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Box, Button, IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { logOut } from "../../actions";

const useStyles = makeStyles((theme) => ({
  navList: {
    display: "flex",
    alignItems: "center",
    float: "right",
  },
}));

const NavListAuthentic = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleClick = () => {
    dispatch(logOut());
  };
  return (
    <Box className={classes.navList}>
      <IconButton color="inherit" aria-label="user info">
        <AccountCircle />
      </IconButton>
      <Typography color="inherit" variant="subtitle2" componet={Link}>
        Hi, {user.firstName}
      </Typography>
      <Button color="inherit" onClick={handleClick}>
        Sign Out
      </Button>
    </Box>
  );
};

export default NavListAuthentic;
