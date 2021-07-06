import { adConstants } from "../actions/constants";

const initState = {
  posts: [],
  approvedAds: [],
  ad: null,
  message: null,
  error: null,
  userInfo: null,
  imgArray: [],
  request: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case adConstants.GETPOSTS_SUCCESS:
      state = {
        ...state,
        posts: action.payload.posts,
      };
      break;
    case adConstants.GETPOSTS_FAILURE:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;

    case adConstants.DELETEPOST_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case adConstants.DELETEPOST_FAILURE:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;

    case adConstants.GETAD_SUCCESS:
      state = {
        ...state,
        ad: action.payload.ad,
        message: action.payload.message,
        userInfo: action.payload.user,
      };
      break;

    case adConstants.GETAD_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case adConstants.SETIMGARRAY:
      state = {
        ...state,
        imgArray: action.payload.imgArray,
      };
      break;

    case adConstants.CLEARIMGARRAY:
      state = {
        ...state,
        imgArray: [],
        error: null,
        message: null,
      };
      break;

    case adConstants.POSTAD_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        request: false,
      };
      break;

    case adConstants.POSTAD_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        request: false,
      };
      break;

    case adConstants.GETAPPROVEDADS_SUCCESS:
      state = {
        ...state,
        approvedAds: action.payload.approvedAds,
        error: null,
      };
      break;

    case adConstants.GETAPPROVEDADS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
