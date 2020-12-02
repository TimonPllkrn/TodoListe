import { Dashboard } from "@material-ui/icons";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Login/Register";
import { ProtectedRoute } from "./util/ProtectedRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};
