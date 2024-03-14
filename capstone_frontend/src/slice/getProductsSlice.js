import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";
import manageProductsStorage from "../app/sessionStorage/productsStorage";

const initialProducts =
  manageProductsStorage.retrieveFromSessionStorage("products");

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productList: initialProducts,
    selectedProduct: null,
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.productList = action.payload;
        manageProductsStorage.saveToSessionStorage("products", action.payload);
      }
    );
  },
});

export const { selectProduct } = productsSlice.actions;
export default productsSlice.reducer;
