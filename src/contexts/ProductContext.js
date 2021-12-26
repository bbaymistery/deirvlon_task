import React, { useState, useContext, useEffect, useReducer } from "react";
import { products_url, single_product_url } from "../utils/constants";
import axios from "axios";
import productReducer from "../reducers/productReducer";
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

const ProductContext = React.createContext();

const initialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],

  ///single products
  singleProductsLoading: false,
  singleProductsError: false,
  singleProducts: [],
};

const ProductProvider = ({ children }) => {
  const [state, productDispatch] = useReducer(productReducer, initialState);
  //bringing all products and featured ones
  const fetchAllProducts = async () => {
    try {
      productDispatch({ type: GET_PRODUCTS_BEGIN });
      const response = await axios.get(products_url);
      // console.log(response);

      productDispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      productDispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const openSidebar = () => {
    productDispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    productDispatch({ type: SIDEBAR_CLOSE });
  };

  ///setting single product
  const getSingleProduct = async (id) => {
    try {
      productDispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
      const response = await axios.get(`${single_product_url}${id}`);
      // console.log(response);
      productDispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      productDispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };
  return (
    <ProductContext.Provider
      value={{
        ...state,
        closeSidebar,
        openSidebar,
        getSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
// make sure use
export const useProductsGlobalContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider };

//   ///setting single product
//   const fetchSingleProduct = async (id) => {
//     try {
//       productDispatch({ type: SET_SINGLE_PRODUCT_LOADING });
//       const response = await axios.get(`${single_product_url}${id}`);
//       // console.log(response);
//       productDispatch({ type: GET_SINGLE_PRODUCT, payload: response.data });
//     } catch (error) {
//       console.log(error);
//     }
//   };
