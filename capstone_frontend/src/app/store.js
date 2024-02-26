import { configureStore } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";
import productsSlice from "../slice/getProductsSlice";
import getUserSlice from "../slice/getUserSlice";

export const store = configureStore({
  reducer: {
    [metalApi.reducerPath]: metalApi.reducer,
    products: productsSlice,
    user: getUserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metalApi.middleware),
});

export default store;
