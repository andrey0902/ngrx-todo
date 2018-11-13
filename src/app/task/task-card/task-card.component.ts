import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { filter, takeWhile } from 'rxjs/internal/operators';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Input() task: any;
  @Input() dataTask: any;
  @Input() lastCategory: boolean;
  @Input() first: boolean;
  @Output() moveToNextCat = new EventEmitter<Task>();
  @Output() moveToPrevCat = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Task>();
  @Output() fullUpdateTask = new EventEmitter<Task>();
  componentActive = true;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  changeTaskStatus(e, index: number) {
    this.task = this.taskService.updateSubTask(this.task, index, e.checked);
    this.updateTask.emit(this.task);
  }

  moveToNext() {
    this.moveToNextCat.emit(this.task);
  }

  moveToPrev() {
    this.moveToPrevCat.emit(this.task);
  }

  deleteToDO() {
    if (confirm('Are you sure want delete TODO?')) {
      this.deleteTask.emit(this.task);
    }
  }

  onUpdate() {
    this.fullUpdateTask.emit(this.task);
  }
}
