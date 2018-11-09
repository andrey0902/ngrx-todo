import { User } from '../../../auth/shared/user';
import { Task } from './task.model';

export class AddTaskModel {
  user: User;
  task: Task;
  constructor(data) {
    this.task = data.task;
    this.user = data.user;
  }
}
