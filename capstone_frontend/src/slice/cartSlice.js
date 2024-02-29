import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCartItems(state, action) {
      return action.payload;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (state.items) {
        const existingItem = state.items.find((item) => item.product.id === id);
        if (existingItem) {
          const previousQuantity = existingItem.quantity;
          existingItem.quantity = quantity;
          state.total +=
            (quantity - previousQuantity) * existingItem.product.price;
        }
      }

      return state;
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
  },
});

export const { addToCart, removeFromCart, setCartItems, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
