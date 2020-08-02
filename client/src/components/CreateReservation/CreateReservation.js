import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/snackbar/snackbarActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CreateReservation = () => {
  const classes = useStyles();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [persons, setPersons] = useState("");
  const [tables, setTables] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  // Check user is login or not
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    history.push("/");
  }

  const bookFun = async () => {
    try {
      const res = await axios.post("/createreservation", {
        fullname,
        email,
        persons,
        tables,
        createdBy: JSON.parse(localStorage.getItem("user")),
      });
      console.log("res...", res.data);

      // Dispatch the action for Snackbar
      dispatch(openSnackbar("Booked successfully..."));

      // Redirect to the reservation page
      history.push("/reservation");
    } catch (error) {
      console.log(error.response.data);
      dispatch(openSnackbar(`Error: ${error.response.data.error}`));
    }
  };

  return (
    <Card className={classes.root} style={{ margin: "100px auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h3" component="h2">
          Book your table
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl>
              <InputLabel htmlFor="my-input">Full Name</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => setFullname(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-input">No of persons</InputLabel>
              <Input
                id="my-input"
                type="number"
                aria-describedby="my-helper-text"
                onChange={(e) => setPersons(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-input">No of tables</InputLabel>
              <Input
                id="my-input"
                type="number"
                aria-describedby="my-helper-text"
                onChange={(e) => setTables(e.target.value)}
              />
            </FormControl>
          </form>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" style={{ margin: "0 auto" }} onClick={bookFun}>
          Book
        </Button>
      </CardActions>
      <br />
      <br />
    </Card>
  );
};

export default CreateReservation;
