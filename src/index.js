import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FilterContextProvider } from "./contexts/FilterContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartContextProvider } from "./contexts/CartContext";
ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <FilterContextProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </FilterContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
