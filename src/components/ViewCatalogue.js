import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, makeStyles, Typography } from "@material-ui/core";
import AdCard from "./AdCard";
import * as moment from "moment";
import { getCatalogue } from "../actions";
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
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCatalogue();
  }, []);

  const fetchCatalogue = () => {
    dispatch(getCatalogue(auth.token));
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h6" align="center" gutterBottom>
        Your Catalogue
      </Typography>
      <hr />
      <Grid container>
        {userCatalogue && userCatalogue.length ? (
          userCatalogue.map((ad) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AdCard
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
    </Container>
  );
};

export default ViewCatalogue;
