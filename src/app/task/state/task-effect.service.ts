import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../shared/task.service';
import { Observable, of } from 'rxjs/index';
import { Action } from '@ngrx/store';
import {
  AddDefaultCategoryError, AddDefaultCategorySuccess, AddNewCategory, AddNewCategoryError, AddNewCategorySuccess,
  DeleteCategory, DeleteCategoryError, DeleteCategorySuccess, FullUpdateTask, FullUpdateTaskError,
  FullUpdateTaskSuccess, GetCategoryError, GetCategorySuccess, GetDefaultCategoryError, GetDefaultCategorySuccess,
  GetTasksSingCategory, GetTasksSingCategoryError, GetTasksSingCategorySuccess, SaveNewTaskError, SaveNewTaskSuccess,
  TaskActionTypes
} from './task.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/internal/operators';
import { AuthActionTypes } from '../../auth/state/auth.actions';
import { CategoryModel } from '../shared/models/category.model';
import { AddCategory, IFullUpdateTask, RemoveCategory } from '../shared/models/actions.model';

@Injectable({
  providedIn: 'root'
})
export class TaskEffectService {

  @Effect() fullUpdateTask: Observable<Action> = this.actions$
    .pipe(
      ofType(TaskActionTypes.FullUpdateTask),
      map((action: FullUpdateTask) => action.payload.data),
      mergeMap(
        (data: IFullUpdateTask) => this.taskService.fullUpdateTask(data)
          .pipe(
            map((result) => new FullUpdateTaskSuccess(result)),
            catchError((error) => of(new FullUpdateTaskError({error: error.message})))
          )
      )
    );


  @Effect() deleteCategory: Observable<Action> = this.actions$
    .pipe(
      ofType(TaskActionTypes.DeleteCategory),
      map((action: DeleteCategory) => action.payload.data),
      mergeMap(
        (data: RemoveCategory) => this.taskService.removeCategory(data)
          .pipe(
            map((result) => new DeleteCategorySuccess(result)),
            catchError((error) => of(new DeleteCategoryError({error: error.message})))
          )
      )
    );

  @Effect() addCategory: Observable<Action> = this.actions$
    .pipe(
      ofType(TaskActionTypes.AddNewCategory),
      map((action: AddNewCategory) => action.payload.cat),
      mergeMap(
        (data: AddCategory) => this.taskService.pushNewCat(data)
          .pipe(
            map(
              (result) => {
                return new AddNewCategorySuccess(result);
              }
            ),
            catchError(
              error => of(new AddNewCategoryError({error: error.message}))
            )
          )
      )
    );

  @Effect() getTasksSingCategory: Observable<Action> = this.actions$
    .pipe(
      ofType(TaskActionTypes.GetTasksSingCategory),
      map((action: GetTasksSingCategory) => action.payload),
      mergeMap(
        (data) => this.taskService.getTasksSingCategory(data)
          .pipe(
            map((data) => new GetTasksSingCategorySuccess(data)),
            catchError(error => of(new GetTasksSingCategoryError({error: error.message})))
          )
      )
    );

  @Effect() saveNewTask: Observable<Action> = this.actions$
    .pipe(
      ofType(TaskActionTypes.SaveNewTask),
      switchMap(
        (action: any) => this.taskService.saveNewTask(action.payload)
          .pipe(
            map((data) => new SaveNewTaskSuccess(data)),
            catchError(error => of(new SaveNewTaskError({error: error.message})))
          )
      )
    );

  @Effect() getUserCategories: Observable<Action> = this.actions$
    .pipe(
      ofType(TaskActionTypes.GetCategory),
      switchMap(
        (action: any) => this.taskService.getUserCategory(action.payload.uid)
          .pipe(
            map((categories: CategoryModel[]) => new GetCategorySuccess({categories})),
            catchError(error => of(new GetCategoryError({error: error.message})))
          )
      )
    );
/**
 * create user with default categories
 * */
  @Effect() addNewCategory: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActionTypes.CreateDefaultUser),
      switchMap(
        (action: any) => this.taskService.sendDefaultCategory(action.payload)
          .pipe(
            tap(() => this.router.navigateByUrl('/sign-in')),
            map((res) => new AddDefaultCategorySuccess(res)),
            catchError(error => of(new AddDefaultCategoryError({error: error.message})))
          )
      )
    );

  @Effect() getDefaultCategory: Observable<Action> = this.actions$
    .pipe(
      ofType(TaskActionTypes.GetDefaultCategory),
      switchMap(
        () => {
          console.log('get data')
          return this.taskService.getDefaultCategory()
            .pipe(
              map(result => {
                const data = result.map(c => ( c.payload.val()))
                console.log('category', data);
                return new GetDefaultCategorySuccess({defaultCategory: data});
              }),
              catchError((error => of(new GetDefaultCategoryError({error: error.message}))))
            );
        }
      )
    );

  constructor(private actions$: Actions,
              private taskService: TaskService,
              private router: Router) { }
}
