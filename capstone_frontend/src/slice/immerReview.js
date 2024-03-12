import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";
import { produce } from "immer";

const getUserReviewSlice = createSlice({
  name: "userReview",
  initialState: {
    userReview: {},
  },
  reducers: {
    setUserReview: (state, action) => {
      return produce(state, (draftState) => {
        draftState.userReview = action.payload;
      });
    },
    getUserReview: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getReviewByUser.matchFulfilled,
      (state, action) => {
        return produce(state, (draftState) => {
          draftState.userReview = action.payload;
        });
      }
    );
  },
});

export const { setUserReview, getUserReview } = getUserReviewSlice.actions;

export default getUserReviewSlice.reducer;
