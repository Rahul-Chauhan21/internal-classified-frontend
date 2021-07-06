import React from "react";
import noAds from "..//assets/no-publications.png";
import { makeStyles, Box, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  noAds: {
    margin: "0 auto",
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

const NoAds = () => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.noAds}>
      <img src={noAds} alt="noAds" />
      <Typography variant="subtitle1" gutterBottom>
        There are no Ads
      </Typography>
      <Typography variant="body2" gutterBottom>
        When users post ads, will appear here. If you want to post something you
        can do it now
      </Typography>
      <Button>Start Selling</Button>
    </Box>
  );
};

export default NoAds;
