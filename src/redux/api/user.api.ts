import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { GetUserRequest, GetUserResponse, UpdateUserRequest } from 'src/types/user.types';
import { baseQuery } from './base-query';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    users: builder.query<GetUserResponse, GetUserRequest>({
      query: (params) => ({ ...endpoints.users.list, params }),
      providesTags: ['user'],
    }),

    editUser: builder.mutation<ApiResponse, UpdateUserRequest>({
      query: ({ action, ...body }) => ({
        ...endpoints.users.edit,
        body,
        params: {
          action,
        },
      }),
      invalidatesTags: ['user'],
    }),
  }),
});
