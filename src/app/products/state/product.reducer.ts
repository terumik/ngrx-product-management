import { on, createReducer } from '@ngrx/store';
import { Product } from '../product';
import { ProductPageActions, ProductApiActions } from './actions';

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

// reducer that returns ProductState
export const productReducer = createReducer<ProductState>(
  initialState, // initial state
  // --
  on(ProductPageActions.toggleProductCode, // action
    (state): ProductState => { // below is updating the current state
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }),
  // --
  on(ProductPageActions.setCurrentProduct,
    (state, action): ProductState => {
      return {
        ...state,
        currentProductId: action.currentProductId
      };
    }),
  // --
  on(ProductPageActions.initCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: 0
      };
    }),
  // --
  on(ProductPageActions.clearCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: null
      };
    }),
  // --
  on(ProductApiActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: ''
      };
    }),
  // --
  on(ProductApiActions.loadProductsFail,
    (state, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error
      };
    }),
  // --
  on(ProductApiActions.updateProductSuccess,
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
  on(ProductApiActions.updateProductFail,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  // --
  on(ProductApiActions.createProductSuccess,
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
  on(ProductApiActions.createProductFail,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  // --
  on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId),
      currentProductId: null,
      error: ''
    };
  }),
  // --
  on(ProductApiActions.deleteProductFail,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
); // end create reducer
