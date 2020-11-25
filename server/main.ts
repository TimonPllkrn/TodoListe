import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { TasksCollection } from "../imports/api/TasksCollection";
import { Priority } from "/imports/types/Priority";
import { Task } from "/imports/types/Task";

const insertTask = (task: Mongo.OptionalId<Task>) => TasksCollection.insert(task);

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      {
        title: "Aufgaben auflisten",
        category: { _id: "1", name: "KSM", color: "red" },
        priority: Priority.Low,
        date: new Date(),
        done: false,
        lastUpdated: new Date(),
        ownerId: "-1",
      },
      {
        title: "Aufgaben kopieren",
        category: { _id: "2", name: "KSM", color: "blue" },
        priority: Priority.High,
        date: new Date(),
        done: false,
        lastUpdated: new Date(),
        ownerId: "-2",
      },
    ].forEach(insertTask);
  }
});
