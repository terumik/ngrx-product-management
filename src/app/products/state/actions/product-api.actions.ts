import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

// Load Actions
export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFail = createAction(
  '[Product API] Load Products Fail',
  props<{ error: string }>()
);

// Create Action
export const createProductSuccess = createAction(
  '[Product API] Create Product Success',
  props<{ product: Product }>()
);

export const createProductFail = createAction(
  '[Product API] Create Product Fail',
  props<{ error: string }>()
);

// Update Actions
export const updateProductSuccess = createAction(
  '[Product API] Update Products Success',
  props<{ product: Product }>()
);

export const updateProductFail = createAction(
  '[Product API] Update Products Fail',
  props<{ error: string }>()
);

// Delete Actions
export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ productId: number }>()
);

export const deleteProductFail = createAction(
  '[Product API] Delete Product Fail',
  props<{ error: string }>()
);

