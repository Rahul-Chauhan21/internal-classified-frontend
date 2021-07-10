import React from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateFilter } from "../actions";

import {
  Container,
  Typography,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  categoriesContainer: {
    width: "100%",
    padding: "10px 0",
    borderBottom: "solid 1px #ccc",
  },
}));

const categoriesItems = [
  {
    title: "All Categories",
    filter: "All",
  },
  {
    title: "Mobiles",
    filter: "Mobiles",
  },
  {
    title: "Cars",
    filter: "Cars",
  },
  {
    title: "Electronics",
    filter: "Electronics",
  },
  {
    title: "Bikes",
    filter: "Bikes",
  },
  {
    title: "Services",
    filter: "Services",
  },
  {
    title: "Furniture",
    filter: "Furniture",
  },
];

const CategoryPopup = () => {
  const location = useLocation();
  const filterSelector = useSelector((state) => state.filter);
  const { filter } = filterSelector;
  const classes = useStyles();
  const dispatch = useDispatch();
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

  if (location.pathname !== "/") return null;

  return (
    <Container maxWidth="lg">
      <div className={classes.categoriesContainer}>
        <Typography variant="body2">
          Browse by Categories &nbsp;
          <i
            className="fas fa-angle-down"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{ marginRight: "16px" }}
          ></i>
          {filter}
        </Typography>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
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
                    {categoriesItems.map((category) => (
                      <MenuItem onClick={handleClose} key={category.filter}>
                        <span
                          onClick={() =>
                            dispatch(updateFilter(category.filter))
                          }
                          style={{ width: "100%" }}
                        >
                          {category.title}
                        </span>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Container>
  );
};

export default CategoryPopup;
