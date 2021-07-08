import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Box, Button, IconButton, Hidden } from "@material-ui/core";
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
      <IconButton
        color="inherit"
        aria-label="user info"
        component={Link}
        to="/dashboard"
      >
        <AccountCircle />
      </IconButton>
      <Hidden smDown>
        <Typography color="inherit" variant="subtitle2">
          Hi, {user.firstName}
        </Typography>
      </Hidden>
      <Button color="inherit" onClick={handleClick} component={Link} to="/">
        Sign Out
      </Button>
      <Button color="inherit" component={Link} to="/sell">
        Sell
      </Button>
    </Box>
  );
};

export default NavListAuthentic;
