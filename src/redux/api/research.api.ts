import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { baseQuery } from './base-query';

export const researchApi = createApi({
  reducerPath: 'research',
  baseQuery,
  tagTypes: ['Research'],
  endpoints: (builder) => ({
    tablist: builder.query<void, void>({
      query: (params) => ({ ...endpoints.contentManagement.research.tablist, params }),
      providesTags: ['Research'],
    }),
    getResearch: builder.query<void, { id: string }>({
      query: ({ id }) => ({ ...endpoints.contentManagement.research.tabDetails(id) }),
      providesTags: ['Research'],
    }),
  }),
});
