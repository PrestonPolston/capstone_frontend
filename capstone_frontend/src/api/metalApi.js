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
    getProducts: builder.query({ query: () => "/api/products" }),
    getProduct: builder.query({ query: (id) => `/api/products/${id}` }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProductsQuery,
  useGetProductQuery,
} = metalApi;
