import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { ApiResponse } from 'src/types/api';
import {
  BasicInfoMediaResponse,
  CreateDealResponse,
  GetDealRequest,
  GetDealResponse,
  HighlightsResponse,
  PitchResponse,
} from 'src/types/deals.types';
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
      query: (params) => ({ url: '/api/deal', params }),
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
    basicInfoMedia: builder.mutation<BasicInfoMediaResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/basic/media/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    pitch: builder.mutation<PitchResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/pitch/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
    highlights: builder.mutation<HighlightsResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/deal/pitch/highlights/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deal'],
    }),
  }),
});
