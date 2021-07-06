import axios from "../util/axios";
import { userConstants } from "./constants";

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
        console.log(err.response);
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
