import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { closeSnackbar } from "../../redux/snackbar/snackbarActions";

const SnackbarMsg = () => {
  const { open, msg } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      {/* Snackbar to display, we set it to parent */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        message={msg}
        onClose={() => dispatch(closeSnackbar())}
      />
    </>
  );
};

export default SnackbarMsg;
