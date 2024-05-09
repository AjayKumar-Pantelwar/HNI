import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import { UpdateAppVerionRequest } from 'src/types/notifications.types';
import { baseQuery } from './base-query';

export const notificationsApi = createApi({
  reducerPath: 'notifications',
  baseQuery,
  tagTypes: ['notifications'],
  endpoints: (builder) => ({
    updateAppVersion: builder.mutation<ApiResponse, UpdateAppVerionRequest>({
      query: (body) => ({ ...endpoints.notifications.updateAPP, body }),
    }),
  }),
});
