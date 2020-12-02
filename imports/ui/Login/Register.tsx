import { Accounts } from "meteor/accounts-base";
import React from "react";
import { LoginForm } from "./LoginForm";

export const Register = () => {
  const handleSignUp = (username: string, password: string) => {
    Accounts.createUser({ username, password }, (err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <LoginForm
        title="TodoList - Register"
        submitBtn={{ text: "Sign up", onClick: handleSignUp }}
        userInputProps={{ autoComplete: "off" }}
        passwortInputProps={{
          autoComplete: "new-password",
        }}
      />
    </div>
  );
};
