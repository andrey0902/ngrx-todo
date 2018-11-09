
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../shared/models/task.model';
import { TaskActionsUnion, TaskActionTypes } from './task.actions';
import { CategoryModel } from '../shared/models/category.model';

export interface State extends EntityState<Task> {
  // additional entities state properties
  selectedTaskId: number | null;
  defaultCategory: any;
  lastId: null | number;
  categories: CategoryModel[];
  tasks: {[key: string]: Task[]};
  dragTaskHeight: null | number;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedTaskId: null,
  defaultCategory: null,
  lastId: null,
  categories: null,
  tasks: null,
  dragTaskHeight: null,
});

export function reducer(state = initialState, action: TaskActionsUnion): State {
  switch (action.type) {


    case TaskActionTypes.DragTaskEnd: {
      return {
        ...state,
        dragTaskHeight: action.payload.height
      };
    }

    case TaskActionTypes.DragTaskStart: {
      return {
        ...state,
        dragTaskHeight: action.payload.height
      };
    }

    case TaskActionTypes.GetTasksSingCategorySuccess: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.payload
        }
      };
    }

    case TaskActionTypes.GetTasksSingCategoryError: {
      return {
        ...state,
        tasks: null
      };
    }

    case TaskActionTypes.GetCategorySuccess: {
      return {
        ...state,
        categories: action.payload.categories
      };
    }

    case TaskActionTypes.GetCategoryError: {
      return {
        ...state,
        categories: null
      };
    }

    case TaskActionTypes.GetDefaultCategorySuccess: {
      return {
        ...state,
        defaultCategory: action.payload.defaultCategory
      };
    }

    case TaskActionTypes.GetDefaultCategoryError: {
      return {
        ...state,
        defaultCategory: 'Error'
      };
    }

    case TaskActionTypes.LOAD_TASK: {
      return adapter.addAll(action.payload.tasks, state);
    }

    case TaskActionTypes.UPDATE_TASK: {
      console.log(action.payload.task);

      return adapter.updateOne(action.payload.task, state);
    }


    default: {
      return state;
    }
  }
}

export const getSelectedTaskId = (state: State) => state.selectedTaskId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of user ids
export const selectTaskIds = selectIds;

// select the dictionary of user entities
export const selectTaskEntities = selectEntities;

// select the array of users
export const selectAllTasks = selectAll;

// select the total user count
export const selectTaskTotal = selectTotal;

