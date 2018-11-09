import * as fromTask from './task.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter } from '@ngrx/entity';
import { Task } from '../shared/models/task.model';

export interface StateTasks {
  tasks: fromTask.State;
}

export const taskReducer: ActionReducerMap<StateTasks> = {
  tasks: fromTask.reducer,
};

export const selectTaskState = createFeatureSelector<fromTask.State>('task');


export const selectTaskIds = createSelector(
  selectTaskState,
  fromTask.selectTaskIds
);
export const selectTaskEntities = createSelector(
  selectTaskState,
  fromTask.selectTaskEntities
);
export const selectAllTasks = createSelector(
  selectTaskState,
  fromTask.selectAllTasks
);
export const selectTaskTotal = createSelector(
  selectTaskState,
  fromTask.selectTaskTotal
);
export const selectCurrentTaskId = createSelector(
  selectTaskState,
  fromTask.getSelectedTaskId
);

export const selectCurrentTask = createSelector(
  selectTaskEntities,
  selectCurrentTaskId,
  (userEntities, userId) => userEntities[userId]
);

export const selectLastId = createSelector(
  selectTaskState,
  (state) => state.lastId
);

export const selectDefaultCategory = createSelector(
  selectTaskState,
  (state) => state.defaultCategory
);

export const selectCategories = createSelector(
  selectTaskState,
  (state) => state.categories
);

export const selectTasks = createSelector(
  selectTaskState,
  (state) => {
    return state.tasks;
  });

  export const fun = (cat) => {
    return createSelector(
      selectTaskState,
      (state) => {
         return (state.tasks && cat) ? state.tasks[cat] : null;
      });
  };

  export const selectHeight = createSelector(
    selectTaskState,
    state => state.dragTaskHeight
);


