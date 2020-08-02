import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Reservation from "./components/Reservation/Reservation";
import CreateReservation from "./components/CreateReservation/CreateReservation";
import DisplayReservation from "./components/DisplayReservation/DisplayReservations";
import UpdateReservation from "./components/UpdateReservation/UpdateReservation";
import { Provider } from "react-redux";
import store from "./redux/snackbar/store";
import SnackbarMsg from "./components/Snackbar/SnackbarMsg";
import Logout from "./components/Logout/Logout";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <NavBar />
                <Login />
              </Route>
              <Route path="/signup">
                <NavBar />
                <Signup />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/reservation">
                <NavBar />
                <Reservation />
              </Route>
              <Route path="/createreservation">
                <NavBar />
                <CreateReservation />
              </Route>
              <Route path="/displayreservation">
                <NavBar />
                <DisplayReservation />
              </Route>
              <Route path="/update/:id">
                <NavBar />
                <UpdateReservation />
              </Route>
            </Switch>
            <SnackbarMsg />
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
