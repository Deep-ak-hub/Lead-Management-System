import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from "../../../config.js";

// user api implementation
export const UserApi = createApi({
  reducerPath: "userapi",
  tagTypes: ["User"],
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
    addUser: builder.mutation({
      query: ({ data }) => ({
        url: `/lead`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search, status, date, inquiry }) => {
        const params = {
          page,
          limit,
          ...(search && { search }),
          ...(status && { status }),
          ...(date && { date }),
          ...(inquiry && { inquiry }),
        };

        return {
          url: `/lead`,
          method: "GET",
          params,
        };
      },
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `/lead/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/lead/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/lead/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = UserApi;
