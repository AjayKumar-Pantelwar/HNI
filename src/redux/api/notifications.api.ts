import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/routes/endpoints';
import { ApiResponse } from 'src/types/api.types';
import {
  CreateNotificationRequest,
  GetNotificationsResponse,
  UpdateAppVerionRequest,
  UpdateNotificationRequest,
} from 'src/types/notifications.types';
import { baseQuery } from './base-query';

export const notificationsApi = createApi({
  reducerPath: 'notifications',
  baseQuery,
  tagTypes: ['notifications'],
  endpoints: (builder) => ({
    updateAppVersion: builder.mutation<ApiResponse, UpdateAppVerionRequest>({
      query: (body) => ({ ...endpoints.notifications.updateAPP, body }),
    }),
    getNotifications: builder.query<GetNotificationsResponse, void>({
      query: () => endpoints.notifications.list,
      providesTags: ['notifications'],
    }),
    getActiveNotifications: builder.query<GetNotificationsResponse, void>({
      query: () => endpoints.notifications.activeList,
      providesTags: ['notifications'],
    }),
    createNotification: builder.mutation<ApiResponse, CreateNotificationRequest>({
      query: (body) => ({ ...endpoints.notifications.create, body }),
      invalidatesTags: ['notifications'],
    }),
    updateNotification: builder.mutation<ApiResponse, UpdateNotificationRequest>({
      query: (body) => ({ ...endpoints.notifications.edit, body }),
      invalidatesTags: ['notifications'],
    }),
  }),
});
