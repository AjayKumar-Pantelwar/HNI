import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { CreateMLDRequest, GetMLDsResponse, UpdateMLDRequest } from 'src/types/mlds.types';
import { baseQuery } from './base-query';

export const mldsApi = createApi({
  reducerPath: 'mlds',
  baseQuery,
  tagTypes: ['MLDs'],
  endpoints: (builder) => ({
    mlds: builder.query<GetMLDsResponse, void>({
      query: (params) => ({ ...endpoints.mlds.list, params }),
      providesTags: ['MLDs'],
    }),
    createMLD: builder.mutation<ApiResponse, CreateMLDRequest>({
      query: (body) => ({ ...endpoints.mlds.create, body }),
      invalidatesTags: ['MLDs'],
    }),
    editMLD: builder.mutation<ApiResponse, UpdateMLDRequest>({
      query: ({ id, ...body }) => ({ ...endpoints.mlds.edit(id), body }),
      invalidatesTags: ['MLDs'],
    }),
    editAMC: builder.mutation<ApiResponse, { mld_id: string; body: FormData }>({
      query: ({ mld_id, ...body }) => ({ ...endpoints.bonds.editAMC(mld_id), body }),
      invalidatesTags: ['MLDs'],
    }),
  }),
});
