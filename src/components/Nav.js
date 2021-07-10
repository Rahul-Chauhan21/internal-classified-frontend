import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavListAuthentic from "./controls/NavListAuthentic";
import NavListNonAuthentic from "./controls/NavListNonAuthentic";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    "& .MuiToolbar-gutters": {
      [theme.breakpoints.down("xs")]: {
        paddingRight: "0 !important",
        paddingLeft: "0 !important",
      },
      "& a": {
        color: "inherit !important",
      },
      "& a:hover": {
        color: "inherit !important",
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  brandName: {
    flexGrow: 1,
  },
}));

const Nav = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            className={classes.brandName}
            color="inherit"
          >
            <Link to={"/"}>Grads-Advert</Link>
          </Typography>
          {auth.token ? <NavListAuthentic /> : <NavListNonAuthentic />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
