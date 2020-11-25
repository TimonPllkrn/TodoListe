import React from "react";
import { TaskList } from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return (
    <div>
      <TaskList tasks={tasks} />
    </div>
  );
};
