import React from "react";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();
  const handleSignIn = (username: string, password: string) => {
    console.log(username, password);
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) return console.log(err);

      history.push("/");
    });
  };

  return (
    <div>
      <LoginForm
        title="TodoList"
        submitBtn={{ text: "Sign in", onClick: handleSignIn }}
      />
    </div>
  );
};
