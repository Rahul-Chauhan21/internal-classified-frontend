import axios from "../util/axios";
import { adConstants, userConstants, authConstants } from "./constants";

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/users", {
        ...user,
      });
      if (res.status === 200) {
        const { user } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: userConstants.CREATEUSER_SUCCESS,
          payload: {
            message: "Sign Up Successful!",
          },
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        dispatch({
          type: userConstants.CREATEUSER_FAILURE,
          payload: {
            error: err.response.data,
          },
        });
      }
    }
  };
};

export const getUserInfo = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/users/me", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (res.status === 200) {
        const { user, ads } = res.data;
        dispatch({
          type: userConstants.GETUSER_SUCCESS,
          payload: {
            user,
          },
        });

        dispatch({
          type: adConstants.GETPOSTS_SUCCESS,
          payload: {
            posts: ads,
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
          type: userConstants.GETUSER_FAILURE,
          payload: {
            error: "Failed to get user Info",
          },
        });
      }
    }
  };
};

export const editUserInfo = (token, user, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: userConstants.REQUEST,
      });

      const res = await axios.put(
        `/users/${id}`,
        { ...user },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if (res.status === 200) {
        const { user } = res.data;
        const { firstName, lastName, email, contactInfo } = user;
        dispatch({
          type: userConstants.UPDATE_USERAUTHDETAILS,
          payload: {
            firstName,
            lastName,
            email,
            contactInfo,
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
          type: userConstants.UPDATE_USERAUTHDETAILS_FAILURE,
          payload: {
            error: "Failed to update user Info",
          },
        });
      }
    }
  };
};

export const addToCatalogue = (token, adId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/users/addToCatalogue/${adId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if (res.status === 200) {
        const { catalogue } = res.data;
        dispatch({
          type: userConstants.UPDATE_USERCATALOGUE,
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
        dispatch({
          type: userConstants.UPDATE_USERCATALOGUE_FAILURE,
          payload: {
            error: "Failed to update Catalogue",
          },
        });
      }
    }
  };
};

export const removeFromCatalogue = (token, adId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/users/removeFromCatalogue/${adId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if (res.status === 200) {
        const { catalogue } = res.data;
        dispatch({
          type: userConstants.UPDATE_USERCATALOGUE,
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
        dispatch({
          type: userConstants.UPDATE_USERCATALOGUE_FAILURE,
          payload: {
            error: "Failed to update Catalogue",
          },
        });
      }
    }
  };
};

export const buyAd = () => {};
