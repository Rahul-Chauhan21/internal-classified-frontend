import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getCatalogue } from "../actions/ad.actions";
import { getUserInfo, userRequestCall } from "../actions";
import { Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./HOC/PrivateRoute";
import AdminPrivateRoute from "./HOC/AdminRoute";
import ManageAds from "./ManageAds";
import EditUserInfo from "./EditUserInfo";
import ViewCatalogue from "./ViewCatalogue";

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
import Popup from "./Popup";
import EditAdForm from "./EditAdForm";
import NoAds from "./NoAds";
import "../assets/responsivetable.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    overflow: "hidden",
    padding: "16px 20px",
    "& .MuiButton-label:hover": {
      color: "rgba(0, 0, 0, 0.87) !important",
    },
    "& .MuiButton-text:hover": {
      color: "rgba(0, 0, 0, 0.87) !important",
    },
    "& .MuiLink-underlineHover:hover": {
      color: "#1890ff !important",
    },
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

const Dashboard = ({ match: { path } }) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const userSelector = useSelector((state) => state.user);
  const ads = useSelector((state) => state.ads);
  const dispatch = useDispatch();
  const { user } = userSelector;

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    dispatch(getUserInfo(auth.token));
    dispatch(getCatalogue(auth.token));
  };

  const delPost = async (id) => {
    await dispatch(deletePost(auth.token, id));
    fetchDetails();
  };

  const { TblContainer, TblPagination, recordsAfterPaging } = useTable(
    ads.userPosts,
    headCells
  );

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
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
                Full Name: {userSelector?.firstName} {userSelector?.lastName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Email : {userSelector?.email}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Contact: {userSelector?.contactInfo}
              </Typography>
            </Box>
          </Box>
          <Hidden smDown>
            <Button component={Link} to={`${path}/`}>
              My Ads
            </Button>
            <Button component={Link} to={`${path}/view-catalogue`}>
              View Catalogue
            </Button>
            <Button component={Link} to={`${path}/edit-profile`}>
              Edit Profile
            </Button>
            {auth.role === "Admin" && (
              <Button component={Link} to={`${path}/verification`}>
                Verify Posts
              </Button>
            )}
          </Hidden>

          <Typography
            variant="body2"
            align="center"
            gutterBottom
            style={{ marginTop: "8px" }}
          >
            Member since July 2021
          </Typography>

          <Typography varaint="body2" component={MuiLink} align="center">
            Share profile Link
          </Typography>
        </Grid>
        <Switch>
          <Route path={`${path}/`} exact>
            <Grid item md={9} xs={12}>
              {ads.userPosts.length ? (
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
                                onClick={() => {
                                  dispatch(userRequestCall());
                                  openInPopup(record);
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
                  <TblPagination />
                  <Popup
                    title="Edit Your Ad Details"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                  >
                    <EditAdForm
                      recordForEdit={recordForEdit}
                      updateUserPosts={true}
                    />
                  </Popup>
                </>
              ) : (
                <NoAds />
              )}
            </Grid>
          </Route>
          <PrivateRoute
            exact
            path={`${path}/view-catalogue`}
            component={ViewCatalogue}
          />
          <PrivateRoute
            exact
            path={`${path}/edit-profile`}
            component={EditUserInfo}
          />
          <AdminPrivateRoute
            exact
            path={`${path}/verification`}
            component={ManageAds}
          />
        </Switch>
      </Grid>
    </Container>
  );
};

export default Dashboard;
