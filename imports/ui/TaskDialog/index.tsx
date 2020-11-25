import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, InputLabel, Select, TextField } from '@material-ui/core'
import React from 'react'
import { TasksCollection } from '/imports/api/TasksCollection';
import { Category } from '/imports/types/Category';
import { Priority } from '/imports/types/Priority';

export interface NewButtonProps {
  categories: Category[];
}

export const TaskDialog: React.FC<NewButtonProps> = ({ categories }) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState<Priority>(Priority.Medium);
  const [category, setCategory] = React.useState<Category| undefined>(undefined);

  const handlePriorityChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setPriority(event.target.value as Priority);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setCategory(categories[event.target.value as number]);
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
      date: new Date(),
      lastUpdated: new Date()
      
    });
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        New
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>

        <DialogTitle>
          Create Task
        </DialogTitle>
        <Divider></Divider>

        <Box mx={2}>
          <TextField 
            label="Tile" 
            margin="dense" 
            value={title} 
            onChange={(t) => {setTitle(t.target.value)}}
          />
        </Box>
        
        <Box mt={3} mx={2}>
          <InputLabel htmlFor="priority">Priority</InputLabel>
          <Select
            fullWidth
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
            fullWidth
            value={""}
            onChange={handleCategoryChange}
            native
            inputProps={{
              id: 'category'
            }}
          >
            <option value={undefined}>None</option>
            {categories.map(c => (<option value={c._id} key={c._id}>{c.name}</option>))}
          </Select>
        </Box>

        <Divider />
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
