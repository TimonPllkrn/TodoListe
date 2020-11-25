import { Category } from "./Category";
import { Priority } from "./Priority";

export interface Task {
  id: number;
  title: string;
  category: Category;
  done: boolean;
  owner: number;
  priority: Priority;
  date: Date;
  lastUpdated: Date;
}
