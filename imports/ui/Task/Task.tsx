import {Avatar, Chip, Divider, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import React from "react";
import { Task as TaskType } from "../../types/Task";
import { useStyles } from "./Task.style";
import { Priority } from "/imports/types/Priority";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import { TasksCollection } from "/imports/api/TasksCollection";

export interface TaskProps {
  task: TaskType;
}

const setDone = (_id: string, done: boolean) => {
  TasksCollection.update(_id, {
    $set: {
      done: done,
      date: new Date()
    }
  })
};

export const Task: React.FC<TaskProps> = ({ task }) => {
  const classes = useStyles();
  const color = task.done ? "#BCFFCF" : "#FFFCAC"
  const buttons = task.done ? (
    <div>
      <IconButton onClick={() => setDone(task._id, false)}>
        <CancelIcon color="error" />
      </IconButton>
      <IconButton >
        <DeleteIcon />
      </IconButton>
    </div>
  ) : (
    <div>
      <IconButton onClick={() => setDone(task._id, true)}>
        <CheckCircleIcon style={{fill: "green"}} />
      </IconButton>
      <IconButton color="secondary" >
        <EditIcon />
      </IconButton>
    </div>
  )

  return (
    <Paper className={classes.paper} elevation={5} style={{backgroundColor: color}}>
      <div>
        <div className={classes.section}>
          <Grid container wrap="nowrap" >
          <Grid item xs>
              <Typography variant="subtitle1">{task.title}</Typography>
            </Grid>
            <Grid item>
              <div>
                {buttons}
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <div className={classes.section}>
          <Chip className={classes.chip} label={task.category?.name || "None"} />
          <IconButton size="small" disabled>{getPriorityIcon(task.priority)}</IconButton>
        </div>
        <Divider />
        <div className={classes.section}>
          <Grid container>
            <Grid item >
              <Avatar className={classes.avatar} />
            </Grid>
            <Grid >
              <Typography>{task.ownerId}</Typography>
            </Grid>
          </Grid>
        </div>     
      </div>
    </Paper>
  );
};

const getPriorityIcon = (p: Priority) => {
  switch (p) {
    case Priority.High:
      return <ExpandLessIcon fontSize="large" color="secondary" />;
    case Priority.Medium:
      return <RemoveIcon fontSize="large" />;
    case Priority.Low:
      return <ExpandMoreIcon fontSize="large" color="primary" />;
  }
};