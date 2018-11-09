import { State } from '../../state/state';
import { AuthActionsUnion, AuthActionTypes } from './auth.actions';

export interface AuthState extends State {
  signUp: {error: string};
  signIn: {error: string};
  restorePassword: {
    error: string;
    sendSuccess: boolean;
  };
  sendNewPassword: {
    error: string;
  };
}

export const initialState: AuthState = {
  signUp: {
    error: null
  },
  signIn: {
    error: null
  },
  restorePassword: {
    error: null,
    sendSuccess: null
  },
  sendNewPassword: {
    error: null
  }
};

export function authReducer(state = initialState, action: AuthActionsUnion): AuthState {
  switch (action.type) {

    case AuthActionTypes.CreateUserAccountError: {
      return {
        ...state,
        signUp: {
          ...state.signUp,
          error: action.payload.error
        }
      };
    }

    case AuthActionTypes.CreateUserAccountSuccess: {
      return {
        ...state,
        signUp: {
          ...state.signUp,
          error: null
        }
      };
    }

    case AuthActionTypes.SignInEmailError: {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          error: action.payload.error
        }
      };
    }

    case AuthActionTypes.SignInEmailSuccess: {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          error: null
        }
      };
    }

    case AuthActionTypes.SendRetrievePasswordLinkError: {
      return {
        ...state,
        restorePassword: {
          ...state.restorePassword,
          error: action.payload.error
        }
      };
    }

    case AuthActionTypes.SendRetrievePasswordLinkSuccess: {
      return {
        ...state,
        restorePassword: {
          ...state.restorePassword,
          error: null,
          sendSuccess: true
        }
      };
    }

    case AuthActionTypes.RetrievePasswordDefault: {
      return {
        ...state,
        restorePassword: {
          ...state.restorePassword,
          error: null,
          sendSuccess: null
        }
      };
    }

    case AuthActionTypes.SendNewPasswordError: {
      return {
        ...state,
        sendNewPassword: {
          error: action.payload.error
        }
      };
    }

    case AuthActionTypes.SendNewPasswordSuccess: {
      return {
        ...state,
        sendNewPassword: {
          error: null
        }
      };
    }

    default: {
      return state;
    }
  }
}
