import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ConstantsResponse } from 'src/types/constant.types';
import { baseQuery } from './base-query';

export const constantApi = createApi({
  reducerPath: 'constant',
  baseQuery,
  tagTypes: ['Constant'],
  endpoints: (builder) => ({
    constants: builder.query<ConstantsResponse, void>({
      query: () => endpoints.constant,
      providesTags: ['Constant'],
    }),
  }),
});
