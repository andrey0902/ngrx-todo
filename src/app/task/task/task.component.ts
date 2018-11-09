import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../auth/shared/user';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/models/task.model';
import { TaskStoreFacadeService } from '../shared/services/task-store-facade.service';
import { CategoryModel } from '../shared/models/category.model';
import { DragTask } from '../shared/models/actions.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() category: CategoryModel;
  @Input() tasks: Task[];
  @Input() lastCategory: boolean;
  @Input() first: boolean;
  @Input() user: User;
  @Output() moveToNextCat = new EventEmitter<Task>();
  @Output() moveToPrevCat = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() getTasksSingleCategory = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<Task>();
  @Output() fullUpdateTask = new EventEmitter<Task>();
  @Output() deleteCat = new EventEmitter<CategoryModel>();
  @Output() dragTask = new EventEmitter<DragTask>();
  loadTasks$;
  constructor(private taskFacadeService: TaskStoreFacadeService) { }

  ngOnInit() {
    this.getTasksSingleCategory.emit(this.category.id);
    this.getTasks();
  }

  getTasks() {
    this.loadTasks$ = this.taskFacadeService.selectTaskSingleCategory(this.category.id);
  }

  onMoveToNextCat(task: Task) {
    this.moveToNextCat.emit(task);
  }
  onMoveToPrevCat(task: Task) {
    this.moveToPrevCat.emit(task);
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }

  onUpdateTask(task: Task) {
    this.updateTask.emit(task);
  }

  onFullUpdateTask(task: Task) {
    this.fullUpdateTask.emit(task);
  }

  deleteCategory() {
    this.deleteCat.emit(this.category);
  }

  onItemDrop(e: any) {
    this.dragTask.emit({task: e.dragData, cat: this.category});
  }
  dragOver(e) {
     console.log('over', e);
    // console.log('over height', e.target.offsetHeight);
    // console.log('over srcElement.offsetHeight', e.srcElement.offsetHeight);
    // console.log('over height', e);
  }

}
