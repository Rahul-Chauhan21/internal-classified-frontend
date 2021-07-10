import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Hidden,
  MenuList,
  Paper,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { logOut } from "../../actions";

const useStyles = makeStyles((theme) => ({
  navList: {
    display: "flex",
    alignItems: "center",
    float: "right",
  },
}));

const NavListAuthentic = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <Box className={classes.navList}>
      <IconButton
        color="inherit"
        aria-label="user info"
        component={Link}
        to="/dashboard"
      >
        <AccountCircle />
      </IconButton>
      <Typography color="inherit" variant="subtitle2">
        Hi, {user.firstName} &nbsp;
        <Hidden smUp>
          <i
            className="fas fa-angle-down"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          ></i>
        </Hidden>
      </Typography>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/dashboard">Manage Details</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/dashboard/view-catalogue">View Catalogue</Link>
                  </MenuItem>
                  {auth.role === "Admin" && (
                    <MenuItem onClick={handleClose}>
                      <Link to="/dashboard/verification">Verify Posts</Link>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/"
                      onClick={handleClick}
                      style={{ width: "100%" }}
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Hidden smDown>
        <Button color="inherit" onClick={handleClick} component={Link} to="/">
          Log Out
        </Button>
      </Hidden>
      <Button color="inherit" component={Link} to="/sell">
        Sell
      </Button>
    </Box>
  );
};

export default NavListAuthentic;
