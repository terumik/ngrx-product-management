import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

// actions
export const toggleProductCode = createAction(
  '[Product Page] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product Page] Set Current Product',
  props<{ currentProductId: number }>() // object passed in
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear Current Product'
);

export const initCurrentProduct = createAction(
  '[Product Page] Initialize Current Product'
);


// Load Actions
export const loadProducts = createAction(
  '[Product Page] Load Products'
);


// Create Action
export const createProduct = createAction(
  '[Product Page] Create Product',
  props<{ product: Product }>()
);


// Update Actions
export const updateProduct = createAction(
  '[Product Page] Update Products',
  props<{ product: Product }>()
);


// Delete Avtions
export const deleteProduct = createAction(
  '[Product Page] Delete Product',
  props<{ productId: number }>()
);

