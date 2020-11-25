import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection";
import { Priority } from "/imports/types/Priority";
import { Task } from "/imports/types/Task";

const insertTask = (task: Task) => TasksCollection.insert(task);

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      {
        id: 0,
        title: "Aufgaben auflisten",
        category: { id: 1, name: "KSM" },
        priority: Priority.Low,
        date: new Date(),
        done: false,
        lastUpdated: new Date(),
        owner: 1,
      },
      {
        id: 1,
        title: "Aufgaben kopieren",
        category: { id: 1, name: "KSM" },
        priority: Priority.High,
        date: new Date(),
        done: false,
        lastUpdated: new Date(),
        owner: 1,
      },
    ].forEach(insertTask);
  }
});
