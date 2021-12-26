import cartReducer from "../reducers/cartReducer";
import React, { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import {
  ADD_TO_CART,
  CHANGE_SHIPPING_VALUE,
  CLOSE_ALERT,
  COUNT_CART_TOTALS,
  DECREASE_AMOUNT_CART_ITEM,
  INCREASE_AMOUNT_CART_ITEM,
  SET_MODAL_TO_CLOSE,
  SET_MODAL_TO_OPEN,
  SHOW_ALERT,
} from "../actions";

let localStorageCartItems = [];
if (localStorage.getItem("cartItems")) {
  localStorageCartItems = JSON.parse(localStorage.getItem("cartItems"));
}
let totalAmountForLS = 0;
if (localStorage.getItem("totalAmountForLS")) {
  totalAmountForLS = JSON.parse(localStorage.getItem("totalAmountForLS"));
}
const initialState = {
  isModalOpen: false,
  cartItems: localStorageCartItems,
  totalAmount: totalAmountForLS,
  totalItems: 0,
  shipping: false,
  alert: {
    isAlert: false,
    message: "",
    className: "",
  },
};

const CartContext = React.createContext();

const CartContextProvider = ({ children }) => {
  const [state, cartDispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    cartDispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    localStorage.setItem("totalAmountForLS", JSON.stringify(state.totalAmount));
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.cartItems, state.totalAmount]);

  const setModalToClose = (e) => {
    if (e.target.className === "modal") {
      cartDispatch({ type: SET_MODAL_TO_CLOSE });
    }
  };

  const setModalToOpen = () => {
    cartDispatch({ type: SET_MODAL_TO_OPEN });
  };

  const addItemToCart = (newItem, message) => {
    cartDispatch({ type: SHOW_ALERT, payload: message });
    cartDispatch({ type: ADD_TO_CART, payload: newItem });
  };

  const removeAlert = () => {
    cartDispatch({ type: CLOSE_ALERT });
  };

  const increaseAmountCartItem = (idColor) => {
    cartDispatch({ type: INCREASE_AMOUNT_CART_ITEM, payload: idColor });
  };
  const decreaseAmountCartItem = (idColor) => {
    cartDispatch({ type: DECREASE_AMOUNT_CART_ITEM, payload: idColor });
  };

  const changeShippingValue = (e) => {
    cartDispatch({ type: CHANGE_SHIPPING_VALUE });
    console.log(state);
  };
  return (
    <CartContext.Provider
      value={{
        ...state,
        setModalToClose,
        setModalToOpen,
        addItemToCart,
        removeAlert,
        increaseAmountCartItem,
        decreaseAmountCartItem,
        changeShippingValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartGlobalContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartContextProvider };
/*


*/
