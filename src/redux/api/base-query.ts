import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { enqueueSnackbar } from 'notistack';
import { authSlice } from '../slices/auth.slice';

type BaseQuery = (
  args: any,
  baseApi: BaseQueryApi,
  extraOptions: {}
) => Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>;

export const baseQuery: BaseQuery = async (args, baseApi, extraOptions) => {
  const _baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  });

  const result = await _baseQuery(args, baseApi, extraOptions);
  /*
   * If response is 401, that means the user is not authenticated.
   * In that case, we redirect to the login page.
   */
  if (result.meta?.response?.status === 401) {
    enqueueSnackbar('Your session is expired, please login again', { variant: 'error' });
    baseApi.dispatch(authSlice.actions.logout());
  }

  return result;
};
