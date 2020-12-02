import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";

export const Register = () => {
  const [error, setError] = useState(false);

  const handleSignUp = (username: string, password: string) => {
    setError(false);
    Accounts.createUser({ username, password }, (err) => {
      if (err) setError(true);
    });
  };

  return (
    <div>
      <LoginForm
        title="TodoList - Register"
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
