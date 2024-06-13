import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { GetVASResponse } from 'src/types/unverise/vas.types';
import { baseQuery } from './base-query';

export const VASApi = createApi({
  reducerPath: 'vas',
  baseQuery,
  tagTypes: ['VAS'],
  endpoints: (builder) => ({
    vasProducts: builder.query<GetVASResponse, void>({
      query: () => ({ ...endpoints.universe.vas.list }),
      providesTags: ['VAS'],
    }),
    editLendingSolutionsDescription: builder.mutation<ApiResponse, FormData>({
      query: (body) => ({
        ...endpoints.universe.vas.lendingSolutions.editDescription,
        body,
      }),
      invalidatesTags: ['VAS'],
    }),

    editWillsHeading: builder.mutation<ApiResponse, { id: string; title: string }>({
      query: ({ id, ...body }) => ({
        ...endpoints.universe.vas.wills.editHeading(id),
        body,
      }),
      invalidatesTags: ['VAS'],
    }),
    editLendingSolutionsHeading: builder.mutation<ApiResponse, { id: string; title: string }>({
      query: ({ id, ...body }) => ({
        ...endpoints.universe.vas.lendingSolutions.editHeading(id),
        body,
      }),
      invalidatesTags: ['VAS'],
    }),

    addLendingSolutionsDescription: builder.mutation<ApiResponse, FormData>({
      query: (body) => ({
        ...endpoints.universe.vas.lendingSolutions.addDescription,
        body,
      }),
      invalidatesTags: ['VAS'],
    }),
    editWillsDescription: builder.mutation<ApiResponse, FormData>({
      query: (body) => ({
        ...endpoints.universe.vas.wills.editDescription,
        body,
      }),
      invalidatesTags: ['VAS'],
    }),
    editTabName: builder.mutation<ApiResponse, { id: string; name: string }>({
      query: ({ id, ...body }) => ({
        ...endpoints.universe.vas.editTab(id),
        body,
      }),
      invalidatesTags: ['VAS'],
    }),
  }),
});
