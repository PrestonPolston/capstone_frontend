import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCartItems(state, action) {
      return action.payload;
    },
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingItem = state.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.findIndex(
        (item) => item.product.id === id
      );

      if (existingItemIndex !== -1) {
        const updatedState = [...state];
        updatedState.splice(existingItemIndex, 1);
        return updatedState;
      }

      return state;
    },
    emptyCart: (state) => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, setCartItems, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
