import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { GetVASResponse } from 'src/types/unverise/vas.types';
import { baseQuery } from './base-query';

export const VASApi = createApi({
  reducerPath: 'vas',
  baseQuery,
  tagTypes: ['VAS'],
  endpoints: (builder) => ({
    vasProducts: builder.query<GetVASResponse, void>({
      query: () => ({ ...endpoints.universe.vas.list }),
      providesTags: ['VAS'],
    }),
  }),
});
