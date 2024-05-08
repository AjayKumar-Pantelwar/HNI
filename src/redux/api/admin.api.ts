import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import {
  AdminActionRequest,
  AdminActionResponse,
  AdminRequest,
  AdminResponse,
  BlockAdminRequest,
  CreateAdminRequest,
  CreateAdminResponse,
  EditAdminRequest,
  EditAdminResponse,
  UpdateRoleRequest,
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
      query: ({ aid, ...body }) => ({ ...endpoints.admin.edit(aid), body }),
      invalidatesTags: ['Admin'],
    }),
    blockAdmin: builder.mutation<ApiResponse, BlockAdminRequest>({
      query: ({ aid, ...body }) => ({ ...endpoints.admin.block(aid), body }),
      invalidatesTags: ['Admin'],
    }),
    updateRole: builder.mutation<ApiResponse, UpdateRoleRequest>({
      query: ({ aid, ...body }) => ({ ...endpoints.admin.action(aid), body }),
      invalidatesTags: ['Admin'],
    }),
    adminActions: builder.query<AdminActionResponse, AdminActionRequest>({
      query: (params) => ({ ...endpoints.admin.actions, params }),
      providesTags: ['Admin'],
    }),
  }),
});
