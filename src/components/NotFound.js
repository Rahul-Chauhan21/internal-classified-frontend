import React from "react";
import ErrorImg from "../assets/404.png";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
    },
  },
  notFoundContent: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  notFoundImgContainer: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root}>
        <Grid item xs={12} md={6} className={classes.notFoundContent}>
          <div>
            <Typography variant="h1">Oops!</Typography>
            <Typography variant="h6">We can't seem to find that.</Typography>
            <Typography variant="body2">Error 404</Typography>
            <Typography variant="body2">
              Here are some helpful links: <Link to="/">Home</Link>
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.notFoundImgContainer}>
          <img src={ErrorImg} alt="notFound" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
