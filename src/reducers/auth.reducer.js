import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        token: action.payload.token,
        error: null,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case authConstants.LOGOUT_REQUEST:
      state = {
        ...initState,
      };
      break;
  }
  return state;
};
