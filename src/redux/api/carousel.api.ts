import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { GetCarouselResponse } from 'src/types/carousel.types';
import { CreateRoleRequest, EditRoleRequest } from 'src/types/role.types';
import { baseQuery } from './base-query';

export const carouselApi = createApi({
  reducerPath: 'carousel',
  baseQuery,
  tagTypes: ['Carousel'],
  endpoints: (builder) => ({
    carousels: builder.query<GetCarouselResponse, void>({
      query: (params) => ({ ...endpoints.carousel.list, params }),
      providesTags: ['Carousel'],
    }),
    insertCarousel: builder.mutation<ApiResponse, CreateRoleRequest>({
      query: (body) => ({ ...endpoints.carousel.insert, body }),
      invalidatesTags: ['Carousel'],
    }),
    editCarousel: builder.mutation<ApiResponse, EditRoleRequest>({
      query: ({ id, ...body }) => ({ ...endpoints.carousel.edit(id), body }),
      invalidatesTags: ['Carousel'],
    }),
  }),
});
