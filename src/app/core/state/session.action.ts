import { Action } from '@ngrx/store';
import { User } from '../../auth/shared/user';




export enum SessionActionTypes {
  SaveUser = '[Session] Save User',
  ClearUser = '[Session] Clear User',
  ToggleTaskDone = '[Session] Toggle Task Done',
  DeleteToDo = '[Session] Delete ToDo',
  EditToDo = '[Session] Edit ToDo',
  UpdateToDo = '[Session] Update ToDo',
  MoveToDo = '[Session] Move ToDo',
}

export class SaveUser implements Action {
  readonly type = SessionActionTypes.SaveUser;
  constructor(public payload: {user: User}) {}
}

export class ClearUser implements Action {
  readonly type = SessionActionTypes.ClearUser;
  constructor(public payload: {user: null}) {}
}

export type SessionActions =
    SaveUser
  | ClearUser;

