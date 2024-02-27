import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const getUserSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = {
          ...state,
          userData: payload,
        };
      }
    );
  },
});

export default getUserSlice.reducer;
