import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import {
  AddCompanyRequest,
  AddCompanyResponse,
  CompanyRequest,
  CompanyResponse,
  EditCompanyRequest,
  EditCompanyResponse,
} from 'src/types/company.types';
import { baseQuery } from './base-query';

export const companyApi = createApi({
  reducerPath: 'company',
  baseQuery,
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
