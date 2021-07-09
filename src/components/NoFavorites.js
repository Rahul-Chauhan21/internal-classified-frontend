import React from "react";
import noAds from "..//assets/no-publications.png";
import { makeStyles, Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  noFavorites: {
    margin: "auto",
    marginTop: "0px !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    "& img": {
      maxWidth: "200px",
    },
    "& .MuiButton-root": {
      margin: "5px 0",
    },
  },
}));

const NoFavorites = () => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.noFavorites}>
      <img src={noAds} alt="noFavorites" />
      <Typography variant="subtitle1" gutterBottom>
        No Favorites Ads yet!
      </Typography>
      <Typography variant="body2" gutterBottom>
        Your new favorite ads are a like away! View details of an ad to add them
        to your catalogue.
      </Typography>
      <Button component={Link} to={"/"}>
        View Latest Ads
      </Button>
    </Box>
  );
};

export default NoFavorites;
