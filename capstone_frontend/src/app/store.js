import { configureStore } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";
import productsSlice from "../slice/getProductsSlice";
import getUserSlice from "../slice/getUserSlice";
import themeSlice from "../slice/themeSlice";
import cartSlice from "../slice/cartSlice";
import getUserPreferences from "../slice/getUserPreferences";
import getUserInfo from "../slice/getUserInfo";

export const store = configureStore({
  reducer: {
    [metalApi.reducerPath]: metalApi.reducer,
    products: productsSlice,
    user: getUserSlice,
    theme: themeSlice,
    cart: cartSlice,
    userPreferences: getUserPreferences,
    userInfo: getUserInfo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metalApi.middleware),
});

export default store;
