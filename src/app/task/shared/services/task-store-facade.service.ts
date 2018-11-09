import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import {
  AddNewCategory, DeleteCategory, DragTaskEnd, DragTaskStart, FullUpdateTask, GetCategory, GetDefaultCategory,
  GetTasksSingCategory, SaveNewTask
} from '../../state/task.actions';
import { State } from '../../../state/state';
import { fun, selectCategories, selectDefaultCategory, selectHeight, selectTasks } from '../../state/index';
import { Observable } from 'rxjs/index';
import { CategoryModel } from '../models/category.model';
import { AddTaskModel } from '../models/add.task.model';
import { AddCategory, IFullUpdateTask, RemoveCategory } from '../models/actions.model';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreFacadeService {

  constructor(private store: Store<State>) { }

  /**
   * dispatch save new task
   * */
  public dispatchSaveNewTask(data: AddTaskModel) {
    this.store.dispatch(new SaveNewTask(data));
  }

  /**
   * Dispatch action get default category
   * */
  public getDefaultCategory() {
    this.store.dispatch(new GetDefaultCategory());
  }

  /**
   * Dispatch action get user category
   * */

  public getUserCategory(data: any) {
    this.store.dispatch(new GetCategory(data));
  }

  /**
   * Dispatch get tasks single category
   * */
  public dispatchGetTasksSingCategory(payload: any) {
    this.store.dispatch(new GetTasksSingCategory(payload));
  }

  /**
   * Dispatch add net category
   * */
  public dispatchAddNewCategory(cat: AddCategory): void {
    this.store.dispatch(new AddNewCategory({cat}));
  }

  /**
   * Dispatch delete category
   * */
  public dispatchDeleteCategory(data: RemoveCategory) {
    this.store.dispatch(new DeleteCategory({data}));
  }

  /**
   * Dispatch full update task
   * */
  public dispatchFullUpdateTask(data: IFullUpdateTask) {
    this.store.dispatch(new FullUpdateTask({data}));
  }

  /**
   * Dispatch drag task start
   * */
  public dispatchDragTaskStart(height: number) {
    this.store.dispatch(new DragTaskStart({height}));
  }

  /**
   * Dispatch drag task end
   * */
  public dispatchDragTaskEnd(height: any) {
    this.store.dispatch(new DragTaskEnd({height}));
  }

  /**
   * get user categories
   * */

  public selectCategories$(): Observable<CategoryModel[]> {
    return this.store.pipe(
      select(
        selectCategories
      )
    );
  }

  /**
   * select default category for user
   * */
  public selectDefaultCategory(): Observable<any> {
    return this.store.pipe(
      select(
        selectDefaultCategory
      ));
  }

  /**
   * select tasks of single category
   * */
  public selectTaskSingleCategory(cat): Observable<any> {
    return this.store.pipe(
      select(
        fun(cat)
      ));
  }

  /**
   * select task height
   * */
  public selectTaskHeight$(): Observable<number | null> {
    return this.store.pipe(
      select(
        selectHeight
      )
    );
  }
}


