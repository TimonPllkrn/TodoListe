import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Task as TaskType } from "../../types/Task";
import { TaskInfo } from "./TaskInfo";

export interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <ListItem button>
      <ListItemText
        primary={task.title}
        primaryTypographyProps={{ variant: "h5" }}
        secondary={<TaskInfo task={task} />}
        secondaryTypographyProps={{ component: "div" }}
      />
    </ListItem>
  );
};
