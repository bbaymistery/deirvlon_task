import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
} from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        productsLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsError: false,
        products: [...action.payload],
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        productsError: true,
      };

    case SIDEBAR_OPEN: {
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    }
    case SIDEBAR_CLOSE:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };

    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        singleProductsLoading: !state.singleProductsLoading,
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProductsLoading: !state.singleProductsLoading,
        singleProducts: action.payload,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProductsError: !state.singleProductsError,
        singleProductsLoading: !state.singleProductsLoading,
      };
    default:
      return state;
  }
};
export default reducer;
