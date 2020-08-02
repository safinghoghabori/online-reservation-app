import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  // Clear the localStorage
  localStorage.clear();
  history.push("/");
  return <></>;
};

export default Logout;
