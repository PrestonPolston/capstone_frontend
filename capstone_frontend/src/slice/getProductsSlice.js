import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        return payload.results;
      }
    );
  },
});

export default productsSlice;
