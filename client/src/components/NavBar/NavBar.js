import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { Link, useHistory } from "react-router-dom";
import "../../App.css";
import NavigationDrawer from "./NavigationDrawer";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: "red",
  },
  title: {
    flexGrow: 1,
  },
  menuDemo: {
    color: "black",
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const NavBar = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const classes = useStyles();
  var menuItems = [];

  const handleMobileDrawerOpen = () => {
    setIsMobileDrawerOpen(true);
  };
  if (!localStorage.getItem("user")) {
    menuItems = [
      {
        link: "/",
        name: "Login",
        icon: <HomeIcon className="text-white" />,
      },
      {
        link: "/signup",
        name: "Signup",
        icon: <PersonAddIcon className="text-white" />,
      },
    ];
  }
  if (localStorage.getItem("user")) {
    menuItems = [
      {
        link: "/createreservation",
        name: "Book your table",
        icon: <CreateIcon className="text-white" />,
      },
      {
        link: "/displayreservation",
        name: "View reservations",
        icon: <VisibilityIcon className="text-white" />,
      },
      {
        link: "/logout",
        name: "Logout",
        icon: <ExitToAppIcon className="text-white" />,
      },
    ];
  }

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} style={{ textAlign: "left" }}>
            <Link to="/" className="navbarLinks">
              Online Reservation Portal
            </Link>
          </Typography>
          <IconButton
            onClick={handleMobileDrawerOpen}
            color="inherit"
            className={classes.hamburgerMenu}
          >
            <ListIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />
    </>
  );
};

export default NavBar;
