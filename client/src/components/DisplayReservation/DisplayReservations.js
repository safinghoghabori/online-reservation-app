import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const DisplayReservation = () => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  // Check user is login or not
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    history.push("/");
  }

  useEffect(() => {
    const displayData = async () => {
      try {
        const createdBy = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`/displayreservation/${createdBy._id}`);
        console.log("res...", res.data);

        // Set reservation details into data state
        setData(res.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    displayData();
  }, []);

  const handleUpdate = (id) => {
    // console.log("update...",id);
    history.push(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/delete/${id}`);

      // Make new reqest to update the state
      const createdBy = JSON.parse(localStorage.getItem("user"));
      const afterDeleteData = await axios.get(`/displayreservation/${createdBy._id}`);
      setData(afterDeleteData.data.data);

      setSnackbarMsg("Deleted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.log(error);
      setSnackbarMsg(`Error: ${error.response.data.error}`);
      setOpenSnackbar(true);
    }
  };
  return (
    <div>
      <h1>All Reservation Details</h1>
      <hr />
      {data &&
        data.map((res) => (
          <Card className={classes.root} style={{ margin: "50px auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {res.fullname}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <form className={classes.root} noValidate autoComplete="off">
                  <InputLabel htmlFor="my-input">Email: {res.email}</InputLabel>
                  <br />
                  <InputLabel htmlFor="my-input">Persons: {res.persons}</InputLabel>
                  <br />
                  <InputLabel htmlFor="my-input">Tables: {res.tables}</InputLabel>
                  <br />
                </form>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "0 auto" }}
                onClick={() => handleUpdate(res._id)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "0 auto" }}
                onClick={() => handleDelete(res._id)}
              >
                Delete
              </Button>
            </CardActions>
            <br />
            <br />
          </Card>
        ))}
      {data.length === 0 && <h2>No reservations.</h2>}
    </div>
  );
};

export default DisplayReservation;
