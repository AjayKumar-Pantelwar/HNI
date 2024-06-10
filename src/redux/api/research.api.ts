import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import {
  GetResearchReponse,
  UpdatePageRequest,
  UpdateTabRequest,
} from 'src/types/content-management/research.types';
import { baseQuery } from './base-query';

export const researchApi = createApi({
  reducerPath: 'research',
  baseQuery,
  tagTypes: ['Research'],
  endpoints: (builder) => ({
    getResearch: builder.query<GetResearchReponse, void>({
      query: () => ({ ...endpoints.contentManagement.research.list }),
      providesTags: ['Research'],
    }),
    updateTab: builder.mutation<ApiResponse, UpdateTabRequest>({
      query: (body) => ({ ...endpoints.contentManagement.research.updateTab, body }),
      invalidatesTags: ['Research'],
    }),
    updatePage: builder.mutation<ApiResponse, { tab_id: string; body: UpdatePageRequest }>({
      query: ({ tab_id, ...body }) => ({
        ...endpoints.contentManagement.research.updatePage(tab_id),
        ...body,
      }),
      invalidatesTags: ['Research'],
    }),
    addCard: builder.mutation<ApiResponse, FormData>({
      query: (body) => ({
        ...endpoints.contentManagement.research.addCard,
        body,
      }),
      invalidatesTags: ['Research'],
    }),
    updateCard: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        ...endpoints.contentManagement.research.updateCard(id),
        ...body,
      }),
      invalidatesTags: ['Research'],
    }),
    deleteCard: builder.mutation<ApiResponse, { id: string }>({
      query: ({ id }) => ({
        ...endpoints.contentManagement.research.deleteCard(id),
      }),
      invalidatesTags: ['Research'],
    }),
  }),
});
