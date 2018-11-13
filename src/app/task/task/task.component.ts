import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../../auth/shared/user';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/models/task.model';
import { TaskStoreFacadeService } from '../shared/services/task-store-facade.service';
import { CategoryModel } from '../shared/models/category.model';
import { DragTask } from '../shared/models/actions.model';
import { Subscription } from 'rxjs/index';
import { DragulaService } from 'ng2-dragula';
import { filter, takeWhile } from 'rxjs/internal/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
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
  loadTasks;
  componentActive = true;
  subs = new Subscription();
  constructor(private taskFacadeService: TaskStoreFacadeService,
              private dragulaService: DragulaService) { }

  ngOnInit() {
    this.getTasksSingleCategory.emit(this.category.id);
    this.getTasks();

    this.dragulaService.dropModel('DRAGULA_FACTS')
      .pipe(
        takeWhile(() => this.componentActive),
        filter(({ name, el, target, source, sibling }) => target.getAttribute('data-cat') === this.category.id)
      )
        .subscribe(({ item }) => {
           this.dragTask.emit({task: item, cat: this.category});
        });
  }
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  getTasks() {
     this.taskFacadeService.selectTaskSingleCategory(this.category.id)
       .pipe(
         takeWhile(() => this.componentActive)
       )
       .subscribe(data => this.loadTasks = data);
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

}
