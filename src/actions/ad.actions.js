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
            user,
          },
        });

        dispatch({
          type: commentConstants.GETCOMMENTS_SUCCESS,
          payload: {
            comments,
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

export const getAds = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/ads/approvedAds");
      if (res.status === 200) {
        const { ads } = res.data;
        dispatch({
          type: adConstants.GETAPPROVEDADS_SUCCESS,
          payload: {
            approvedAds: ads,
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
          type: adConstants.GETAPPROVEDADS_FAILURE,
          payload: {
            error: err.response.data,
          },
        });
      }
    }
  };
};

export const editAd = (token, id, ad) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/ads/${id}`,
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
          type: adConstants.UPDATEPOST_SUCCESS,
          payload: {
            post: ad,
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
          type: adConstants.UPDATEPOST_FAILURE,
          payload: {
            error: err.response.data,
          },
        });
      }
    }
  };
};

export const requestCall = () => {
  return async (dispatch) => {
    dispatch({
      type: adConstants.REQUEST,
    });
  };
};

export const getCatalogue = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/ads/myCatalogueAds", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (res.status === 200) {
        const { catalogue } = res.data;
        dispatch({
          type: adConstants.GETCATALOGUE_SUCCESS,
          payload: {
            catalogue,
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
          type: adConstants.GETCATALOGUE_FAILURE,
          payload: {
            error: "Failed to fetch Catalogue",
          },
        });
      }
    }
  };
};

export const buyAd = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/ads/buyAd/${id}`,
        {},
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
          type: adConstants.BUY_STATUS,
          payload: {
            ad,
          },
        });
      }
    } catch (err) {
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403
      ) {
        dispatch({
          payload: {
            type: adConstants.BUY_FAILURE,
            error: "Could'nt Make a Purchase",
          },
        });
      }
    }
  };
};

export const unMountAd = () => {
  return async (dispatch) => {
    dispatch({
      type: adConstants.RESET_AD_UNMOUNT,
    });

    dispatch({
      type: commentConstants.RESET_COMMENTS_UNMOUNT,
    });
  };
};

export const postAdRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: adConstants.REQUEST,
    });

    dispatch({
      type: adConstants.POSTAD_REQUEST,
    });
  };
};
