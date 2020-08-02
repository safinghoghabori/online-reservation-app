import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Reservation = () => {
  const classes = useStyles();
  const history = useHistory();

  // Check user is login or not
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    history.push("/");
  }

  const handleBookTable = () => {
    history.push("/createreservation");
  };

  const handleViewReservation = () => {
    history.push("/displayreservation");
  };

  return (
    <>
      <Card className={classes.root} style={{ margin: "100px auto" }}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            ACTIONS
          </Typography>
          <hr />
          <Typography variant="body2" color="textSecondary" component="p">
            <div style={{ margin: "0px 60px" }}>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={handleBookTable}
                >
                  Book Your Table!
                </Button>
              </CardActions>
              <CardActions>
                <Button
                  variant="contained"
                  style={{ color: "white", background: "#26a69a" }}
                  onClick={handleViewReservation}
                >
                  View your reservations
                </Button>
              </CardActions>
            </div>
          </Typography>
        </CardContent>
        <br />
        <br />
      </Card>
    </>
  );
};

export default Reservation;
