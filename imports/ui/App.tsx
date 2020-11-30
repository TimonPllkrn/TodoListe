import React from "react";
import {TaskList} from "./Task";
import {useTracker} from "meteor/react-meteor-data";
import {TasksCollection} from "../api/TasksCollection";
import {TaskDialog} from "./TaskDialog";
import {Header} from "./Header";
import {Divider, Typography} from "@material-ui/core";
import {useStyles} from "./App.style";
import {Category} from "../types/Category";
import {User} from "../types/User";

// hard coded categories
export const Categories: Category[] = [
  {
    _id: "1",
    name: "Uni",
    color: "#FF968F"
  },
  {
    _id: "2",
    name: "Arbeit",
    color: "#99C0FF"
  },
  {
    _id: "3",
    name: "Haushalt",
    color: "#7BDE76"
  }
]

export const getCategory = (_id: string): Category | undefined => {
  return Categories.find(c => c._id === _id);
}

// TODO: create UsersCollection
export const Users: User[] = [
  {
    _id: "1",
    name: "David"
  },
  {
    _id: "2",
    name: "Jannik"
  },
  {
    _id: "3",
    name: "Max"
  },
  {
    _id: "4",
    name: "Timon"
  }
]

export const getUser = (_id: string) => {
  return Users.find(u => u._id === _id);
}


export const App = () => {
  const classes = useStyles();
  const doneTasks = useTracker(() => TasksCollection
    .find({done: {$ne: false}}, {sort: {doneDate: 1}})
    .fetch());
  const tasks = useTracker(() => TasksCollection
    .find({done: {$ne: true}}, {sort: {createDate: 1}})
    .fetch());

  return (
    <div>
      <Header/>
      <div className={classes.section}>
        <Typography variant="h5">Create new Task</Typography>
        <TaskDialog></TaskDialog>
      </div>
      <div className={classes.section}>
        <Typography variant="h5">ToDo ({tasks.length})</Typography>
        <TaskList tasks={tasks}/>
      </div>
      <Divider/>
      <div className={classes.section}>
        <Typography variant="h5">Done ({doneTasks.length})</Typography>
        <TaskList tasks={doneTasks}/>
      </div>
    </div>
  );
};
