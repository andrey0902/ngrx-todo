

import { Action } from '@ngrx/store';
import { Task } from '../shared/models/task.model';
import { Update } from '@ngrx/entity';
import { CategoryModel } from '../shared/models/category.model';
import { AddTaskModel } from '../shared/models/add.task.model';
import { User } from '../../auth/shared/user';
import { AddCategory, IFullUpdateTask, RemoveCategory } from '../shared/models/actions.model';

export enum TaskActionTypes {
  LOAD_TASK = '[Task] Load Tasks',
  ADD_TASK = '[Task] Add Task',
  UPSERT_TASK = '[Task] Upsert Task',
  UPDATE_TASK = '[Task] Update Task',
  DELETE_TASK= '[Task] Delete Task',
  CLEAR_TASK = '[Task] Clear Tasks',

  GetDefaultCategory = '[Task] Get Default Category',
  GetDefaultCategorySuccess = '[Task] Get Default Category Success',
  GetDefaultCategoryError = '[Task] Get Default Category Error',

  GetCategory = '[Task] Get Category',
  GetCategorySuccess = '[Task] Get Category Success',
  GetCategoryError = '[Task] Get Category Error',

  AddDefaultCategory = '[Task] Add Default Category',
  AddDefaultCategorySuccess = '[Task] Add Default Category Success',
  AddDefaultCategoryError = '[Task] Add Default Category Error',

  SaveNewTask = '[Task] Save New Task',
  SaveNewTaskSuccess = '[Task] Save New Task Success',
  SaveNewTaskError = '[Task] Save New Task Error',

  GetTasksSingCategory = '[Task] Get Tasks Sing Category',
  GetTasksSingCategorySuccess = '[Task] Get Tasks Sing Category Success',
  GetTasksSingCategoryError = '[Task] Get Tasks Sing Category Error',

  MoveTask = '[Task] Move Task',
  MoveTaskSuccess = '[Task] Move Task Success',
  MoveTaskError = '[Task] Move Task Error',

  AddNewCategory = '[Task] Add New Category',
  AddNewCategorySuccess = '[Task] Add New Category Success',
  AddNewCategoryError = '[Task] Add New Category Error',

  DeleteCategory = '[Task] Delete Category',
  DeleteCategorySuccess = '[Task] Delete Category Success',
  DeleteCategoryError = '[Task] Delete Category Error',

  FullUpdateTask = '[Task] Full Update Category',
  FullUpdateTaskSuccess = '[Task] Full Update Category Success',
  FullUpdateTaskError = '[Task] Full Update Category Error',

  DragTaskStart = '[Task] Drag Task Start',
  DragTaskOver = '[Task] Drag Task Over',
  DragTaskLeave = '[Task] Drag Task Leave',
  DragTaskEnd = '[Task] Drag Task End',

}

export class DragTaskStart implements Action {
  readonly type = TaskActionTypes.DragTaskStart;
  constructor(public payload: {height: number}) {}
}

export class DragTaskEnd implements Action {
  readonly type = TaskActionTypes.DragTaskEnd;
  constructor(public payload: {height: any}) {}
}

export class FullUpdateTask implements Action {
  readonly type = TaskActionTypes.FullUpdateTask;
  constructor(public payload: {data: IFullUpdateTask}) {}
}

export class FullUpdateTaskSuccess implements Action {
  readonly type = TaskActionTypes.FullUpdateTaskSuccess;

  constructor(public payload: any) {}
}

export class FullUpdateTaskError implements Action {
  readonly type = TaskActionTypes.FullUpdateTaskError;

  constructor(public payload: {error: string}) {}
}

export class DeleteCategory implements Action {
  readonly type = TaskActionTypes.DeleteCategory;
  constructor(public payload: {data: RemoveCategory}) {}
}

export class DeleteCategorySuccess implements Action {
  readonly type = TaskActionTypes.DeleteCategorySuccess;

  constructor(public payload: any) {}
}

export class DeleteCategoryError implements Action {
  readonly type = TaskActionTypes.DeleteCategoryError;

  constructor(public payload: {error: string}) {}
}

export class AddNewCategory implements Action {
  readonly type = TaskActionTypes.AddNewCategory;
  constructor(public payload: {cat: AddCategory}) {}
}

export class AddNewCategorySuccess implements Action {
  readonly type = TaskActionTypes.AddNewCategorySuccess;

