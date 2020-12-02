import React from "react";
import {
  AppBar,
  Avatar,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { useStyles } from "./Header.style";
import { useTracker } from "meteor/react-meteor-data";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

export const Header: React.FC = () => {
  const classes = useStyles();
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">ToDo-App</Typography>
        <div className={classes.flexGrow} />
        <Tooltip title={user?.username ?? ""}>
          <IconButton onClick={handleClick}>
            <Avatar alt={user?.username ?? ""} src={user?.username ?? ""} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
