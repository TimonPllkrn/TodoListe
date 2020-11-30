import {Box, Button, InputLabel, Select, TextField} from '@material-ui/core'
import React from 'react'
import { Categories, getCategory } from '../App';
import {TasksCollection} from '/imports/api/TasksCollection';
import {Category} from '/imports/types/Category';
import {Priority} from '/imports/types/Priority';


export const TaskDialog: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState<Priority>(Priority.Medium);
  const [category, setCategory] = React.useState<Category | undefined>(undefined);

  const handlePriorityChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setPriority(event.target.value as Priority);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setCategory(getCategory(event.target.value as string));
  };

  const handleSave = () => {
    if (title.trim() === "") {
      return;
    }

    TasksCollection.insert({
      title: title,
      category: category,
      done: false,
      ownerId: "-1",
      priority: Number(priority),
      createDate: new Date(),
      doneDate: undefined

    });
    setTitle("");
    setPriority(Priority.Medium);
    setCategory(undefined)

  }

  return (
    <div>
      <Box mx={2}>
        <TextField
          label="Title"
          margin="dense"
          value={title}
          onChange={(t) => {
            setTitle(t.target.value)
          }}
        />
      </Box>

      <Box mt={3} mx={2}>
        <InputLabel htmlFor="priority">Priority</InputLabel>
        <Select
          value={priority}
          onChange={handlePriorityChange}
          native
          inputProps={{
            id: 'priority'
          }}
        >
          <option value={Priority.Low}>Low</option>
          <option value={Priority.Medium}>Medium</option>
          <option value={Priority.High}>High</option>
        </Select>
      </Box>
      <Box my={3} mx={2}>
        <InputLabel htmlFor="category">Category</InputLabel>
        <Select
          value={category?._id || ""}
          onChange={handleCategoryChange}
          native
          inputProps={{
            id: 'category'
          }}
        >
          <option value={undefined}>None</option>
          {Categories.map(c => (<option value={c._id} key={c._id}>{c.name}</option>))}
        </Select>
      </Box>
      <Button onClick={handleSave} color="primary">
        Save
      </Button>
    </div>
  )
}
