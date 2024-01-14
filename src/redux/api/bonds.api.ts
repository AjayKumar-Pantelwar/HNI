import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { CreateBondRequest, GetBondsResponse, UpdateBondRequest } from 'src/types/bonds.types';
import { baseQuery } from './base-query';

export const bondsApi = createApi({
  reducerPath: 'bonds',
  baseQuery,
  tagTypes: ['Bonds'],
  endpoints: (builder) => ({
    bonds: builder.query<GetBondsResponse, void>({
      query: (params) => ({ ...endpoints.bonds.list, params }),
      providesTags: ['Bonds'],
    }),
    createBond: builder.mutation<ApiResponse, CreateBondRequest>({
      query: (body) => ({ ...endpoints.bonds.create, body }),
      invalidatesTags: ['Bonds'],
    }),
    editBond: builder.mutation<ApiResponse, UpdateBondRequest>({
      query: ({ bond_id, ...body }) => ({ ...endpoints.bonds.edit(bond_id), body }),
      invalidatesTags: ['Bonds'],
    }),
  }),
});
