import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from './user.actions';

// define interface for UserState
export interface UserState {
  currentUser: User;
  maskUserName: boolean;
}

const initialState: UserState = {
  currentUser: null,
  maskUserName: false
};

// selectors
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(
    UserActions.maskUserName,
    (state): UserState => ({
      ...state,
      maskUserName: !state.maskUserName
    })),
);
