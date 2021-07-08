import { userConstants } from "../actions/constants";

const initState = {
  message: null,
  error: null,
  user: null,
  postedAds: [],
  catalogue: [],
  firstName: null,
  lastName: null,
  email: null,
  contactInfo: null,
  id: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.CREATEUSER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        error: null,
      };
      break;

    case userConstants.CREATEUSER_FAILURE:
      state = {
        ...state,
        message: null,
        error: action.payload.error,
      };
      break;

    case userConstants.USER_AUTHDETAILS:
      state = {
        ...state,
        postedAds: action.payload.postedAds,
        catalogue: action.payload.catalogue,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        contactInfo: action.payload.contactInfo,
        id: action.payload._id,
      };
      break;

    case userConstants.GETUSER_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        error: null,
      };
      break;

    case userConstants.GETUSER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case userConstants.UPDATE_USERAUTHDETAILS:
      state = {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        contactInfo: action.payload.contactInfo,
        message: "User Details updated!",
      };
      break;

    case userConstants.UPDATE_USERAUTHDETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case userConstants.REQUEST:
      state = {
        ...state,
        error: null,
        message: null,
      };
      break;

    case userConstants.UPDATE_USERCATALOGUE:
      state = {
        ...state,
        catalogue: action.payload.catalogue,
      };
      break;

    case userConstants.UPDATE_USERAUTHDETAILS_FAILURE:
      state = {
        ...state,
        error: "Toggle Failed!",
      };
      break;
  }
  return state;
};
