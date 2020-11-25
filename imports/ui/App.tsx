import React from "react";
import { Task as TaskType } from "../types/Task";
import { Priority } from "../types/Priority";
import { TaskList } from "./Task";

const tasks: TaskType[] = [
  {
    id: 0,
    title: "Aufgaben auflisten",
    category: { id: 1, name: "KSM" },
    priority: Priority.Low,
    date: new Date(),
    done: false,
    lastUpdated: new Date(),
    owner: 1,
  },
  {
    id: 1,
    title: "Aufgaben kopieren",
    category: { id: 1, name: "KSM" },
    priority: Priority.High,
    date: new Date(),
    done: false,
    lastUpdated: new Date(),
    owner: 1,
  },
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <TaskList tasks={tasks} />
  </div>
);
