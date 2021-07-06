import axios from "../util/axios";
import { authConstants, userConstants } from "./constants";

export const logIn = (user) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/auth", {
        ...user,
      });

      if (res.status === 200) {
        const { token, postedAds, catalogue, firstName, _id } = res.data;
        localStorage.setItem("token", token);
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
          },
        });

        dispatch({
          type: userConstants.USER_AUTHDETAILS,
          payload: {
            postedAds,
            catalogue,
            firstName,
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
  };
};
