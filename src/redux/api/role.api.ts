import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { ApiResponse } from 'src/types/api';
import {
  CreateRoleRequest,
  EditRoleRequest,
  GetPermissionsResponse,
  GetRolesResponse,
} from 'src/types/role.types';

import { authSlice } from '../slices/auth.slice';

export const roleApi = createApi({
  reducerPath: 'role',

  baseQuery: async (args, baseApi, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      credentials: 'include',
    });

    const result = await baseQuery(args, baseApi, extraOptions);
    /*
     * If response is 401, that means the user is not authenticated.
     * In that case, we redirect to the login page.
     */
    if (result.meta?.response?.status === 401) {
      enqueueSnackbar('Your session is expired, please login again', { variant: 'error' });
      baseApi.dispatch(authSlice.actions.logout());
    }

    return result;
  },
  tagTypes: ['Role'],

  endpoints: (builder) => ({
    roles: builder.query<GetRolesResponse, void>({
      query: (params) => ({ url: '/api/admin/role', params }),
      providesTags: ['Role'],
    }),
    createRole: builder.mutation<ApiResponse, CreateRoleRequest>({
      query: (body) => ({
        url: '/api/admin/role',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Role'],
    }),
    editRole: builder.mutation<ApiResponse, EditRoleRequest>({
      query: ({ id, ...body }) => ({
        url: `/api/admin/role/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Role'],
    }),
    permissions: builder.query<GetPermissionsResponse, void>({
      query: () => ({ url: '/api/admin/role/permission' }),
    }),
  }),
});
