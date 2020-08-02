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
import "../../App.css";
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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    history.push("/reservation");
  }

  const loginFun = async () => {
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      // console.log("res...", res.data);

      // Store user data into localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // Dispatch the action for Snackbar
      dispatch(openSnackbar("Login successfully..."));

      // Redirect to the reservation page
      history.push("/reservation");
    } catch (error) {
      console.log(error.response.data);
      dispatch(openSnackbar(`Error: ${error.response.data.error}`));
    }
  };

  return (
    <>
      <Card className={classes.root} style={{ margin: "100px auto" }}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            Login
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <form className={classes.root} noValidate autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input
                  id="my-input"
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
            onClick={loginFun}
          >
            Login
          </Button>
        </CardActions>
        <Link to="/signup" style={{ fontWeight: "bold" }}>
          New user? resgister here!
        </Link>
        <br />
        <br />
      </Card>
    </>
  );
};

export default Login;
