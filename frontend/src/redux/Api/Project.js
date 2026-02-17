import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from "../../../config.js";

export const ProjectApi = createApi({
  reducerPath: "projectApi",
  tagTypes: ["Project"],
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
    getProject: builder.query({
      query: ({ leadId }) => ({
        url: `lead/${leadId}/project`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    getProjectById: builder.query({
      query: ({ id }) => ({
        url: `lead/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `lead/project/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    addProject: builder.mutation({
      query: ({ leadId, data }) => ({
        url: `lead/${leadId}/project`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: ({ id, adminId }) => ({
        url: `/projects/${id}/admin${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useAddProjectMutation,
} = ProjectApi;