import { Box } from "@material-ui/core";
import React from "react";
import { Task } from "./Task";
import { Task as TaskType } from "/imports/types/Task";

export interface TaskProps {
  tasks: TaskType[];
}

export const TaskList: React.FC<TaskProps> = ({ tasks }) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {tasks.map((task) => (
          <Task task={task} key={task._id} />      
      ))}
    </Box>
  );
};