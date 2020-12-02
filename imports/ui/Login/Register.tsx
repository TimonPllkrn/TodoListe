import { IconButton } from "@material-ui/core";
import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./Login.style";
import { LoginForm } from "./LoginForm";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export const Register = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSignUp = (username: string, password: string) => {
    setError(false);
    Accounts.createUser({ username, password }, (err) => {
      if (err) setError(true);

      history.push("/login");
    });
  };

  return (
    <div className={classes.login}>
      <LoginForm
        title="TodoList - Register"
        btnTop={
          <IconButton onClick={() => history.push("/login")}>
            <ArrowBackIosIcon />
          </IconButton>
        }
        submitBtn={{ text: "Sign up", onClick: handleSignUp }}
        userInputProps={{
          autoComplete: "off",
          error: error,
          helperText: error ? "Username is not available." : "",
        }}
        passwortInputProps={{
          autoComplete: "new-password",
        }}
      />
    </div>
  );
};
