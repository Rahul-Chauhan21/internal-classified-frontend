import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost, requestCall } from "../actions/ad.actions";
import { Grid, Typography, Hidden, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { Controls } from "./controls/Controls";
import { EditOutlined, DeleteForever } from "@material-ui/icons";
import useTable from "../hooks/useTable";
import Popup from "./Popup";
import EditAdForm from "./EditAdForm";
import "../assets/responsivetable.css";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const headCells = [
  { id: "id", label: "Id" },
  { id: "name", label: "Ad Name" },
  { id: "description", label: "Description" },
  { id: "category", label: "Category" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions" },
];

const ManageAds = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const auth = useSelector((state) => state.auth);
  const ads = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts();
  }, []);

  const { TblContainer, TblPagination, recordsAfterPaging } = useTable(
    ads.posts,
    headCells
  );

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setState({ ...state, open: false });
    }

    setState({ ...state, open: false });
  };

  const delPost = async (id) => {
    await dispatch(deletePost(auth.token, id));
    setState({ ...state, open: true });
    fetchPosts();
  };

  const fetchPosts = () => {
    dispatch(getPosts(auth.token));
  };

  return (
    <Grid item md={9} xs={12}>
      <Typography variant="h6" align="center">
        Manage Ads
      </Typography>
      <TblContainer>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ad Name</th>
            <Hidden only="sm">
              <th scope="col">Description</th>
            </Hidden>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {recordsAfterPaging().map((record, idx) => (
            <tr key={record._id}>
              <td data-label="Id">{idx + 1}</td>
              <td data-label="Ad Name">{record.name}</td>
              <Hidden only="sm">
                <td data-label="Description">{record.description}</td>
              </Hidden>
              <td data-label="Category">{record.category}</td>
              <td data-label="Status">{record.status}</td>
              <td data-label="Action">
                <div>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      dispatch(requestCall());
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success">
          {ads.message}
        </Alert>
      </Snackbar>
      <Popup
        title="Edit Ad Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditAdForm recordForEdit={recordForEdit} updateUserPosts={false} />
      </Popup>
    </Grid>
  );
};

export default ManageAds;
