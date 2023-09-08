import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import {
  AdminRequest,
  AdminResponse,
  BlockAdminRequest,
  CreateAdminRequest,
  CreateAdminResponse,
  EditAdminRequest,
  EditAdminResponse,
} from 'src/types/admin.types';
import { ApiResponse } from 'src/types/api.types';
import { baseQuery } from './base-query';

export const adminApi = createApi({
  reducerPath: 'admin',
  baseQuery,
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    admin: builder.query<AdminResponse, AdminRequest>({
      query: (params) => ({ ...endpoints.admin.list, params }),
      providesTags: ['Admin'],
    }),
    createAdmin: builder.mutation<CreateAdminResponse, CreateAdminRequest>({
      query: (body) => ({ ...endpoints.admin.create, body }),
      invalidatesTags: ['Admin'],
    }),
    editAdmin: builder.mutation<EditAdminResponse, EditAdminRequest>({
      query: ({ id, ...body }) => ({ ...endpoints.admin.edit(id), body }),
      invalidatesTags: ['Admin'],
    }),
    blockAdmin: builder.mutation<ApiResponse, BlockAdminRequest>({
      query: (body) => ({ ...endpoints.admin.block, body }),
      invalidatesTags: ['Admin'],
    }),
  }),
});
