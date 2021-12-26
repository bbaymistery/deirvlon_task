import React, { useState, useContext, useEffect, useReducer } from "react";

import filterReducer from "../reducers/filterReducer";

import axios from "axios";
import { products_url } from "../utils/constants";
import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS_FOR_FILTER_BEGIN,
  GET_ALL_PRODUCTS_FOR_FILTER_ERROR,
  GET_ALL_PRODUCTS_FOR_FILTER_SUCCESS,
  SORT_PRODUCTS_BY,
  UPDATE_FILTERS,
  UPDATE_SORT_VALUE,
} from "../actions/index";
const FilterContext = React.createContext();
const initialState = {
  allProducts: [],
  sortedProducts: [],
  sort: "price-lowest",
  loading: false,
  error: false,
  filter: {
    minPrice: 0,
    maxPrice: 0,
    color: "all",
    category: "all",
    company: "all",
    searchQuery: "",
    price: "",
  },
};

const FilterContextProvider = ({ children }) => {
  const [state, filterDispatch] = useReducer(filterReducer, initialState);
  //for canceling axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    filterDispatch({ type: FILTER_PRODUCTS });
    filterDispatch({ type: SORT_PRODUCTS_BY });
  }, [state.filter, state.sort]);

  //   bringing all products
  useEffect(() => {
    fetchAllProductsForFilter();
    return () => {
      source.cancel();
    };
  }, []);
  const fetchAllProductsForFilter = async () => {
    try {
      filterDispatch({ type: GET_ALL_PRODUCTS_FOR_FILTER_BEGIN });
      const response = await axios.get(products_url);
      filterDispatch({
        type: GET_ALL_PRODUCTS_FOR_FILTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      filterDispatch({ type: GET_ALL_PRODUCTS_FOR_FILTER_ERROR });
    }
  };

  const updateSortVaue = (value) => {
    filterDispatch({ type: UPDATE_SORT_VALUE, payload: value });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value || e.target.innerText;
    if (name === "price") {
      value = Number(value);
    }
    // name:'searchQuery yazacagsan
    // biirinciupdate edirik normal sekilde yazdiririx Onan sonra yuxarda state.filter ile filter products icindeki guncel verilere gore filtere olunar!

    filterDispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  // console.log(state);

  return (
    //all values go to productList... component
    <FilterContext.Provider
      value={{
        ...state,
        updateSortVaue,
        handleChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterGlobalContext = () => {
  return useContext(FilterContext);
};

export { FilterContext, FilterContextProvider };
