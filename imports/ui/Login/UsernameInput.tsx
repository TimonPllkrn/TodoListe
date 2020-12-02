import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React from "react";

export const UsernameInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      id="username"
      label="Username"
      name="username"
      autoComplete="username"
      required
      autoFocus
      variant="outlined"
      {...props}
    />
  );
};
