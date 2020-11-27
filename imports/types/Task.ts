import { Category } from "./Category";
import { Priority } from "./Priority";

export interface Task {
  _id: string;
  title: string;
  category?: Category;
  done: boolean;
  ownerId: string;
  priority: Priority;
  createDate: Date;
  doneDate: Date | undefined;
}
