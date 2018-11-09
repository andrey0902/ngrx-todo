import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { SessionService } from '../../core/session.service';
import { User } from '../../auth/shared/user';
import { filter, takeWhile } from 'rxjs/internal/operators';
import { CategoryModel } from '../shared/models/category.model';
import { Task } from '../shared/models/task.model';
import { TaskStoreFacadeService } from '../shared/services/task-store-facade.service';
import { MatDialog } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DragTask } from '../shared/models/actions.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  public user: User;
  private componentActive = true;
  public categories: CategoryModel[];
  constructor(private tasksService: TaskService,
              private sessionService: SessionService,
              private tasksFacadeService: TaskStoreFacadeService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
    this.selectCategories();
  }



  ngOnDestroy(): void {
    this.componentActive = false;
  }

  getUser(): void {
    this.sessionService.getUser$()
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe((user: User) => {
        this.user = user;
        this.dispatchGetCategories(user);
      });
  }

  dispatchGetCategories(user: User): void {
    this.tasksFacadeService.getUserCategory({uid: user.uid});
  }

  selectCategories(): void {
    this.tasksFacadeService.selectCategories$()
      .pipe(
        (filter(v => !!v)),
        takeWhile(() => this.componentActive)
      )
      .subscribe(
        (categories) => {
          this.categories = categories;
        }
      );

  }

  addNewCategory(cat: string): void  {
    this.tasksFacadeService.dispatchAddNewCategory({user: this.user, cat});
  }

  onMoveToNextCat(task: Task): void  {
    // TODO: dispatch event
    this.tasksService.moveTask(task, this.categories, this.user, true)
      .subscribe(data => {
      });
  }

  onMoveToPrevCat(task: Task): void  {
    // TODO: dispatch event
    this.tasksService.moveTask(task, this.categories, this.user)
      .subscribe(data => {
      });
  }

  onDeleteTask(task: Task): void  {
    // TODO: dispatch event
    this.tasksService.deleteTask(this.user.uid, task.category, task.id)
      .subscribe(data => {
      });
  }

  onGetTasksSingleCategory(category: string): void  {
    this.tasksFacadeService.dispatchGetTasksSingCategory({category, user: this.user});
  }

  onUpdateTask(task: Task): void {
    // TODO: dispatch event
    this.tasksService.updateTask({task, user: this.user}).
    subscribe();
  }

  openEditModal(task): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: {
        task,
        categories: this.categories
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.componentActive),
        filter(v => v)
      )
      .subscribe(result => {
        this.tasksFacadeService.dispatchFullUpdateTask({...result, user: this.user});
      });
  }

  openDeleteModal(cat: CategoryModel): void {
    if (confirm('Are you sour wont delete Category ?')) {
      // dispatch event delete TODO;
      console.log(cat);
      this.tasksFacadeService.dispatchDeleteCategory({cat, user: this.user});
    }
  }

  onDragTask(drag: DragTask) {
    const data = this.tasksService.changeCategoryTaskAfterDrop(drag);
    this.tasksFacadeService.dispatchFullUpdateTask({...data, user: this.user});
  }

}


