import { Chip, Typography } from "@material-ui/core";
import React from "react";
import { TaskProps } from "./Task";
import { useStyles } from "./Task.style";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { formatDistanceToNow } from "date-fns";
import { IconWithText } from "../util/IconWithText";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Priority } from "/imports/types/Priority";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";

export const TaskInfo: React.FC<TaskProps> = ({ task }) => {
  const classes = useStyles();

  const getPriorityIcon = (p: Priority) => {
    switch (p) {
      case Priority.High:
        return <ExpandLessIcon />;
      case Priority.Medium:
        return <ExpandMoreIcon />;
      case Priority.Low:
        return <RemoveIcon />;
    }
  };

  return (
    <div className={classes.root}>
      <Chip className={classes.chip} label={task.category.name} />
      <IconButton size="small">{getPriorityIcon(task.priority)}</IconButton>
      <div className={classes.secondary}>
        <Typography className={classes.chip} component="div">
          <IconWithText
            icon={<AccessTimeIcon />}
            iconTooltip="last updated"
            text={formatDistanceToNow(task.lastUpdated, {
              addSuffix: false,
            })}
            textTooltip={task.lastUpdated.toLocaleString()}
          />
        </Typography>
        <Tooltip title={task.owner}>
          <Avatar className={classes.small} />
        </Tooltip>
      </div>
    </div>
  );
};
