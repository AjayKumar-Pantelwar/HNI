import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { endpoints } from 'src/routes/endpoints';
import {
  AddCompanyRequest,
  AddCompanyResponse,
  CompanyRequest,
  CompanyResponse,
  EditCompanyRequest,
  EditCompanyResponse,
} from 'src/types/company.types';
import { authSlice } from '../slices/auth.slice';

export const companyApi = createApi({
  reducerPath: 'company',
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
  tagTypes: ['Company'],
  endpoints: (builder) => ({
    company: builder.query<CompanyResponse, CompanyRequest>({
      query: (params) => ({ ...endpoints.company.list, params }),
      providesTags: ['Company'],
    }),
    createCompany: builder.mutation<AddCompanyResponse, AddCompanyRequest>({
      query: (body) => ({ ...endpoints.company.create, body }),
      invalidatesTags: ['Company'],
    }),
    editCompany: builder.mutation<EditCompanyResponse, EditCompanyRequest>({
      query: ({ company_id, ...body }) => ({ ...endpoints.company.edit(company_id), body }),
      invalidatesTags: ['Company'],
    }),
  }),
});
