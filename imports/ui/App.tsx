import React from "react";
import { Task } from "./Task";
import { Task as TaskType } from "../types/Task";
import { Priority } from "../types/Priority";

const task: TaskType = {
  id: 0,
  title: "Aufgaben auflisten",
  category: { id: 1, name: "KSM" },
  priority: Priority.Low,
  date: new Date(),
  done: false,
  lastUpdated: new Date(),
  owner: 1,
};

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Task task={task} />
  </div>
);
