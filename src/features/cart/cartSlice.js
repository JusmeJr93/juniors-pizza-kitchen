/* eslint-disable no-unused-vars */
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cart: []

};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem (state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem (state, action) {
      //payload = pizzaId
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    increaseItemQuantity (state, action) {
      //payload = pizzaId
      const item = state.cart.find(item => item.pizzaId === action.payload);
      item.quantity++;

      item.totalPrice = item.quantity * item.unitPrice; //keep the totalPrice in sync
    },
    decreaseItemQuantity (state, action) {
      //payload = pizzaId
      const item = state.cart.find(item => item.pizzaId === action.payload);
      item.quantity--;

      item.totalPrice = item.quantity * item.unitPrice;
      //after decreasing qty if it's 0, item must be deleted from cart
      //reusing the deleteItem logic without rewrite it
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart (state) {
      state.cart = [];
    }
  }
});

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

//librarie reselect: option to optimize those selectors
//functions to use in useSelector
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => state => state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

