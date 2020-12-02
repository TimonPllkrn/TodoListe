import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { Categories, getCategory, Users } from "../App";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Category } from "/imports/types/Category";
import { Priority } from "/imports/types/Priority";
import { useStyles } from "/imports/ui/Task/Task.style";
import { User } from "/imports/types/User";

export const TaskDialog: React.FC = () => {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState<Priority>(Priority.Medium);
  const [category, setCategory] = React.useState<Category | undefined>(
    undefined
  );
  const [user, setUser] = React.useState<User | undefined>(undefined);

  const handlePriorityChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setPriority(event.target.value as Priority);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setCategory(getCategory(event.target.value as string));
  };
  const handleUserChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setUser(getCategory(event.target.value as string));
  };

  const handleSave = () => {
    if (title.trim() === "") {
      return;
    }

    TasksCollection.insert({
      title: title,
      category: category,
      done: false,
      ownerId: user?._id || "-1",
      priority: Number(priority),
      createDate: new Date(),
      doneDate: undefined,
    });
    setTitle("");
    setPriority(Priority.Medium);
    setCategory(undefined);
    setUser(undefined);
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <Paper className={classes.paper2} elevation={5}>
        <Grid container spacing={2}>
          <Grid container item direction="row" alignItems="flex-end">
            <Grid item xs={6}>
              <Box mx={2}>
                <TextField
                  fullWidth
                  label="Title"
                  margin="dense"
                  value={title}
                  onChange={(t) => {
                    setTitle(t.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mt={3} mx={2}>
                <InputLabel htmlFor="priority">Priority</InputLabel>
                <Select
                  fullWidth
                  value={priority}
                  onChange={handlePriorityChange}
                  inputProps={{
                    id: "priority",
                  }}
                >
                  <MenuItem value={Priority.Low}>Low</MenuItem>
                  <MenuItem value={Priority.Medium}>Medium</MenuItem>
                  <MenuItem value={Priority.High}>High</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>
          <Grid container item direction="row" alignItems="flex-end">
            <Grid item xs={6}>
              <Box my={3} mx={2}>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  fullWidth
                  value={category?._id || ""}
                  onChange={handleCategoryChange}
                  inputProps={{
                    id: "category",
                  }}
                >
                  <MenuItem value={undefined}>None</MenuItem>
                  {Categories.map((c) => (
                    <MenuItem value={c._id} key={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box my={3} mx={2}>
                <InputLabel htmlFor="user">User</InputLabel>
                <Select
                  fullWidth
                  value={user?._id || ""}
                  onChange={handleUserChange}
                  inputProps={{
                    id: "user",
                  }}
                >
                  <MenuItem value={undefined}>None</MenuItem>
                  {Users.map((c) => (
                    <MenuItem value={c._id} key={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.flex}>
          <div className={classes.flexGrow}></div>
          <Button
            className={classes.button}
            onClick={handleSave}
            color="primary"
          >
            Save
          </Button>
        </div>
      </Paper>
    </Box>
  );
};
