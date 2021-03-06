import { filterConstants } from "../actions/constants";

const initState = {
  filter: "All",
};

export default (state = initState, action) => {
  switch (action.type) {
    case filterConstants.SETFILTER:
      state = {
        filter: action.payload.filter,
      };
      break;
  }
  return state;
};
