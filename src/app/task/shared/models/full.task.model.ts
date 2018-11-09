import { Task } from './task.model';
export class FullTaskModel {
  key: string;
  data: Task;
  constructor(data) {
    this.key = data.key;
    this.data = data.data;
  }
}
