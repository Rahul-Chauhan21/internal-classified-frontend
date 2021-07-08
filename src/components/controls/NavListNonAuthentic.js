import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navList: {
    display: "flex",
    alignItems: "center",
    float: "right",
  },
}));

const NavListNonAuthentic = () => {
  const classes = useStyles();
  return (
    <Box className={classes.navList}>
      <Button color="inherit" component={Link} to={"/login"}>
        Sign In
      </Button>
      <Button color="inherit" component={Link} to={"/sell"}>
        Sell
      </Button>
    </Box>
  );
};

export default NavListNonAuthentic;
