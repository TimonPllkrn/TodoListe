import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core"

export const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h4" >
          ToDo-App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}