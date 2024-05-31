import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { UploadExcelResponse } from 'src/types/product-upload.types';
import { baseQuery } from './base-query';

export const productUploadApi = createApi({
  reducerPath: 'product-upload',
  baseQuery,
  tagTypes: ['product-upload'],
  endpoints: (builder) => ({
    uploadExcel: builder.mutation<UploadExcelResponse, { type: string; file: FormData }>({
      query: (body) => {
        const { type, file } = body;
        return { ...endpoints.productUpload.excelUpload.upload(type), body: file };
      },
    }),
    downloadExcel: builder.query<Blob, { type: string }>({
      query: (body) => ({
        ...endpoints.productUpload.excelUpload.download(body.type),
        responseHandler: (response: any) => response.blob(),
      }),
    }),
  }),
});
