import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { ApiResponse } from 'src/types/api';
import { CreateDealResponse } from 'src/types/deals.types';
import { authSlice } from '../slices/auth.slice';

export const dealApi = createApi({
  reducerPath: 'deal',
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
  tagTypes: ['Deal'],
  endpoints: (builder) => ({
    deal: builder.query<ApiResponse, void>({
      query: (params) => ({ url: '/api/admin', params }),
      providesTags: ['Deal'],
    }),
    createDeal: builder.mutation<CreateDealResponse, FormData>({
      query: (body) => ({
        url: '/api/deal/basic',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    // editAdmin: builder.mutation<EditAdminResponse, EditAdminRequest>({
    //   query: ({ id, ...body }) => ({
    //     url: `/api/admin/${id}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['Deal'],
    // }),
    // blockAdmin: builder.mutation<ApiResponse, BlockAdminRequest>({
    //   query: (body) => ({
    //     url: `/api/admin/block`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['Admin'],
    // }),
  }),
});
