import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import AdCard from "./AdCard";
import * as moment from "moment";
import NoFavorites from "./NoFavorites";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "0 20px",
    "& .MuiCardContent-root": {
      paddingBottom: 0,
    },
  },
}));

const ViewCatalogue = () => {
  const classes = useStyles();
  const ads = useSelector((state) => state.ads);
  const { userCatalogue } = ads;

  return (
    <Grid item md={9} xs={12} className={classes.root}>
      {userCatalogue && userCatalogue.length ? (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            Your Catalogue
          </Typography>
          <hr />
        </>
      ) : (
        <></>
      )}
      <Grid container spacing={1}>
        {userCatalogue && userCatalogue.length ? (
          userCatalogue
            .filter((ad) => ad.isVisible === true)
            .map((ad) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                className={classes.adCard}
                key={ad._id}
              >
                <AdCard
                  id={ad._id}
                  name={ad.name}
                  img={ad.imageUrls[0]}
                  price={ad.price}
                  category={ad.category}
                  date={moment(ad.date).format("MM/DD/YYYY")}
                />
              </Grid>
            ))
        ) : (
          <NoFavorites />
        )}
      </Grid>
    </Grid>
  );
};

export default ViewCatalogue;
