import { OPEN, CLOSE } from "./types";

const snackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        open: true,
        msg: action.payload,
      };
    }
    case CLOSE: {
      return {
        ...state,
        open: false,
        msg: "",
      };
    }
    default:
      return state;
  }
};

export default snackbarReducer;
