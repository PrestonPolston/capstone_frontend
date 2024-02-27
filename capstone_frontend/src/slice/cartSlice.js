import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
