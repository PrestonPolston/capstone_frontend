import { configureStore } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";
import productsSlice from "../slice/getProductsSlice";
import getUserSlice from "../slice/userSlices/getUserSlice";
import themeSlice from "../slice/themeSlice";
import cartSlice from "../slice/cartSlice";
import getUserPreferences from "../slice/userSlices/getUserPreferences";
import getUserInfo from "../slice/userSlices/getUserInfo";
import getUserReviewSlice from "../slice/userSlices/userReviews";
import userOrdersSlice from "../slice/userSlices/userOrdersSlice";

export const store = configureStore({
  reducer: {
    [metalApi.reducerPath]: metalApi.reducer,
    products: productsSlice,
    user: getUserSlice,
    theme: themeSlice,
    cart: cartSlice,
    userPreferences: getUserPreferences,
    userInfo: getUserInfo,
    userReview: getUserReviewSlice,
    userOrders: userOrdersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metalApi.middleware),
});

export default store;
