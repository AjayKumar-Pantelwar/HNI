import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { adminApi } from './api/admin.api';
import { companyApi } from './api/company.api';
import { dealApi } from './api/deal.api';
import { roleApi } from './api/role.api';
import { authSlice } from './slices/auth.slice';

export const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(
    {
      key: 'auth',
      storage,
    },
    authSlice.reducer
  ),
  [companyApi.reducerPath]: companyApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [dealApi.reducerPath]: dealApi.reducer,
});
