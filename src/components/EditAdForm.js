import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editAd } from "../actions";
import { Grid, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useForm, Form } from "../hooks/useForm";
import { Controls } from "../components/controls/Controls";

const initialFValues = {
  name: "",
  description: "",
  category: "",
  price: "",
  image: "",
  location: "",
  isVisible: false,
  isCommentable: false,
  status: "Pending",
};

const statusItems = [
  { id: "Approved", title: "Approved" },
  { id: "Rejected", title: "Rejected" },
];

const categories = [
  { id: "1", title: "Mobiles" },
  { id: "2", title: "Cars" },
  { id: "3", title: "Electronics" },
  { id: "4", title: "Bikes" },
  { id: "5", title: "Services" },
  { id: "6", title: "Furniture" },
];

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: theme.spacing(2),
    width: "75%",
  },
}));

const EditAdForm = (props) => {
  const { recordForEdit } = props;
  const classes = useStyles();
  const ads = useSelector((state) => state.ads);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit]);

  const validate = () => {
    let temp = {};
    temp.name = values.name ? "" : "*This field is required.";
    temp.description =
      values.description.length > 15
        ? ""
        : "*Add a short description of minimum 15 characters.";
    temp.category = values.category ? "" : "*This field is required.";
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

    if (validate()) {
      const {
        name,
        description,
        category,
        location,
        status,
        isVisible,
        isCommentable,
        price,
      } = values;

      const ad = {
        name,
        description,
        category,
        location,
        status,
        isVisible,
        isCommentable,
        price,
      };

      dispatch(editAd(auth.token, values._id, ad));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
            margin="normal"
          />

          <Controls.Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
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
            name="category"
            label="Category"
            value={values.category}
            onChange={handleInputChange}
            options={categories}
            error={errors.category}
            margin="normal"
          />

          <Controls.Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleInputChange}
            error={errors.location}
            margin="normal"
          />
          {auth.role === "Admin" && (
            <Controls.RadioGroup
              name="status"
              label="Status"
              value={values.status}
              onChange={handleInputChange}
              items={statusItems}
            />
          )}
          <Controls.Switch
            name="isVisible"
            label="Visbility"
            value={values.isVisible}
            onChange={handleInputChange}
          />
          <Controls.Switch
            name="isCommentable"
            label="Commentable"
            value={values.isCommentable}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Controls.Button type="submit" text="Submit" />
      {ads.error && (
        <center>
          <Alert
            className={classes.error}
            style={{ justifyContent: "center", width: "100%" }}
            severity="error"
          >
            Error Occured! Couldn't edit
          </Alert>
        </center>
      )}
      {ads.message && (
        <center>
          <Alert
            className={classes.error}
            style={{ justifyContent: "center", width: "100%" }}
            severity="success"
          >
            Changes Made Successfully!
          </Alert>
        </center>
      )}
    </Form>
  );
};

export default EditAdForm;
