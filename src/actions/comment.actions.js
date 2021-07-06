import axios from "../util/axios";
import { commentConstants } from "./constants";

export const postComment = (token, comment) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "/comment",
        {
          ...comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (res.status === 200) {
        const { comment } = res.data;
        dispatch({
          type: commentConstants.POSTCOMMENT_SUCCESS,
          payload: {
            comment,
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
          type: commentConstants.POSTCOMMENT_FAILURE,
          payload: {
            error: err.response.data.error,
          },
        });
      }
    }
  };
};
