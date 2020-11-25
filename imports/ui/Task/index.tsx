import { List } from "@material-ui/core";
import React from "react";
import { Task } from "./Task";
import { Task as TaskType } from "/imports/types/Task";

export interface TaskProps {
  tasks: TaskType[];
}

export const TaskList: React.FC<TaskProps> = ({ tasks }) => {
  return (
    <List>
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </List>
  );
};
