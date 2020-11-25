import { Chip, Typography } from "@material-ui/core";
import React from "react";
import { TaskProps } from ".";
import { useStyles } from "./Task.style";

export const TaskInfo: React.FC<TaskProps> = ({ task }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>last updated: {task.lastUpdated.toLocaleString()}</Typography>
      <Typography>Owner: {task.owner}</Typography>
      <Chip label={task.category.name} />
      <Chip label={task.priority} />
    </div>
  );
};
