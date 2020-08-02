import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
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

const Signup = () => {
  const classes = useStyles();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const signupFun = async (e) => {
    e.preventDefault();
    try {
      if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
        dispatch(openSnackbar("Error: Please enter valid email..."));
        return;
      }
      await axios.post("/signup", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      });

      // Dispatch the action for Snackbar
      dispatch(openSnackbar("Registered successfully..."));

      history.push("/");
    } catch (error) {
      console.log("Error ", error.response.data.error);
      dispatch(openSnackbar(`Error: ${error.response.data.error}`));
    }
  };

  return (
    <Card className={classes.root} style={{ margin: "100px auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h3" component="h2">
          Signup
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl>
              <InputLabel htmlFor="my-fname">Firstname</InputLabel>
              <Input
                id="my-fname"
                type="text"
                aria-describedby="my-helper-text"
                onChange={(e) => setFname(e.target.value)}
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor="my-linput">Lastname</InputLabel>
              <Input
                id="my-linput"
                type="text"
                aria-describedby="my-helper-text"
                onChange={(e) => setLname(e.target.value)}
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input
                id="my-input"
                type="email"
                aria-describedby="my-helper-text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor="my-pass">Password</InputLabel>
              <Input
                id="my-pass"
                type="password"
                aria-describedby="my-helper-text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </form>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0 auto" }}
          onClick={signupFun}
        >
          Signup
        </Button>
      </CardActions>
      <Link to="/" style={{ fontWeight: "bold" }}>
        Already have an account? login here!
      </Link>
      <br />
      <br />
    </Card>
  );
};

export default Signup;
