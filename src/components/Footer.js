import React from "react";
import { Grid, Container, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "0 20px",
    "& .MuiTypography-h6": {
      fontWeight: 600,
    },
  },
  footerTop: {
    overflow: "hidden",
    padding: "18px 0",
    marginTop: "20px",
    background: "rgb(235, 235, 235)",
    opacity: 0.7,
  },
  footerBottom: {
    padding: "15px 0",
    background: "#333",
    color: "#fff",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTypography-body1": {
      margin: "0px 10px",
    },
    "& :hover": {
      opacity: "0.7",
    },
    marginBottom: "0.5rem",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.footerTop}>
        <Container maxWidth="lg" className={classes.root}>
          <Grid container align="center">
            <Grid item lg={3} sm={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                POPULAR CATEGORIES
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Cars
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Mobile Phones
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Electronics
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Furniture
              </Typography>
            </Grid>

            <Grid item item lg={3} sm={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                POPULAR SEARCHES
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Bikes
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Watches
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Books
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Dogs
              </Typography>
            </Grid>
            <Grid item item lg={3} sm={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                ABOUT US
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                About Grads-Advert
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Advert Blog
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Buisness Packages
              </Typography>
            </Grid>
            <Grid item item lg={3} sm={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                GRADS-ADVERT
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Help
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Sitemap
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Legal & Privacy information
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.footerBottom}>
        <Container maxWidth="lg" className={classes.root}>
          <Grid container direction="row" align="center">
            <Grid item xs={12} className={classes.socialIcons}>
              <Typography style={{ color: "#3b5998" }} href="#!" role="button">
                <i className="fab fa-facebook-f fa-lg"></i>
              </Typography>
              <Typography style={{ color: "#55acee" }} href="#!" role="button">
                <i className="fab fa-twitter fa-lg"></i>
              </Typography>
              <Typography style={{ color: "#ac2bac" }} href="#!" role="button">
                <i className="fab fa-instagram fa-lg"></i>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" component="p" gutterBottom>
                Copyrights &copy; Grads-Advert 2021.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
