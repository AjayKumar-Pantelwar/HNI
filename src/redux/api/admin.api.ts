import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AdminRequest,
  AdminResponse,
  CreateAdminRequest,
  CreateAdminResponse,
  EditAdminRequest,
  EditAdminResponse,
} from 'src/types/admin';
import { enqueueSnackbar } from 'notistack';
import { authSlice } from '../slices/auth.slice';

export const adminApi = createApi({
  reducerPath: 'admin',
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: 'include' }),
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
      // baseApi.dispatch(authSlice.actions.logout());
    }

    return result;
  },
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    admin: builder.query<AdminResponse, AdminRequest>({
      query: (params) => ({ url: '/api/admin', params }),
      providesTags: ['Admin'],
    }),
    createAdmin: builder.mutation<CreateAdminResponse, CreateAdminRequest>({
      query: (body) => ({
        url: '/api/admin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    editAdmin: builder.mutation<EditAdminResponse, EditAdminRequest>({
      query: ({ id, ...body }) => ({
        url: `/api/admin/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});
