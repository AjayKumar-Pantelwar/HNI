import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { ApiResponse } from 'src/types/api.types';
import {
  BasicInfoMediaResponse,
  CompanyInfoRequest,
  CreateDealResponse,
  CreateDealTerms,
  DeleteInvestorRequest,
  DeleteNewsRequest,
  DeleteTeamRequest,
  GetDealRequest,
  GetDealResponse,
  HighlightsResponse,
  PitchRequest,
  PitchResponse,
} from 'src/types/deals.types';
import { TrendingDealsRequest } from 'src/types/deals/basic.types';
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
    deal: builder.query<GetDealResponse, GetDealRequest>({
      query: (params) => ({ url: `/api/deal`, params }),
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
    editDeal: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/basic/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    trendingDeal: builder.mutation<ApiResponse, TrendingDealsRequest>({
      query: (body) => ({
        url: `/api/deal/trending`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    dealOfTheWeek: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/api/deal/deal-of-the-week/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Deal'],
    }),
    basicInfoMedia: builder.mutation<BasicInfoMediaResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/${id}/basic/media`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    pitch: builder.mutation<PitchResponse, PitchRequest>({
      query: ({ deal_id, ...body }) => ({
        url: `/api/deal/${deal_id}/pitch`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    highlights: builder.mutation<HighlightsResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/${id}/pitch/highlights`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    companyInfo: builder.mutation<ApiResponse, CompanyInfoRequest>({
      query: ({ deal_id, ...body }) => ({
        url: `/api/deal/${deal_id}/company-info`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    addTeam: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/${id}/company-info/team`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    editTeam: builder.mutation<ApiResponse, { id: string; mem_id: string; body: FormData }>({
      query: ({ id, mem_id, body }) => ({
        url: `/api/deal/${id}/company-info/team/${mem_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    deleteTeam: builder.mutation<ApiResponse, DeleteTeamRequest>({
      query: ({ deal_id, ...body }) => ({
        url: `/api/deal/${deal_id}/company-info/team`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    addInvestor: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/${id}/company-info/current-investor`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    editInvestor: builder.mutation<ApiResponse, { id: string; mem_id: string; body: FormData }>({
      query: ({ id, mem_id, body }) => ({
        url: `/api/deal/${id}/company-info/current-investor/${mem_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    deleteInvestor: builder.mutation<ApiResponse, DeleteInvestorRequest>({
      query: ({ deal_id, ...body }) => ({
        url: `/api/deal/${deal_id}/company-info/current-investor`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    addNews: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/${id}/company-info/news`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    editNews: builder.mutation<ApiResponse, { id: string; news_id: string; body: FormData }>({
      query: ({ id, news_id, body }) => ({
        url: `/api/deal/${id}/company-info/news/${news_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    deleteNews: builder.mutation<ApiResponse, DeleteNewsRequest>({
      query: ({ deal_id, ...body }) => ({
        url: `/api/deal/${deal_id}/company-info/news`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    dealTerms: builder.mutation<ApiResponse, CreateDealTerms & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/api/deal/${id}/terms`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    dataroom: builder.mutation<ApiResponse, any>({
      query: ({ id, ...body }) => ({
        url: `/api/deal/${id}/dataroom`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
