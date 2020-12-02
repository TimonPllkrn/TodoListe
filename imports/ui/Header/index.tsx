import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { useStyles } from "./Header.style";
const logout = () => Meteor.logout();

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">ToDo-App</Typography>
        <div className={classes.flexGrow} />
        <Button color="secondary" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
