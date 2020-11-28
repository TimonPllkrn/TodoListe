import React from "react";
import { TaskList } from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { TaskDialog } from "./TaskDialog";
import { Header } from "./Header";
import { Divider, Typography } from "@material-ui/core";
import { useStyles } from "./App.style";

export const App = () => {
  const classes = useStyles();
  const doneTasks = useTracker(() => TasksCollection
    .find({ done: { $ne: false } }, { sort: { doneDate: 1 } })
    .fetch());
  const tasks = useTracker(() => TasksCollection
    .find({ done: { $ne: true } }, { sort: { createDate: 1 } })
    .fetch());

  // TODO: Replace TaskDialog component
  return (
    <div>
      <Header />
      <div style={{marginTop: 20}}>
        <TaskDialog categories={[]}></TaskDialog>
      </div>
      <div className={classes.section}>
        <Typography variant="h5">ToDo ({tasks.length})</Typography>
        <TaskList tasks={tasks} />
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant="h5">Done ({doneTasks.length})</Typography>
        <TaskList tasks={doneTasks} />
      </div>
    </div>
  );
};
