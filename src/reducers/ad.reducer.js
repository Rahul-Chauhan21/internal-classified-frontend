import { adConstants } from "../actions/constants";

const initState = {
  posts: [],
  userCatalogue: [],
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
        userInfo: action.payload.user,
      };
      break;

    case adConstants.GETAD_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        message: null,
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

    case adConstants.REQUEST:
      state = {
        ...state,
        error: null,
        message: null,
      };
      break;

    case adConstants.UPDATEPOST_SUCCESS:
      const filtered = state.posts.filter(
        (post) => post._id !== action.payload.post._id
      );
      state = {
        ...state,
        posts: [...filtered, action.payload.post],
        error: null,
        message: "Updated!",
      };
      break;

    case adConstants.UPDATEPOST_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        message: null,
      };
      break;

    case adConstants.GETCATALOGUE_SUCCESS:
      state = {
        ...state,
        userCatalogue: action.payload.catalogue,
        error: null,
      };
      break;

    case adConstants.GETCATALOGUE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case adConstants.BUY_STATUS:
      state = {
        ...state,
        ad: action.payload.ad,
        error: null,
        message: "Purchase Successful! Thanks for Shopping.",
      };
      break;

    case adConstants.BUY_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case adConstants.RESET_AD_UNMOUNT:
      state = {
        ...state,
        ad: null,
        userInfo: null,
      };
      break;

    case adConstants.POSTAD_REQUEST:
      state = {
        ...state,
        message: "Processing your Ad, Please Wait!",
      };
      break;
  }
  return state;
};
