import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
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
import { authSlice } from '../slices/auth.slice';

export const adminApi = createApi({
  reducerPath: 'admin',
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
