import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

// actions
export const toggleProductCode = createAction(
  '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{product: Product}>() // object passed in
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initCurrentProduct = createAction(
  '[Product] Initialize Current Product'
);


// Load Actions
export const loadProducts = createAction(
  '[Product] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{products: Product[]}>()
);

export const loadProductsFail = createAction(
  '[Product] Load Products Fail',
  props<{error: string}>()
);
