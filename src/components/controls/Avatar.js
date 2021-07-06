import React from "react";
import { Avatar as MuiAvatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const Avatar = (props) => {
  const classes = useStyles();
  const { icon } = props;
  return <MuiAvatar className={classes.avatar}>{icon}</MuiAvatar>;
};

export default Avatar;
