import React from "react";
import { TaskList } from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { TaskDialog } from "./TaskDialog";
import { Header } from "./Header";
import { Divider, Typography } from "@material-ui/core";
import { Priority } from "../types/Priority";
import { useStyles } from "./App.style";

export const App = () => {
  const classes = useStyles();
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  // TODO: Replace Task dialog component
  return (
    <div>
      <Header />
      <div style={{marginTop: 20}}>
        <TaskDialog categories={[]}></TaskDialog>
      </div>
      <div className={classes.section}>
        <Typography variant="h4">ToDo:</Typography>
        <TaskList tasks={tasks.filter(t => !t.done)} />
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant="h4">Done:</Typography>
        <TaskList tasks={tasks.filter(t => t.done)} />
      </div>
    </div>
  );
};
