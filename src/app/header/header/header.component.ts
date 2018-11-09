import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';;
import { MatDialog } from '@angular/material';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { filter, takeWhile } from 'rxjs/internal/operators';
import { TaskService } from '../../task/shared/task.service';
import { AuthService } from '../../auth/shared/auth.service';
import { TaskStoreFacadeService } from '../../task/shared/services/task-store-facade.service';
import { SessionService } from '../../core/session.service';
import { User } from '../../auth/shared/user';
import { AddTaskModel } from '../../task/shared/models/add.task.model';
import { CategoryModel } from '../../task/shared/models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  componentActive = true;
  user: User;
  categories: CategoryModel[];
  constructor(public dialog: MatDialog,
              private auth: AuthService,
              private taskFacadeService: TaskStoreFacadeService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.getUser();
    this.getUserCategories();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public getUserCategories() {
    this.taskFacadeService.selectCategories$()
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
      });
  }

  public getUser(): void {
     this.sessionService.getUser$()
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );
  }

  logOut(): void {
    this.auth.logout();
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: {
        categories: this.categories
      },
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.componentActive),
        filter(v => v)
      )
      .subscribe(task => {
      console.log('The dialog was closed', task);
      // dispatch event save task
        const data: AddTaskModel = new AddTaskModel({task, user: this.user});
        this.taskFacadeService.dispatchSaveNewTask(data);
      // this.taskService.addNewTask(task, this.lastId);
    });
  }

}
