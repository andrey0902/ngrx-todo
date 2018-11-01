import * as fromRoot from './../../state/state';
import { AddTodo } from './add.todo.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  addTodo: AddTodo;
}

const getAddTodoFeatureState = createFeatureSelector<AddTodo>('addTodo');
