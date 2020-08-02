import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory, useParams } from "react-router-dom";
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

const UpdateReservation = () => {
  const classes = useStyles();
  const history = useHistory();
  const param = useParams();
  const dispatch = useDispatch();

  const [defaultData, setDefaultData] = useState({
    fullname: "",
    email: "",
    persons: "",
    tables: "",
  });

  // useEffect(() => {
  //   console.log(defaultData);
  // }, [defaultData]);

  // Check user is login or not
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    history.push("/");
  }

  useEffect(() => {
    const defaultData = async () => {
      try {
        const res = await axios.get(`/defaulvalues/${param.id}`);
        setDefaultData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    defaultData();
  }, []);
  // console.log("default...", defaultData);
  const updateFun = async () => {
    try {
      const res = await axios.patch(`/update/${param.id}`, {
        ...defaultData,
        createdBy: JSON.parse(localStorage.getItem("user")),
      });
      // console.log("res...", res.data);

      // Dispatch the action for Snackbar
      dispatch(openSnackbar("Updated successfully..."));

      // Redirect to the reservation page
      history.push("/displayreservation");
    } catch (error) {
      console.log(error.response.data);
      dispatch(openSnackbar(`Error: ${error.response.data.error}`));
    }
  };

  return (
    <Card className={classes.root} style={{ margin: "100px auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h3" component="h2">
          Update your table
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl>
              <InputLabel htmlFor="my-input">Full Name</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={defaultData.fullname}
                onChange={(e) =>
                  setDefaultData((state) => {
                    return {
                      ...state,
                      fullname: e.target.value,
                    };
                  })
                }
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={defaultData.email}
                onChange={(e) =>
                  setDefaultData((state) => {
                    return {
                      ...state,
                      email: e.target.value,
                    };
                  })
                }
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-input">No of persons</InputLabel>
              <Input
                id="my-input"
                type="number"
                aria-describedby="my-helper-text"
                value={defaultData.persons}
                onChange={(e) =>
                  setDefaultData((state) => {
                    return {
                      ...state,
                      persons: e.target.value,
                    };
                  })
                }
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-input">No of tables</InputLabel>
              <Input
                id="my-input"
                type="number"
                aria-describedby="my-helper-text"
                value={defaultData.tables}
                onChange={(e) =>
                  setDefaultData((state) => {
                    return {
                      ...state,
                      tables: e.target.value,
                    };
                  })
                }
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
          onClick={updateFun}
        >
          Update
        </Button>
      </CardActions>
      <br />
      <br />
    </Card>
  );
};

export default UpdateReservation;
