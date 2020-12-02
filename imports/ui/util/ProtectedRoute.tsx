import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Redirect, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export const ProtectedRoute: React.FC<any> = ({ children }) => {
  const user = useTracker(() => Meteor.user());

  return (
    <Route
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
