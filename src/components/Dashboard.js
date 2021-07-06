import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../actions/ad.actions";
import { getUserInfo } from "../actions";

import {
  Container,
  Grid,
  makeStyles,
  Box,
  Button,
  Typography,
  Link as MuiLink,
  Hidden,
} from "@material-ui/core";
import { Controls } from "./controls/Controls";
import { EditOutlined, DeleteForever } from "@material-ui/icons";
import useTable from "../hooks/useTable";

import NoAds from "./NoAds";
import "../assets/responsivetable.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "16px 20px",
  },

  profile: {
    border: "1px solid rgba(0,47,52,.2)",
  },

  profileHeader: {
    background: "#ebeeef",
    padding: "4px 8px",
  },
  profileContent: {
    padding: "8px",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    "& .MuiButton-root, .MuiLink-root ": {
      margin: "5px 0",
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
    },
  },
  gridContainer: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  },
}));

const headCells = [];

const Dashboard = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const userSelector = useSelector((state) => state.user);
  const ads = useSelector((state) => state.ads);
  const dispatch = useDispatch();
  const { user } = userSelector;

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    dispatch(getUserInfo(auth.token));
  };

  const delPost = async (id) => {
    await dispatch(deletePost(auth.token, id));
    fetchDetails();
  };

  const { TblContainer, TblPagination, recordsAfterPaging } = useTable(
    ads.posts,
    headCells
  );

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={1} className={classes.gridContainer}>
        <Grid item md={3} xs={12} className={classes.profileContainer}>
          <Box
            component="div"
            display="flex"
            flexDirection="column"
            className={classes.profile}
          >
            <Box component="div" className={classes.profileHeader}>
              <Typography variant="h6">Personal Information</Typography>
            </Box>
            <Box component="div" className={classes.profileContent}>
              <Typography variant="body2" gutterBottom>
                Full Name: {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Email : {user?.email}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Contact: {user?.contactInfo}
              </Typography>
            </Box>
          </Box>
          <Button>My Ads</Button>
          <Button>View Catalogue</Button>
          <Button>Edit Profile</Button>
          <Hidden smDown>
            <Typography variant="body2" align="center" gutterBottom>
              Member since July 2021
            </Typography>

            <Typography varaint="body2" component={MuiLink} align="center">
              Share profile Link
            </Typography>
          </Hidden>
        </Grid>

        <Grid item md={9} xs={12}>
          {ads.posts.length ? (
            <>
              <Typography variant="h6" align="center">
                Your Ads
              </Typography>
              <TblContainer>
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Ad Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Visibility</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recordsAfterPaging().map((record, idx) => (
                    <tr key={record._id}>
                      <td data-label="Id">{idx + 1}</td>
                      <td data-label="Ad Name">{record.name}</td>
                      <td data-label="Category">{record.category}</td>
                      <td data-label="Visibility">
                        {record.isVisible ? "Visibile" : "Hidden"}
                      </td>
                      <td data-label="Status">{record.status}</td>
                      <td data-label="Action">
                        <div>
                          <Controls.ActionButton
                            color="primary"
                            //   component={Link}
                            to={{
                              pathname: ``,
                              state: {
                                //   id: record._id,
                              },
                            }}
                          >
                            <EditOutlined fontSize="small" />
                          </Controls.ActionButton>
                          <Controls.ActionButton color="secondary">
                            <DeleteForever
                              fontSize="small"
                              onClick={() => delPost(record._id)}
                            />
                          </Controls.ActionButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TblContainer>
              <TblPagination />{" "}
            </>
          ) : (
            <NoAds />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
