import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import {
  AssignDMRequest,
  AssignDMResponse,
  BasicInfoMediaResponse,
  CompanyInfoRequest,
  CreateDealResponse,
  CreateDealTerms,
  DealStageRequest,
  DealStageResponse,
  DealStatusRequest,
  DealStatusResponse,
  DeleteInvestorRequest,
  DeleteNewsRequest,
  DeleteTeamRequest,
  GetDealRequest,
  GetDealResponse,
  HighlightsResponse,
  PitchRequest,
  PitchResponse,
  SaveInvestedRequest,
  SaveInvestedResponse,
  UpdateDDReportRequest,
  UpdateDDReportResponse,
} from 'src/types/deals.types';
import { TrendingDealsRequest } from 'src/types/deals/basic.types';
import { baseQuery } from './base-query';

export const dealApi = createApi({
  reducerPath: 'deal',
  baseQuery,
  tagTypes: ['Deal'],
  endpoints: (builder) => ({
    deal: builder.query<GetDealResponse, GetDealRequest>({
      query: (params) => ({ ...endpoints.deal.list, params }),
      providesTags: ['Deal'],
    }),
    createDeal: builder.mutation<CreateDealResponse, FormData>({
      query: (body) => ({ ...endpoints.deal.create, body }),
      invalidatesTags: ['Deal'],
    }),
    editDeal: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ ...endpoints.deal.edit(id), body }),
      invalidatesTags: ['Deal'],
    }),
    trendingDeal: builder.mutation<ApiResponse, TrendingDealsRequest>({
      query: (body) => ({ ...endpoints.deal.trending, body }),
      invalidatesTags: ['Deal'],
    }),
    dealOfTheWeek: builder.mutation<ApiResponse, string>({
      query: (id) => endpoints.deal.dealOfTheWeek(id),
      invalidatesTags: ['Deal'],
    }),
    assignDM: builder.mutation<AssignDMResponse, AssignDMRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.assignDM(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    dealStage: builder.mutation<DealStageResponse, DealStageRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.stage(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    dealStatus: builder.mutation<DealStatusResponse, DealStatusRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.status(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    basicInfoMedia: builder.mutation<BasicInfoMediaResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ ...endpoints.deal.media(id), body }),
      invalidatesTags: ['Deal'],
    }),
    pitch: builder.mutation<PitchResponse, PitchRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.pitch(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    highlights: builder.mutation<HighlightsResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ ...endpoints.deal.highlights(id), body }),
      invalidatesTags: ['Deal'],
    }),
    companyInfo: builder.mutation<ApiResponse, CompanyInfoRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.companyInfo(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    addTeam: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ ...endpoints.deal.addTeam(id), body }),
      invalidatesTags: ['Deal'],
    }),
    editTeam: builder.mutation<ApiResponse, { id: string; mem_id: string; body: FormData }>({
      query: ({ id, mem_id, body }) => ({ ...endpoints.deal.editTeam(id, mem_id), body }),
      invalidatesTags: ['Deal'],
    }),
    deleteTeam: builder.mutation<ApiResponse, DeleteTeamRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.deleteTeam(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    addInvestor: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ ...endpoints.deal.addInvestor(id), body }),
      invalidatesTags: ['Deal'],
    }),
    editInvestor: builder.mutation<ApiResponse, { id: string; mem_id: string; body: FormData }>({
      query: ({ id, mem_id, body }) => ({ ...endpoints.deal.editInvestor(id, mem_id), body }),
      invalidatesTags: ['Deal'],
    }),
    deleteInvestor: builder.mutation<ApiResponse, DeleteInvestorRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.deleteInvestor(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    addNews: builder.mutation<ApiResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ ...endpoints.deal.addNews(id), body }),
      invalidatesTags: ['Deal'],
    }),
    editNews: builder.mutation<ApiResponse, { id: string; news_id: string; body: FormData }>({
      query: ({ id, news_id, body }) => ({ ...endpoints.deal.editNews(id, news_id), body }),
      invalidatesTags: ['Deal'],
    }),
    deleteNews: builder.mutation<ApiResponse, DeleteNewsRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.deleteNews(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    dealTerms: builder.mutation<ApiResponse, CreateDealTerms & { id: string }>({
      query: ({ id, ...body }) => ({ ...endpoints.deal.dealTerms(id), body }),
      invalidatesTags: ['Deal'],
    }),
    dataroom: builder.mutation<ApiResponse, any>({
      query: ({ id, ...body }) => ({ ...endpoints.deal.dataroom(id), body }),
      invalidatesTags: ['Deal'],
    }),
    saveInvest: builder.mutation<SaveInvestedResponse, SaveInvestedRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.saveInvested(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
    updateDDReport: builder.mutation<UpdateDDReportResponse, UpdateDDReportRequest>({
      query: ({ deal_id, ...body }) => ({ ...endpoints.deal.ddReport(deal_id), body }),
      invalidatesTags: ['Deal'],
    }),
  }),
});
