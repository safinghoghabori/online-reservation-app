import { createStore } from "redux";
import snackbarReducer from "./snackbarReducer";

const store = createStore(snackbarReducer);

export default store;
