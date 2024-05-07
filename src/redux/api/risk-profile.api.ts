import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { GetQuestionsResponse } from 'src/types/risk-profile.types';
import { CreateRoleRequest, EditRoleRequest, GetPermissionResponse } from 'src/types/role.types';
import { baseQuery } from './base-query';

export const riskProfileApi = createApi({
  reducerPath: 'riskprofile',
  baseQuery,
  tagTypes: ['RiskProfile'],
  endpoints: (builder) => ({
    questions: builder.query<GetQuestionsResponse, void>({
      query: (params) => ({ ...endpoints.role.list, params }),
      providesTags: ['RiskProfile'],
    }),
    createQuestion: builder.mutation<ApiResponse, CreateRoleRequest>({
      query: (body) => ({ ...endpoints.role.create, body }),
      invalidatesTags: ['RiskProfile'],
    }),
    editQuestion: builder.mutation<ApiResponse, EditRoleRequest>({
      query: ({ id, ...body }) => ({ ...endpoints.role.edit(id), body }),
      invalidatesTags: ['RiskProfile'],
    }),
    addOption: builder.query<GetPermissionResponse, { id: string }>({
      query: ({ id }) => endpoints.role.permissions(id),
    }),
  }),
});
