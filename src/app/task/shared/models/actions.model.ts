import { User } from '../../../auth/shared/user';
import { CategoryModel } from './category.model';
import { FullTaskModel } from './full.task.model';
import { Task } from './task.model';

export interface AddCategory {
  user: User;
  cat: string;
}

export interface RemoveCategory {
  user: User;
  cat: CategoryModel;
}

export interface DragTask {
  task: Task;
  cat: CategoryModel;
}

export interface IFullUpdateTask {
  task: Task;
  user: User;
  prevCategory: string;
}
