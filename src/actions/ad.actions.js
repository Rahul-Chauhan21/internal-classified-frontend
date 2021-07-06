import axios from "../util/axios";
import { adConstants, commentConstants } from "./constants";

export const getPosts = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/ads", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (res.status === 200) {
        const { posts } = res.data;
        dispatch({
          type: adConstants.GETPOSTS_SUCCESS,
          payload: {
            posts,
          },
        });
      }
    } catch (err) {
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403
      ) {
        console.log(err.response);
        dispatch({
          type: adConstants.GETPOSTS_FAILURE,
          payload: {
            message: err.response.data,
          },
        });
      }
    }
  };
};

export const deletePost = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/ads/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (res.status === 200) {
        const { deletedAd } = res.data;
        dispatch({
          type: adConstants.DELETEPOST_SUCCESS,
          payload: {
            message: "Ad Deleted!",
          },
        });
      }
    } catch (err) {
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 404
      ) {
        console.log(err.response);
        dispatch({
          type: adConstants.DELETEPOSTS_FAILURE,
          payload: {
            message: err.response.data,
          },
        });
      }
    }
  };
};

export const getAdDetails = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/ads/${id}`);
      if (res.status === 200) {
        const { ad, user, comments } = res.data;
        dispatch({
          type: adConstants.GETAD_SUCCESS,
          payload: {
            ad,
            message: null,
            user,
          },
        });

        dispatch({
          type: commentConstants.GETCOMMENTS_SUCCESS,
          payload: {
            comments: comments,
          },
        });
      }
    } catch (err) {
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 404
      ) {
        dispatch({
          type: adConstants.GETAD_FAILURE,
          payload: {
            error: err.response.data,
          },
        });
      }
    }
  };
};

export const setImgArray = (imgArray) => {
  return async (dispatch) => {
    dispatch({
      type: adConstants.SETIMGARRAY,
      payload: {
        imgArray,
      },
    });
  };
};
export const clearImgArray = () => {
  return async (dispatch) => {
    dispatch({
      type: adConstants.CLEARIMGARRAY,
    });
  };
};

export const createAd = (ad, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "/ads",
        { ...ad },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if (res.status === 200) {
        const { ad } = res.data;
        dispatch({
          type: adConstants.POSTAD_SUCCESS,
          payload: {
            message: "Post created, Wait for Verification!",
          },
        });
      }
    } catch (err) {
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 404
      ) {
        dispatch({
          type: adConstants.POSTAD_FAILURE,
          payload: {
            error: err.response.data,
          },
        });
      }
    }
  };
};
