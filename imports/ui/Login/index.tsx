import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { createRef, useState } from "react";
import { useStyles } from "./Login.style";
import { Meteor } from "meteor/meteor";

export const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const username = createRef<HTMLInputElement>();
  const password = createRef<HTMLInputElement>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    if (!username.current?.value || !password.current?.value) return;

    Meteor.loginWithPassword(username.current.value, password.current.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">TodoListe</Typography>
      <TextField
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        required
        autoFocus
        variant="outlined"
      />
      <TextField
        id="password"
        label="Password"
        name="password"
        autoComplete="current-password"
        required
        type={showPassword ? "text" : "password"}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSignIn}>
        Sign in
      </Button>
    </div>
  );
};
