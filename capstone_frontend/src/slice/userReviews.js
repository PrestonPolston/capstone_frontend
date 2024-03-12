import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const getUserReviewSlice = createSlice({
  name: "userReview",
  initialState: {
    userReview: {},
  },
  reducers: {
    setUserReview: (state, action) => {
      state.userReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getReviewByUser.matchFulfilled,
      (state, action) => {
        state.userReview = action.payload;
      }
    );
  },
});

export const { setUserReview } = getUserReviewSlice.actions;

export default getUserReviewSlice.reducer;
