import React from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
} from "@material-ui/core";
import {
  FavoriteBorder,
  Favorite,
  Share,
  ExpandMore,
} from "@material-ui/icons";

import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "0 20px",
    "& .MuiCardContent-root": {
      paddingBottom: 0,
    },
  },
  date: {
    float: "right",
  },
  media: {
    height: 200,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const AdCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="topPicks">
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h6" align="center" gutterBottom>
          Recently Added
        </Typography>
        <hr />
        <Grid container>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card>
              <CardMedia
                className={classes.media}
                image="https://picsum.photos/200"
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                  className={classes.date}
                >
                  Date
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  Price
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  Ad Title
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom={false}
                >
                  Category
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMore />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Description:</Typography>
                  <Typography paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                    modi hic veniam cum quo libero molestiae similique quae
                    assumenda. Tempore.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdCard;
