import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const getUserSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
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

export const { setUser } = getUserSlice.actions;

export default getUserSlice.reducer;
