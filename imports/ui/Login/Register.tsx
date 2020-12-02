import { Accounts } from "meteor/accounts-base";
import React from "react";
import { useStyles } from "./Login.style";
import { LoginForm } from "./LoginForm";

export const Register = () => {
  const classes = useStyles();

  const handleSignUp = (username: string, password: string) => {
    Accounts.createUser({ username, password }, (err) => {
      // TODO
    });
  };

  return (
    <div className={classes.root}>
      <LoginForm
        title="TodoList - Register"
        submitBtn={{ text: "Sign up", onClick: handleSignUp }}
      />
    </div>
  );
};
