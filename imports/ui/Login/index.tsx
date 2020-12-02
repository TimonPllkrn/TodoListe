import React from "react";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  const handleSignIn = (username: string, password: string) => {
    Meteor.loginWithPassword(username, password);
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
