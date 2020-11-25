import { Mongo } from "meteor/mongo";
import { Task } from "../types/Task";

export const TasksCollection = new Mongo.Collection<Task>("tasks");
