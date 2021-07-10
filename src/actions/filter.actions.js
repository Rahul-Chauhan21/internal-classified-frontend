import { filterConstants } from "./constants";

export const updateFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: filterConstants.SETFILTER,
      payload: {
        filter,
      },
    });
  };
};
