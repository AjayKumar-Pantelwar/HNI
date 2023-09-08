import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import {
  AssignRMRequest,
  AssignRMResponse,
  GetInvestorsRequest,
  GetInvestorsResponse,
} from 'src/types/investor.types';
import { baseQuery } from './base-query';

export const investorApi = createApi({
  reducerPath: 'investor',
  baseQuery,
  tagTypes: ['Investor'],
  endpoints: (builder) => ({
    investors: builder.query<GetInvestorsResponse, GetInvestorsRequest>({
      query: (params) => ({ ...endpoints.investors.list, params }),
      providesTags: ['Investor'],
    }),
    assignRM: builder.mutation<AssignRMResponse, AssignRMRequest>({
      query: (body) => ({ ...endpoints.investors.assignRM, body }),
      invalidatesTags: ['Investor'],
    }),
  }),
});
