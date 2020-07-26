import { on, createReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';


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
  // -- REDUCER 1
  on(ProductActions.toggleProductCode, // action
    (state): ProductState => { // below is updating the current state
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }),
  // -- REDUCER 2
  on(ProductActions.setCurrentProduct,
    (state, action): ProductState => {
      return {
        ...state,
        currentProduct: action.product
      };
    }),
  on(ProductActions.initCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'NEW',
          description: '',
          starRating: 0
        }
      };
    }),
  on(ProductActions.clearCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProduct: null
      };
    }),
);

