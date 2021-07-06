import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../actions";

import {
  Grid,
  Typography,
  Button,
  Container,
  Link as MuiLink,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Link, Redirect } from "react-router-dom";

import { useForm, Form } from "../hooks/useForm";
import { Controls } from "../components/controls/Controls";

const initialFValues = {
  firstName: "",
  lastName: "",
  contactInfo: "",
  email: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "0 20px",
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    marginTop: theme.spacing(2),
    width: "75%",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validateForm = (fieldValues = values) => {
    let temp = { ...errors };

    temp.firstName = !fieldValues.firstName
      ? "*Please input your first name."
      : !/^[a-zA-Z ]*$/.test(fieldValues.firstName)
      ? "*First Name can only contain alphabets"
      : "";

    temp.lastName = !fieldValues.lastName
      ? "*Please input your last name."
      : !/^[a-zA-Z ]*$/.test(fieldValues.lastName)
      ? "*Last Name can only contain alphabets"
      : "";

    temp.contactInfo = !fieldValues.contactInfo
      ? "*This field is required"
      : !/^[0-9]{10}$/.test(fieldValues.contactInfo)
      ? "Please input a valid 10 digit mobile no."
      : "";

    temp.email = !fieldValues.email
      ? "*This field is required"
      : !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(
          fieldValues.email
        )
      ? "*Input a valid Email Address"
      : "";

    temp.password = !fieldValues.password
      ? "*This field is required."
      : fieldValues.password.length < 6
      ? "*Minimum length required is 6"
      : "";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    false,
    validateForm
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, contactInfo, email, password } = values;
    if (validateForm()) {
      const user = {
        firstName,
        lastName,
        contactInfo,
        email,
        password,
      };
      dispatch(createUser(user));
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Form onSubmit={handleSubmit} style={{ width: "75%" }}>
          <Controls.Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            fullWidth
            autoFocus
          />

          <Controls.Input
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            fullWidth
          />

          <Controls.Input
            name="contactInfo"
            label="Contact Info"
            value={values.contactInfo}
            onChange={handleInputChange}
            error={errors.contactInfo}
            fullWidth
          />

          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
            fullWidth
          />

          <Controls.Input
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink to="" variant="body2">
                Already a User?
              </MuiLink>
            </Grid>
          </Grid>
        </Form>
        {user.error && (
          <Alert
            className={classes.error}
            style={{ justifyContent: "center" }}
            severity="error"
          >
            {user.error}
          </Alert>
        )}
        {user.message && (
          <Alert
            className={classes.error}
            style={{ justifyContent: "center" }}
            severity="success"
          >
            {user.message}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default SignUp;
