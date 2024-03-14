import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const metalApi = createApi({
  reducerPath: "metalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => "/auth/user" }),
    getUser: builder.query({ query: (id) => `/auth/user/${id}` }),
    getAllUserInfo: builder.query({
      query: (userId) => `auth/user/${userId}/allinfo`,
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/user/${userId}`,
        method: "PUT",
        body: userData,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    logoutUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/user/logout",
        method: "DELETE",
        body: userData,
      }),
    }),
    getProducts: builder.query({ query: () => "/api/products" }),
    getProduct: builder.query({ query: (id) => `/api/products/${id}` }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/api/products",
        method: "POST",
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
    }),
    addToCart: builder.mutation({
      query: ({ userId, productId, quantity }) => ({
        url: `/auth/users/${userId}/cart`,
        method: "POST",
        body: { productId, quantity },
      }),
    }),
    removeFromCart: builder.mutation({
      query: ({ userId, cartItemId }) => ({
        url: `/auth/users/${userId}/cart/${cartItemId}`,
        method: "DELETE",
      }),
    }),
    getCartItems: builder.query({
      query: (userId) => `/auth/users/${userId}/cart`,
    }),
    getUserPreferences: builder.query({
      query: (userId) => `/auth/user/${userId}/preferences`,
    }),
    createUserPreferences: builder.mutation({
      query: ({ userId, preferencesData }) => ({
        url: `/auth/user/${userId}/preferences`,
        method: "POST",
        body: preferencesData,
      }),
    }),
    updateUserPreferences: builder.mutation({
      query: ({ userId, preferencesData }) => ({
        url: `/auth/user/${userId}/preferences`,
        method: "PUT",
        body: preferencesData,
      }),
    }),
    deleteUserPreferences: builder.mutation({
      query: (userId) => ({
        url: `/auth/user/${userId}/preferences`,
        method: "DELETE",
      }),
    }),
    getReview: builder.query({
      query: ({ productId }) => `/api/products/${productId}/reviews`,
    }),
    getReviewByUser: builder.query({
      query: (userId) => `api/reviews/user/${userId}`,
    }),
    createReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `/api/products/${productId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ userId, productId, reviewId, reviewData }) => ({
        url: `/api/products/${productId}/reviews/${reviewId}`,
        method: "PUT",
        body: {
          userId,
          ...reviewData,
        },
      }),
    }),
    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/api/products/${productId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    getUserOrders: builder.query({
      query: (userId) => `/api/orders/${userId}`,
    }),
    getUserInformation: builder.query({
      query: ({ userId }) => `auth/user/${userId}/information`,
    }),
    createUserInformation: builder.mutation({
      query: ({ userData, userId }) => ({
        url: `auth/user/${userId}/information`,
        method: "POST",
        body: userData,
      }),
    }),
    updateUserInformation: builder.mutation({
      query: ({ userInfo, userId }) => ({
        url: `auth/user/${userId}/information`,
        method: "PUT",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetAllUserInfoQuery,
  useUpdateUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartItemsQuery,
  useGetUserPreferencesQuery,
  useCreateUserPreferencesMutation,
  useUpdateUserPreferencesMutation,
  useDeleteUserPreferencesMutation,
  useGetReviewQuery,
  useGetReviewByUserQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetUserInformationQuery,
  useCreateUserInformationMutation,
  useUpdateUserInformationMutation,
} = metalApi;
