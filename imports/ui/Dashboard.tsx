import React, {useState} from "react";
import {TaskList} from "./Task";
import {useTracker} from "meteor/react-meteor-data";
import {TasksCollection} from "../api/TasksCollection";
import {TaskDialog} from "./TaskDialog";
import {Header} from "./Header";
import {Divider, MenuItem, TextField, Typography} from "@material-ui/core";
import {useStyles} from "./Dashboard.style";
import {Category} from "../types/Category";

// hard coded categories
export const Categories: Category[] = [
  {
    _id: "1",
    name: "Uni",
    color: "#FF968F",
  },
  {
    _id: "2",
    name: "Arbeit",
    color: "#99C0FF",
  },
  {
    _id: "3",
    name: "Haushalt",
    color: "#7BDE76",
  },
];

export const getCategory = (_id: string): Category | undefined => {
  return Categories.find((c) => c._id === _id);
};

export const Dashboard = () => {
  const classes = useStyles();

  const [todoFilter, setTodoFilter] = useState("");
  const [doneFilter, setDoneFilter] = useState("");

  const [category, setCategory] = useState<Category | undefined>(undefined);

  const doneTasks = useTracker(() =>
    TasksCollection.find(
      {done: {$ne: false}},
      {sort: {doneDate: 1}}
    ).fetch()
  );
  const tasks = useTracker(() =>
    TasksCollection.find(
      {done: {$ne: true}},
      {sort: {createDate: 1}}
    ).fetch()
  );

  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoFilter(event.currentTarget.value);
  };
  const handleDoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoneFilter(event.currentTarget.value);
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setCategory(getCategory(event.target.value as string));
  };

  return (
    <div>
      <Header/>
      <div className={classes.section} id="taskCreate">
        <div className={classes.sectionHeader}>
          <Typography variant="h5">Create new Task</Typography>
        </div>
        <TaskDialog></TaskDialog>
      </div>
      <div className={classes.section} id="taskToDoList">
        <div className={classes.sectionHeader}>
          <Typography variant="h5">ToDo ({tasks.length})</Typography>
          <div className={classes.flexGrow}></div>
          <TextField
            id="SearchStringTodo"
            value={todoFilter}
            style={{width: 200, marginRight: 20}}
            label="Search..."
            variant="outlined"
            onChange={handleTodoInput}
          />
          <TextField
            id="SearchCategoryTodo"
            style={{width: 200}}
            label="Category..."
            select
            variant="outlined"
            value={category?._id || "None"}
            onChange={handleCategoryChange}
          >
            <MenuItem value={undefined}>None</MenuItem>
            {Categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TaskList
          tasks={tasks.filter((task) =>
            task.title.toLowerCase().includes(todoFilter.toLowerCase())
            && (category === undefined || task.category?._id === category._id)
          )}
        />
      </div>
      <Divider/>
      <div className={classes.section} id="taskDoneList">
        <div className={classes.sectionHeader}>
          <Typography variant="h5">Done ({doneTasks.length})</Typography>
          <div className={classes.flexGrow}></div>
          <TextField
            label="Search..."
            variant="outlined"
            onChange={handleDoneInput}
          />
        </div>
        <TaskList
          tasks={doneTasks.filter((task) =>
            task.title.toLowerCase().includes(doneFilter.toLowerCase())
          )}
        />
      </div>
    </div>
  );
};
