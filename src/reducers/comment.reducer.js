import { commentConstants } from "../actions/constants";

const initState = {
  error: null,
  message: null,
  comments: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case commentConstants.POSTCOMMENT_SUCCESS:
      state = {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
      break;

    case commentConstants.POSTCOMMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case commentConstants.GETCOMMENTS_SUCCESS:
      state = {
        ...state,
        comments: action.payload.comments,
      };
  }
  return state;
};
