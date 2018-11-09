import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectSessionState = createFeatureSelector<any>('session');

export const selectGetUser = createSelector(
  selectSessionState,
  (state: any) => state.user
);
