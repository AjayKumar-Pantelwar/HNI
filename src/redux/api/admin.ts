import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminRequest, AdminResponse } from 'src/types/admin';

export const adminApi = createApi({
  reducerPath: 'admin',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: 'include' }),
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    admin: builder.query<AdminResponse, AdminRequest>({
      query: (params) => ({ url: '/api/admin', params }),
      providesTags: ['Admin'],
    }),
  }),
});
