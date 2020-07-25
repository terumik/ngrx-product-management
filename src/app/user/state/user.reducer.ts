import { createReducer, on, createAction } from '@ngrx/store';

export const userReducer = createReducer(
  { toggleUsername: true },
  on(
    createAction('[User] Mask User Name'),
    state => ({
      ...state,
      toggleUsername: !state.toggleUsername
    })),
);
