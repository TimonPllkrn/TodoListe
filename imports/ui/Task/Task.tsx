import {Avatar, Button, Chip, Divider, Grid, IconButton, Paper, Popover, Select, TextField, Typography} from "@material-ui/core";
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
import { Categories, getCategory } from "../App";

export interface TaskProps {
  task: TaskType;
}


const setDone = (_id: string, done: boolean) => {
  TasksCollection.update(_id, {
    $set: {
      done: done,
      doneDate: done ? new Date() : undefined
    }
  })
};

const setCategory = (_id: string, _cId: string | undefined) => {
  if (_cId) {
    TasksCollection.update(_id, {
      $set: {
        category: getCategory(_cId)
      }
    });
  } else {
    TasksCollection.update(_id, {
      $unset: {
        category: true
      }
    });
  }
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const cardColor = task.done ? "#BCFFCF" : "#FFFCAC"

  const handleChipClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectCategory = (_cId: string | undefined) => {
    setAnchorEl(null);
    setCategory(task._id, _cId);
  }


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
    <Paper className={classes.paper} elevation={5} style={{backgroundColor: cardColor}}>
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
          <Button onClick={handleChipClick} >
           <Chip 
             className={classes.chip} 
             label={task.category?.name || "None"}  
             style={{backgroundColor: task.category?.color}} />
          </Button>
          <Popover
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
          <Button className={classes.section} onClick={() => handleSelectCategory(undefined)}>
            <Chip className={classes.chip} label={"None"} />
          </Button>
          {Categories.map(c => (
            <Button 
              className={classes.section} 
              key={c._id} 
              onClick={() => handleSelectCategory(c._id)}
            >
              <Chip className={classes.chip} label={c.name} style={{backgroundColor: c.color}}/> 
            </Button>))}
        </Popover>    
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