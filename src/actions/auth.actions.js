import axios from "../util/axios";
import { adConstants, authConstants, userConstants } from "./constants";

export const logIn = (user) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/auth", {
        ...user,
      });

      if (res.status === 200) {
        const {
          token,
          postedAds,
          catalogue,
          firstName,
          _id,
          role,
          lastName,
          contactInfo,
          email,
        } = res.data;
        localStorage.setItem("token", token);
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            role,
          },
        });

        dispatch({
          type: userConstants.USER_AUTHDETAILS,
          payload: {
            postedAds,
            catalogue,
            firstName,
            lastName,
            email,
            contactInfo,
            _id,
          },
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: err.response.data.error,
          },
        });
      }
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });

    dispatch({
      type: userConstants.USER_CLEAR_AUTHDETAILS,
    });

    dispatch({
      type: adConstants.RESET_USER_AD_DETAILS,
    });
  };
};
