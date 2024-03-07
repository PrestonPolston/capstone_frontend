import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const getUserInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getUserInformation.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { setUserInfo } = getUserInfoSlice.actions;

export default getUserInfoSlice.reducer;
