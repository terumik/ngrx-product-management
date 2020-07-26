import { UserState } from '../user/state/user.reducer';

// define feature slices
export interface State {
  user: UserState;
}
