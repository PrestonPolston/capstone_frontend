import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../../api/metalApi";
import manageUserOrdersStorage from "../../app/sessionStorage/userOrdersStorage";

const initialUserOrders =
  manageUserOrdersStorage.retrieveFromSessionStorage("user");

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: initialUserOrders,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getAllUserInfo.matchFulfilled,
      (state, action) => {
        state.userOrders = action.payload.orders;
        manageUserOrdersStorage.saveToSessionStorage(
          "userOrders",
          state.userOrders
        );
      }
    );
  },
});

export default userOrdersSlice.reducer;
