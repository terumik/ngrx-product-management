import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

// actions
export const toggleProductCode = createAction(
  '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{currentProductId: number}>() // object passed in
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

// Create Action
export const createProduct = createAction(
  '[Product] Create Product',
  props<{product: Product}>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{product: Product}>()
);

export const createProductFail = createAction(
  '[Product] Create Product Fail',
  props<{error: string}>()
);

// Update Actions
export const updateProduct = createAction(
  '[Product] Update Products',
  props<{product: Product}>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Products Success',
  props<{product: Product}>()
);

export const updateProductFail = createAction(
  '[Product] Update Products Fail',
  props<{error: string}>()
);

// Delete Avtions
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{productId: number}>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{productId: number}>()
);

export const deleteProductFail = createAction(
  '[Product] Delete Product Fail',
  props<{error: string}>()
);

