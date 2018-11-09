
import { User } from '../../auth/shared/user';
import { SessionActions, SessionActionTypes } from './session.action';

export interface StateSession {
  // additional entities state properties
  user: User;
}

export const initialState: StateSession = {
  // additional entity state properties
  // user: {
  //   uid: null,
  //   email: null,
  //   emailVerified: null,
  //   photoURL: null,
  //   catchPhrase: null,
  //   displayName: null,
  // }
  user: null
};

export function sessionReducer(state = initialState, action: SessionActions): StateSession {
  switch (action.type) {

    case SessionActionTypes.SaveUser: {
      return {
        ...state,
        user: action.payload.user
      };
    }

    case SessionActionTypes.ClearUser: {
      return {
        ...state,
        user: action.payload.user
      };
    }

    default: {
      return state;
    }
  }
}
