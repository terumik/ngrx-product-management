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
  currentProductId: number | null;
  products: Product[];
  error: string;
}

// Set initial state
const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

// Feature Selector ('product' comes from product.module.ts)
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Selector for getting specific property
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      // new product
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      // existing product or no product selected
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

// reducer that returns ProductState
export const productReducer = createReducer<ProductState>(
  initialState, // initial state
  // --
  on(ProductActions.toggleProductCode, // action
    (state): ProductState => { // below is updating the current state
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }),
  // --
  on(ProductActions.setCurrentProduct,
    (state, action): ProductState => {
      return {
        ...state,
        currentProductId: action.currentProductId
      };
    }),
  // --
  on(ProductActions.initCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: 0
      };
    }),
  // --
  on(ProductActions.clearCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: null
      };
    }),
  // --
  on(ProductActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: ''
      };
    }),
  // --
  on(ProductActions.loadProductsFail,
    (state, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error
      };
    }),
  // --
  on(ProductActions.updateProductSuccess,
    (state, action): ProductState => {
      const updatedProducts = state.products.map(
        item => action.product.id === item.id ? action.product : item
      );
      return {
        ...state,
        currentProductId: action.product.id,
        products: updatedProducts,
        error: ''
      };
    }
  ),
  // --
  on(ProductActions.updateProductFail,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  // --
  on(ProductActions.createProductSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        currentProductId: action.product.id,
        products: [...state.products, action.product],
        error: ''
      };
    }
  ),
  // --
  on(ProductActions.createProductFail,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  // --
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId),
      currentProductId: null,
      error: ''
    };
  }),
  // --
  on(ProductActions.deleteProductFail,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
); // end create reducer

