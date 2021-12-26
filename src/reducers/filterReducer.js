import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS_FOR_FILTER_BEGIN,
  GET_ALL_PRODUCTS_FOR_FILTER_ERROR,
  GET_ALL_PRODUCTS_FOR_FILTER_SUCCESS,
  SORT_PRODUCTS_BY,
  UPDATE_FILTERS,
  UPDATE_SORT_VALUE,
} from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_FOR_FILTER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCTS_FOR_FILTER_SUCCESS:
      let maxPrice = action.payload.map((item) => item.price);
      maxPrice = Math.max(...maxPrice);

      // max price  range icin kullanicaz
      return {
        ...state,
        productsError: false,
        loading: false,
        allProducts: [...action.payload],
        sortedProducts: [...action.payload],
        filter: { ...state.filter, maxPrice, price: maxPrice },
      };
    case GET_ALL_PRODUCTS_FOR_FILTER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    // sorting and updating
    case SORT_PRODUCTS_BY:
      const { sortedProducts, sort } = state;
      let tempProducts = [...sortedProducts];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        sortedProducts: tempProducts,
      };
    case UPDATE_SORT_VALUE:
      let newValue = action.payload;
      return {
        ...state,
        sort: newValue,
      };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      console.log(name);
      console.log(value);

      return {
        ...state,
        filter: { ...state.filter, [name]: value },
      };
    //  left side filtering
    case FILTER_PRODUCTS:
      const {
        allProducts,
        filter: { searchQuery, category, company, color, price, shipping },
      } = state;
      let filteredProducts = [...allProducts];

      //input values
      if (searchQuery) {
        filteredProducts = filteredProducts.filter((pr) => {
          return pr.name.toLowerCase().includes(searchQuery);
        });
      } else {
        filteredProducts = [...state.allProducts];
      }

      //companies
      if (company !== "all") {
        filteredProducts = filteredProducts.filter((pr) => {
          return pr.company === company;
        });
      }

      if (category.toLowerCase() !== "all") {
        filteredProducts = filteredProducts.filter((pr) => {
          return pr.category === category.toLowerCase();
        });
      }

      if (price > 0) {
        filteredProducts = filteredProducts.filter((pr) => {
          return pr.price <= price;
        });
      }
      return {
        ...state,
        sortedProducts: filteredProducts,
      };

    default:
      return state;
  }
};
export default reducer;
