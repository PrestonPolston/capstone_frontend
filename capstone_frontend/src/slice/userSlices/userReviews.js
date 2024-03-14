import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../../api/metalApi";
import manageUserReviewStorage from "../../app/sessionStorage/userReviewsStorage";

const initialUserReview =
  manageUserReviewStorage.retrieveFromSessionStorage("userReview");

const userReviewSlice = createSlice({
  name: "userReview",
  initialState: {
    userReview: initialUserReview,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getAllUserInfo.matchFulfilled,
      (state, action) => {
        state.userReview = action.payload.reviews;
        manageUserReviewStorage.saveToSessionStorage(
          "userReview",
          action.payload.reviews
        );
      }
    );
    builder.addMatcher(
      metalApi.endpoints.updateReview.matchFulfilled,
      (state, action) => {
        state.userReview = action.payload;
        manageUserReviewStorage.saveToSessionStorage(
          "userReview",
          action.payload
        );
      }
    );
  },
});

export const { setUserReview } = userReviewSlice.actions;

export default userReviewSlice.reducer;
