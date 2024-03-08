import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const getUserInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getUserInformation.matchFulfilled,
      (state, action) => {
        state.userInfo = action.payload;
      }
    );
  },
});

export const { setUserInfo } = getUserInfoSlice.actions;

export default getUserInfoSlice.reducer;
