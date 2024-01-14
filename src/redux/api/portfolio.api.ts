import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import {
  GetPortfolioRequest,
  GetPortfolioResponse,
  GetTransactionsRequest,
  GetTransactionsResponse,
} from 'src/types/portfolio.types';
import { baseQuery } from './base-query';

export const portfolioApi = createApi({
  reducerPath: 'protfolio',
  baseQuery,
  tagTypes: ['Portfolio', 'Transactions'],
  endpoints: (builder) => ({
    portfolio: builder.query<GetPortfolioResponse, GetPortfolioRequest>({
      query: (params) => ({ ...endpoints.portfolio.list, params }),
      providesTags: ['Portfolio'],
    }),
    transactions: builder.query<GetTransactionsResponse, GetTransactionsRequest>({
      query: (params) => ({ ...endpoints.portfolio.transactions, params }),
      providesTags: ['Transactions'],
    }),
  }),
});
