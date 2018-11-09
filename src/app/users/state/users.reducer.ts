import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import { UserActionsUnion, UserActionTypes } from './user.actions';

export interface State extends EntityState<User> {
  // additional entities state properties
  selectedUserId: number | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
});

export function reducer(state = initialState, action: UserActionsUnion): State {
  switch (action.type) {
    case UserActionTypes.ADD_USER: {
      return adapter.addOne(action.payload.user, state);
    }

    case UserActionTypes.UPSERT_USER: {
      return adapter.upsertOne(action.payload.user, state);
    }

    case UserActionTypes.ADD_USERS: {
      return adapter.addMany(action.payload.users, state);
    }

    case UserActionTypes.UPSERT_USERS: {
      return adapter.upsertMany(action.payload.users, state);
    }

    case UserActionTypes.UPDATE_USER: {
      console.log(action.payload.user);
      console.log(adapter.updateOne(action.payload.user, state));

      return adapter.updateOne(action.payload.user, state);
    }

    case UserActionTypes.UPDATE_USERS: {
      return adapter.updateMany(action.payload.users, state);
    }

    case UserActionTypes.DELETE_USER: {
      return adapter.removeOne(action.payload.id, state);
    }

    case UserActionTypes.DELETE_USERS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case UserActionTypes.LOAD_USERS: {
      return adapter.addAll(action.payload.users, state);
    }

    case UserActionTypes.CLEAR_USERS: {
      return adapter.removeAll({ ...state, selectedUserId: null });
    }

    default: {
      return state;
    }
  }
}

export const getSelectedUserId = (state: State) => state.selectedUserId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
