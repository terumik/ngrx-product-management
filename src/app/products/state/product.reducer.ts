import { createAction, on, createReducer } from '@ngrx/store';


export const productReducer = createReducer(
  { showProductCode: true }, // initial state
  on(createAction('[Product]Toggle Product Code'), // action
    state => { // below is updating the current state
      console.log(state);

      return {
        ...state,
        showProductCode: !state.showProductCode
      };
    }),
);
