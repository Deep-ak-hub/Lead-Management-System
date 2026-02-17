import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { APP_URL } from "../../../config.js";

export const ServiceApi = createApi({
  reducerPath: "serviceapi",
  tagTypes: ["Service"],
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
    addService: builder.mutation({
      query: ({ data }) => ({
        url: `/service`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    getService: builder.query({
      query: () => ({
        url: `/service`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `service/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: ({ id }) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = ServiceApi;
