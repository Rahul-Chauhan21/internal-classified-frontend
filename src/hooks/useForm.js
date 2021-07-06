import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fRoot: {
    "& .MuiFormControl-root": {
      width: "100%",
      marginTop: theme.spacing(1),
    },
  },
}));

export const useForm = (initialFValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

export const Form = (props) => {
  const { children, ...other } = props;
  const classes = useStyles();
  return (
    <form className={classes.fRoot} autoComplete="off" {...other}>
      {children}
    </form>
  );
};
