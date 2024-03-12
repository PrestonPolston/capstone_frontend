import { createSlice } from "@reduxjs/toolkit";

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    orders: [],
  },
  reducers: {
    setUserOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setUserOrders } = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
