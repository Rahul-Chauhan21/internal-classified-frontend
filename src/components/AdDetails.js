import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import {
  getAdDetails,
  postComment,
  addToCatalogue,
  removeFromCatalogue,
} from "../actions";
// import { buyAd } from "../actions/ad.actions";
import {
  Container,
  makeStyles,
  Typography,
  IconButton,
  Paper,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import { FavoriteBorder, Favorite, Share } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import * as moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import "../assets/FullDetails.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "5px 20px",
    "& .MuiIconButton-root": {
      padding: 0,
    },
    [theme.breakpoints.down("md")]: {
      padding: "2.25px 20px",
    },
  },
  contactInfo: {
    flexGrow: 1,
  },
  error: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "75%",
  },

  buyBtn: {
    marginBottom: theme.spacing(2),
  },
}));

const AdDetails = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const ads = useSelector((state) => state.ads);
  const user = useSelector((state) => state.user);
  const commentsSelector = useSelector((state) => state.comments);
  const { ad, userInfo } = ads;
  const { comments } = commentsSelector;

  const { id } = useParams();
  const history = useHistory();

  const [buy, setBuy] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAdDetails();
  }, []);

  const fetchAdDetails = () => {
    dispatch(getAdDetails(id));
  };

  const toggle = (type) => {
    if (!auth.token) {
      history.push("/login");
    }

    if (type === "push") {
      dispatch(addToCatalogue(auth.token, id));
    } else dispatch(removeFromCatalogue(auth.token, id));
  };

  const handleBuy = () => {
    if (!auth.token) {
      history.push("/login");
    }
    setBuy(true);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      {ad && (
        <Paper elevation={3}>
          <div className="details">
            <div className="big-img">
              <Carousel>
                {ad.imageUrls.map((value, ind) => {
                  return <img key={ind} src={value} alt={value} />;
                })}
              </Carousel>
            </div>
            <div className="box">
              <div className="row" style={{ marginBottom: 20 }}>
                <Typography variant="h4">{ad?.name}</Typography>
                <span
                  style={{
                    color: "grey",
                    float: "right",
                    fontSize: 13,
                    fontWeight: "500",
                    marginTop: 15,
                  }}
                >
                  {ad ? moment(ad.date).format("DD/MM/YYYY") : ""}
                </span>
              </div>
              <div className="row" style={{ float: "right" }}>
                <span style={{ fontWeight: "bold" }}>Rs.{ad?.price}</span>
              </div>
              <Typography variant="subtitle2" gutterBottom>
                Sold By: {`${userInfo?.firstName}  ${userInfo?.lastName}`}
              </Typography>
              <br />
              <Typography variant="subtitle2" gutterBottom>
                {ad?.description}
              </Typography>

              <Box
                component="div"
                display="flex"
                alignItems="center"
                paddingBottom={2}
              >
                <Typography variant="body2" className={classes.contactInfo}>
                  Contact Info: {userInfo?.contactInfo}
                </Typography>
                <Box component="div">
                  {(() => {
                    if (!auth.token)
                      return (
                        <IconButton
                          aria-label="Add to Favorites"
                          onClick={() => toggle("push")}
                        >
                          <FavoriteBorder />
                        </IconButton>
                      );
                    if (auth.token && user.id === userInfo._id) {
                      return <></>;
                    }

                    if (auth.token && user.id !== userInfo._id) {
                      if (user.catalogue.indexOf(ad._id) === -1) {
                        return (
                          <IconButton
                            aria-label="Add to Favorites"
                            onClick={() => toggle("push")}
                          >
                            <FavoriteBorder />
                          </IconButton>
                        );
                      } else {
                        return (
                          <IconButton
                            aria-label="Remove From Favorites"
                            onClick={() => toggle("pull")}
                          >
                            <Favorite />
                          </IconButton>
                        );
                      }
                    }
                  })()}

                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                </Box>
              </Box>
              <center>
                {(() => {
                  if (buy === true) {
                    return (
                      <Alert
                        className={classes.error}
                        style={{ justifyContent: "center" }}
                        severity="Success"
                      >
                        Ad Sold!
                      </Alert>
                    );
                  }

                  if (!auth.token)
                    return (
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.buyBtn}
                        onClick={() => handleBuy()}
                      >
                        Buy
                      </Button>
                    );
                  if (auth.token && user.id === userInfo._id) {
                    return <></>;
                  }
                })()}
              </center>

              <Typography variant="h6" align="center" gutterBottom>
                Comments
              </Typography>
              <div className="comments">
                {comments.length ? (
                  comments.map((value, ind) => {
                    return (
                      <Box
                        component="div"
                        display="flex"
                        alignItems="center"
                        key={ind}
                      >
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="textSecondary"
                        >
                          {value.userDetails}{" "}
                          {value.userId === userInfo._id ? `(Owner)` : ""}:{" "}
                          {value.description}
                        </Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography variant="subtitle2">
                    No Comments Available
                  </Typography>
                )}
              </div>
              {ad.status !== "Sold" && (
                <Formik
                  initialValues={{
                    comment: "",
                  }}
                  onSubmit={async (values) => {
                    //let formData = new FormData();
                    if (!auth.token) {
                      history.push("/login");
                    }

                    const commentData = {
                      adDetails: ad._id,
                      date: Date.now(),
                      userDetails: user.firstName,
                      description: values.comment,
                      userId: user.id,
                    };

                    dispatch(postComment(auth.token, commentData));

                    values.comment = "";
                  }}
                  validationSchema={yup.object().shape({
                    comment: yup
                      .string()
                      .min(5, "Too Short!")
                      .required("*Input a message!"),
                  })}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                  }) => (
                    <form onSubmit={handleSubmit} className="commentForm">
                      <TextField
                        placeholder="Comment Here!"
                        multiline
                        rows={2}
                        margin="normal"
                        variant="outlined"
                        id="comment"
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                        error={touched.comment && Boolean(errors.comment)}
                        helperText={touched.comment && errors.comment}
                      />

                      <Button color="primary" variant="contained" type="submit">
                        Submit
                      </Button>
                      {comments.error && (
                        <Alert
                          className={classes.error}
                          style={{ justifyContent: "center" }}
                          severity="error"
                        >
                          {comments.error}
                        </Alert>
                      )}
                    </form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default AdDetails;
