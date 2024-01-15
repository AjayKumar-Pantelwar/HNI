import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { GetCarouselResponse } from 'src/types/carousel.types';
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
    insertCarousel: builder.mutation<ApiResponse, FormData>({
      query: (body) => ({ ...endpoints.carousel.insert, body }),
      invalidatesTags: ['Carousel'],
    }),
    editCarousel: builder.mutation<ApiResponse, {body: FormData; id: string}>({
      query: ({ id, ...body }) => ({ ...endpoints.carousel.edit(id), body }),
      invalidatesTags: ['Carousel'],
    }),
  }),
});
