import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  label: {
    textTransform: "none",
  },
}));

const Button = (props) => {
  const { text, color, variant, onClick, ...other } = props;
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || "contained"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
