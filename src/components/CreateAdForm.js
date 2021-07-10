import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearImgArray, createAd, postAdRequest } from "../actions";

import {
  Grid,
  Container,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useForm, Form } from "../hooks/useForm";
import { Controls } from "../components/controls/Controls";
import AddImage from "./AddImage";
import * as moment from "moment";

const initialFValues = {
  adName: "",
  adDescription: "",
  categoryId: "",
  price: "",
  image: "",
  location: "",
};

const categories = [
  { id: "1", title: "Mobiles" },
  { id: "2", title: "Cars" },
  { id: "3", title: "Electronics" },
  { id: "4", title: "Bikes" },
  { id: "5", title: "Services" },
  { id: "6", title: "Furniture" },
];

const useStyles = makeStyles((theme) => ({
  pageConent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      margin: "8px 0 0 0",
    },
  },
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "0 20px",
  },
  indeterminate: {
    transition: "none",
    animation: "none",
  },
  error: {
    marginTop: theme.spacing(2),
    width: "75%",
  },
}));

const getImgUrls = async (file) => {
  const formData = new FormData();
  formData.append("file", file.originFileObj);
  formData.append("upload_preset", "internal-classified");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/xavier-imagecloud/image/upload",
      formData
    );
    const imageUrl = res.data.secure_url;
    return imageUrl;
  } catch (err) {
    return err.response;
  }
};

const CreateAdForm = () => {
  const classes = useStyles();
  const ads = useSelector((state) => state.ads);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearImgArray());
    };
  }, []);

  const validate = () => {
    let temp = {};
    temp.adName = values.adName ? "" : "*This field is required.";
    temp.adDescription =
      values.adDescription.length > 15
        ? ""
        : "*Add a short description of minimum 15 characters.";
    temp.categoryId = values.categoryId ? "" : "*This field is required.";
    temp.location = values.location ? "" : "*This field is required.";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, false, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { adName, adDescription, categoryId, price, location } = values;
    if (validate()) {
      dispatch(postAdRequest());
      Promise.all(ads.imgArray.map(async (file) => getImgUrls(file))).then(
        (result) => {
          const ad = {
            user: user.id,
            name: adName,
            description: adDescription,
            category: categoryId,
            date: moment(Date.now()).format("MM/DD/YYYY"),
            price,
            location,
            imageUrls: result,
          };
          dispatch(createAd(ad, auth.token)).then(() => {
            history.push("/dashboard");
          });
        }
      );
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper className={classes.pageConent}>
        <Typography variant="h6" align="center" gutterBottom>
          Post Ad
        </Typography>

        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <Controls.Input
                name="adName"
                label="Name"
                value={values.adName}
                onChange={handleInputChange}
                error={errors.adName}
                margin="normal"
              />

              <Controls.Input
                label="Description"
                name="adDescription"
                value={values.adDescription}
                onChange={handleInputChange}
                error={errors.adDescription}
                multiline
                rows={5}
                margin="normal"
              />
              <Controls.Input
                label="Expected Price"
                name="price"
                value={values.price}
                onChange={handleInputChange}
                error={errors.price}
                margin="normal"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controls.Select
                name="categoryId"
                label="Category"
                value={values.categoryId}
                onChange={handleInputChange}
                options={categories}
                error={errors.categoryId}
                margin="normal"
              />

              <center style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                <AddImage />
              </center>
              {error && !ads.imgArray.length ? (
                <center>
                  <Alert
                    className={classes.error}
                    style={{ justifyContent: "center" }}
                    severity="error"
                  >
                    Upload atleast one image!
                  </Alert>
                </center>
              ) : (
                <></>
              )}
              <Controls.Input
                label="Location"
                name="location"
                value={values.location}
                onChange={handleInputChange}
                error={errors.location}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Controls.Button type="submit" text="Submit" />
          {ads.message && (
            <center>
              <Alert
                className={classes.error}
                style={{ justifyContent: "center", width: "100%" }}
                severity="success"
              >
                {ads.message}
              </Alert>
            </center>
          )}
          {ads.error && (
            <center>
              <Alert
                className={classes.error}
                style={{ justifyContent: "center", width: "100%" }}
                severity="error"
              >
                Error Occured! Couldn't post
              </Alert>
            </center>
          )}
        </Form>
      </Paper>
    </Container>
  );
};

export default CreateAdForm;
