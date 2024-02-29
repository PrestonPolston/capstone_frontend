import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const getProductReviewSlice = createSlice({
  name: "productReview",
  initialState: {
    reviewData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getReview.matchFulfilled,
      (state, { payload }) => {
        state.reviewData = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addMatcher(metalApi.endpoints.getReview.matchPending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(
      metalApi.endpoints.getReview.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
  },
});

export default getProductReviewSlice.reducer;
