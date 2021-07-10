import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, makeStyles, Typography } from "@material-ui/core";
import NoAds from "./NoAds";
import AdCard from "./AdCard";
import * as moment from "moment";
import { getAds } from "../actions";

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

const AdCards = () => {
  const classes = useStyles();
  const ads = useSelector((state) => state.ads);
  const filterSelector = useSelector((state) => state.filter);
  const { filter } = filterSelector;
  const { approvedAds } = ads;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = () => {
    dispatch(getAds());
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h6" align="center" gutterBottom>
        Recently Added
      </Typography>
      <hr />
      <Grid container>
        {approvedAds.length ? (
          (filter === "All"
            ? approvedAds
            : approvedAds.filter((ad) => ad.category === filter)
          ).map((ad) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ad._id}>
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
          <NoAds />
        )}
      </Grid>
    </Container>
  );
};

export default AdCards;
