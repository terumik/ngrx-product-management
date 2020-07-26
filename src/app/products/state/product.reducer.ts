import { createAction, on, createReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';


// State Interface for Lazy Loading
export interface State extends AppState.State {
  products: ProductState;
}

// Interface for Slice of the State
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

// Set initial state
const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

// Feature Selector ('product' comes from product.module.ts)
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Selector for getting specific property
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

// reducer that returns ProductState
export const productReducer = createReducer<ProductState>(
  initialState, // initial state
  on(createAction('[Product]Toggle Product Code'), // action
    (state): ProductState => { // below is updating the current state
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }),
);

