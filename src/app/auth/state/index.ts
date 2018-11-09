
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectUserState = createFeatureSelector<any>('auth');

export const selectGetErrorSignUp = createSelector(
  selectUserState,
  (state: AuthState) => state.signUp.error
);

export const selectGetErrorSignIn = createSelector(
  selectUserState,
  (state: AuthState) => state.signIn.error
);

export const selectGetErrorRestorePassword = createSelector(
  selectUserState,
  (state: AuthState) => state.restorePassword.error
);

export const selectGetSendSuccess = createSelector(
  selectUserState,
  (state: AuthState) => state.restorePassword.sendSuccess
);

export const selectGetErrorSendNewPassword = createSelector(
  selectUserState,
  (state: AuthState) => state.sendNewPassword.error
);
