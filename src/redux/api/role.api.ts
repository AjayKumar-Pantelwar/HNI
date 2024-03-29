import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import {
  CreateRoleRequest,
  EditRoleRequest,
  GetPermissionsResponse,
  GetRolesResponse,
} from 'src/types/role.types';
import { baseQuery } from './base-query';

export const roleApi = createApi({
  reducerPath: 'role',
  baseQuery,
  tagTypes: ['Role'],
  endpoints: (builder) => ({
    roles: builder.query<GetRolesResponse, void>({
      query: (params) => ({ ...endpoints.role.list, params }),
      providesTags: ['Role'],
    }),
    createRole: builder.mutation<ApiResponse, CreateRoleRequest>({
      query: (body) => ({ ...endpoints.role.create, body }),
      invalidatesTags: ['Role'],
    }),
    editRole: builder.mutation<ApiResponse, EditRoleRequest>({
      query: ({ id, ...body }) => ({ ...endpoints.role.edit(id), body }),
      invalidatesTags: ['Role'],
    }),
    permissions: builder.query<GetPermissionsResponse, void>({
      query: () => endpoints.role.permissions,
    }),
  }),
});