  constructor(public payload: any) {}
}

export class AddNewCategoryError implements Action {
  readonly type = TaskActionTypes.AddNewCategoryError;

  constructor(public payload: {error: string}) {}
}


export class MoveTask implements Action {
  readonly type = TaskActionTypes.MoveTask;
  constructor(public payload: any) {}
}

export class MoveTaskSuccess implements Action {
  readonly type = TaskActionTypes.MoveTaskSuccess;

  constructor(public payload: any) {}
}

export class MoveTaskError implements Action {
  readonly type = TaskActionTypes.MoveTaskError;

  constructor(public payload: {error: string}) {}
}


export class GetTasksSingCategory implements Action {
  readonly type = TaskActionTypes.GetTasksSingCategory;
  constructor(public payload: {user: User, category: string}) {}
}

export class GetTasksSingCategorySuccess implements Action {
  readonly type = TaskActionTypes.GetTasksSingCategorySuccess;

  constructor(public payload: any) {}
}

export class GetTasksSingCategoryError implements Action {
  readonly type = TaskActionTypes.GetTasksSingCategoryError;

  constructor(public payload: {error: string}) {}
}


export class SaveNewTask implements Action {
  readonly type = TaskActionTypes.SaveNewTask;
  constructor(public payload: AddTaskModel) {}
}

export class SaveNewTaskSuccess implements Action {
  readonly type = TaskActionTypes.SaveNewTaskSuccess;

  constructor(public payload: {task: Task}) {}
}

export class SaveNewTaskError implements Action {
  readonly type = TaskActionTypes.SaveNewTaskError;

  constructor(public payload: {error: string}) {}
}

export class AddDefaultCategory implements Action {
  readonly type = TaskActionTypes.AddDefaultCategory;
  constructor(public payload: any) {}
}

export class AddDefaultCategorySuccess implements Action {
  readonly type = TaskActionTypes.AddDefaultCategorySuccess;

  constructor(public payload: any) {}
}

export class AddDefaultCategoryError implements Action {
  readonly type = TaskActionTypes.AddDefaultCategoryError;

  constructor(public payload: {error: string}) {}
}

export class GetCategory implements Action {
  readonly type = TaskActionTypes.GetCategory;
  constructor(public payload: {uid: number}) {}
}

export class GetCategorySuccess implements Action {
  readonly type = TaskActionTypes.GetCategorySuccess;

  constructor(public payload: {categories: CategoryModel[]}) {}
}

export class GetCategoryError implements Action {
  readonly type = TaskActionTypes.GetCategoryError;

  constructor(public payload: {error: string}) {}
}

export class GetDefaultCategory implements Action {
  readonly type = TaskActionTypes.GetDefaultCategory;
}

export class GetDefaultCategorySuccess implements Action {
  readonly type = TaskActionTypes.GetDefaultCategorySuccess;

  constructor(public payload: any) {}
}

export class GetDefaultCategoryError implements Action {
  readonly type = TaskActionTypes.GetDefaultCategoryError;

  constructor(public payload: {error: string}) {}
}

export class LoadTasks implements Action {
  readonly type = TaskActionTypes.LOAD_TASK;

  constructor(public payload: { tasks: Task[] }) {}
}

export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK;

  constructor(public payload: { task: Update<Task> }) {}
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.ADD_TASK;

  constructor(public payload: { task: Task }) {}
}

export type TaskActionsUnion =
  | LoadTasks
  | UpdateTask
  | AddTask
  | GetDefaultCategorySuccess
  | GetDefaultCategoryError
  | AddDefaultCategorySuccess
  | AddDefaultCategoryError
  | GetCategorySuccess
  | GetCategoryError
  | SaveNewTaskSuccess
  | SaveNewTaskError
  | GetTasksSingCategory
  | GetTasksSingCategorySuccess
  | GetTasksSingCategoryError
  | MoveTask
  | MoveTaskSuccess
  | MoveTaskError
  | AddNewCategory
  | AddNewCategorySuccess
  | AddNewCategoryError
  | DeleteCategory
  | DeleteCategorySuccess
  | DeleteCategoryError
  | FullUpdateTask
  | FullUpdateTaskSuccess
  | FullUpdateTaskError
  | DragTaskStart
  | DragTaskEnd
