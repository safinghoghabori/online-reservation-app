import { OPEN, CLOSE } from "./types";

export const openSnackbar = (msg) => {
  return {
    type: OPEN,
    payload: msg,
  };
};

export const closeSnackbar = () => {
  return {
    type: CLOSE,
  };
};
