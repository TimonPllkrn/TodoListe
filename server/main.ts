import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { TasksCollection } from "../imports/api/TasksCollection";
import { Priority } from "/imports/types/Priority";
import { Task } from "/imports/types/Task";

const insertTask = (task: Mongo.OptionalId<Task>) => TasksCollection.insert(task);

Meteor.startup(() => {
});
