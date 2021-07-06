import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Container,
  Link as MuiLink,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LockOutlined } from "@material-ui/icons";

import { useForm, Form } from "../hooks/useForm";
import { Controls } from "../components/controls/Controls";

import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../actions/auth.actions";

const initialFValues = {
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

const Login = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validateForm = (fieldValues = values) => {
    let temp = {};

    temp.email =
      fieldValues.email &&
      /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(
        fieldValues.email
      )
        ? ""
        : "*Input a valid Email Address";

    temp.password = fieldValues.password ? "" : "*This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    false,
    validateForm
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (validateForm()) {
      const user = {
        email,
        password,
      };
      dispatch(logIn(user));
      window.alert("Check console: Login");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <Controls.Avatar icon={<LockOutlined fontSize="large" />} />
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Form onSubmit={handleSubmit} style={{ width: "75%" }}>
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
            fullWidth
            autoFocus
            required
          />

          <Controls.Input
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
            fullWidth
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink to="" variant="body2">
                New User? Sign Up!
              </MuiLink>
            </Grid>
          </Grid>
        </Form>

        {auth.error && (
          <Alert
            className={classes.error}
            style={{ justifyContent: "center" }}
            severity="error"
          >
            {auth.error}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default Login;
