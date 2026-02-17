import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from "../../../config.js";

export const AdminApi = createApi({
  reducerPath: "adminapi",
  tagTypes: ["Admin"],
  baseQuery: fetchBaseQuery({
    baseUrl: APP_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.admin?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signinAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAdmin: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/admin/forgot",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/admin/verify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: builder.mutation({
      query: ({ email, password, confirmPassword }) => ({
        url: `/admin/reset`,
        method: "PUT",
        body: { email, password, confirmPassword },
      }),
      invalidatesTags: ["Admin"],
    }),
    addAdmin: builder.mutation({
      query: ({ email, password, reqBy }) => ({
        url: `/admin`,
        method: "POST",
        body: { email, password, reqBy },
      }),
      invalidatesTags: ["Admin"],
    }),
    getAdminList: builder.query({
      query: () => ({
        url: "/admin/adminlist",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
})

export const {
  useSigninAdminMutation,
  useGetAdminQuery,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useUpdateAdminMutation,
  useAddAdminMutation,
  useGetAdminListQuery,
} = AdminApi;
