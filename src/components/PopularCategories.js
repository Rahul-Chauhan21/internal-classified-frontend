import React from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  PhoneIphone,
  DriveEta,
  DesktopWindows,
  Motorcycle,
  Build,
  Deck,
} from "@material-ui/icons";
import { updateFilter } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "0 20px",
  },
  categoryItem: {
    fontSize: "16px",
    border: "1px solid #ccc",
    padding: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const categoriesItems = [
  {
    icon: <PhoneIphone />,
    title: "Mobiles",
  },
  {
    icon: <DriveEta />,
    title: "Cars",
  },
  {
    icon: <DesktopWindows />,
    title: "Electronics",
  },
  {
    icon: <Motorcycle />,
    title: "Bikes",
  },
  {
    icon: <Build />,
    title: "Services",
  },
  {
    icon: <Deck />,
    title: "Furniture",
  },
];

const PopularCategories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h6" align="center" gutterBottom>
        Popular Categories
      </Typography>
      <hr />
      <Typography variant="subtitle2" align="center" gutterBottom>
        Browse through some of our most popular categories.
      </Typography>

      <Grid container>
        {categoriesItems?.map((category) => (
          <Grid
            key={category.title}
            item
            md={4}
            sm={6}
            xs={12}
            className={classes.categoryItem}
            onClick={() => dispatch(updateFilter(category.title))}
          >
            <IconButton
              color="inherit"
              edge="start"
              disableRipple
              style={{ backgroundColor: "transparent" }}
            >
              {category.icon}
            </IconButton>
            <Typography variant="h6">{category.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PopularCategories;
