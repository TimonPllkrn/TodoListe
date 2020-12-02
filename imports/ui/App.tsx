import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { Register } from "./Login/Register";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route
            path="/"
            render={({ location }) =>
              user ? (
                <Dashboard />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location },
                  }}
                />
              )
            }
          ></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
