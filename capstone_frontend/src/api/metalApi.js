import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const metalApi = createApi({
  reducerPath: "metalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => "/auth/user" }),
    getUser: builder.query({ query: (id) => `/auth/user/${id}` }),
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
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
} = metalApi;
