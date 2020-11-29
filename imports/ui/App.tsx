import React, { useState } from "react";
import { TaskList } from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { TaskDialog } from "./TaskDialog";
import { Header } from "./Header";
import { Divider, TextField, Typography } from "@material-ui/core";
import { useStyles } from "./App.style";

export const App = () => {
  const classes = useStyles();

  const [todoFilter, setTodoFilter] = useState("");
  const [doneFilter, setDoneFilter] = useState("");

  const doneTasks = useTracker(() =>
    TasksCollection.find(
      { done: { $ne: false } },
      { sort: { doneDate: 1 } }
    ).fetch()
  );
  const tasks = useTracker(() =>
    TasksCollection.find(
      { done: { $ne: true } },
      { sort: { createDate: 1 } }
    ).fetch()
  );

  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoFilter(event.currentTarget.value);
  };
  const handleDoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoneFilter(event.currentTarget.value);
  };

  // TODO: Replace TaskDialog component
  return (
    <div>
      <Header />
      <div style={{ marginTop: 20 }}>
        <TaskDialog categories={[]}></TaskDialog>
      </div>
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <Typography variant="h5">ToDo ({tasks.length})</Typography>
          <div className={classes.flexGrow}></div>
          <TextField
            label="Aufgabe suchen"
            variant="outlined"
            onChange={handleTodoInput}
          />
        </div>
        <TaskList
          tasks={tasks.filter((task) => task.title.includes(todoFilter))}
        />
      </div>
      <Divider />
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <Typography variant="h5">Done ({doneTasks.length})</Typography>
          <div className={classes.flexGrow}></div>
          <TextField
            label="Aufgabe suchen"
            variant="outlined"
            onChange={handleDoneInput}
          />
        </div>
        <TaskList
          tasks={doneTasks.filter((task) => task.title.includes(doneFilter))}
        />
      </div>
    </div>
  );
};
