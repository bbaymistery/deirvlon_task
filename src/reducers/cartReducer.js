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
import { formatPrice } from "../utils/helpers";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MODAL_TO_OPEN:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case SET_MODAL_TO_CLOSE:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case ADD_TO_CART:
      const {
        amount,
        color,
        image,
        memory,
        description,
        id,
        idColor,
        price,
        name,
        reviews,
        star,
      } = action.payload;
      const newItem = {
        amount,
        color,
        image,
        memory,
        description,
        id,
        idColor,
        price,
        name,
        reviews,
        star,
      };
      let newCartItems = [];
      newCartItems = [...state.cartItems, newItem];
      let tempItem = state.cartItems.find((cart) => {
        return cart.idColor === newItem.idColor;
      });
      if (tempItem) {
        newCartItems = state.cartItems.map((cart) => {
          if (cart.idColor === newItem.idColor) {
            return { ...cart, amount: cart.amount + 1 };
          } else {
            return cart;
          }
        });
      }
      return {
        ...state,
        cartItems: newCartItems,
      };
    case COUNT_CART_TOTALS:
      const { cartItems } = state;

      let totalItems = cartItems.map((cart) => cart.amount);
      let totalItemsCounted = totalItems.reduce((a, b) => a + b, 0); //ok

      let Prices = cartItems.map((cart) => cart.price * cart.amount);
      let totalPrice = Prices.reduce((a, b) => a + b, 0);

      /*
       let { total, amount } = state.addedCartItems.reduce(
        (cartTotal, cartItem) => {
          const { amount, price } = cartItem;
          const itemTotal = amount * price;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      */

      return {
        ...state,
        totalItems: totalItemsCounted,
        totalAmount: totalPrice,
      };

    case SHOW_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          message: action.payload.message,
          className: action.payload.className,
          isAlert: !state.alert.isAlert,
        },
      };

    case CLOSE_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          message: "",
          className: "",
          isAlert: false,
        },
      };

    case INCREASE_AMOUNT_CART_ITEM:
      const idColorFomContetx = action.payload;
      let tempToBeChanging = null;
      tempToBeChanging = state.cartItems.find(
        (item) => item.idColor === idColorFomContetx
      );
      let newCartItemsAfterAdding = [];
      if (tempToBeChanging) {
        newCartItemsAfterAdding = state.cartItems.map((cart) => {
          if (cart.idColor === idColorFomContetx) {
            return { ...cart, amount: cart.amount + 1 };
          } else {
            return cart;
          }
        });
      }
      return {
        ...state,
        cartItems: newCartItemsAfterAdding,
      };
    case DECREASE_AMOUNT_CART_ITEM:
      let tempCart = state.cartItems
        .map((cartItem) => {
          if (cartItem.idColor === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cartItems: tempCart };

    case CHANGE_SHIPPING_VALUE:
      return {
        ...state,
        shipping: !state.shipping,
      };
    default:
      return state;
  }
};

export default reducer;
