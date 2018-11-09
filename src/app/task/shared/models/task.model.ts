export class Task {
  id: string;
  title: string;
  category: string;
  subTasks: SubTask[];
  done?: boolean;
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.prepareSubTask(data.subTasks);
  }

  prepareSubTask(subTask) {
    this.subTasks = subTask.map(item => new SubTask(item));
  }
}

export class SubTask {
  name: string;
  done: boolean;
  constructor(data) {
    this.name = data.name;
    this.done = data.done;
  }
}
