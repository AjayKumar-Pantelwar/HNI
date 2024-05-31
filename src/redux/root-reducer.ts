import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { adminApi } from './api/admin.api';
import { bondsApi } from './api/bonds.api';
import { carouselApi } from './api/carousel.api';
import { mldsApi } from './api/mlds.api';
import { notificationsApi } from './api/notifications.api';
import { productUploadApi } from './api/product-upload.api';
import { roleApi } from './api/role.api';
import { userApi } from './api/user.api';
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
  // [companyApi.reducerPath]: companyApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [carouselApi.reducerPath]: carouselApi.reducer,
  [bondsApi.reducerPath]: bondsApi.reducer,
  [mldsApi.reducerPath]: mldsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [notificationsApi.reducerPath]: notificationsApi.reducer,
  [productUploadApi.reducerPath]: productUploadApi.reducer,

  // [dealApi.reducerPath]: dealApi.reducer,
  // [constantApi.reducerPath]: constantApi.reducer,
  // [investorApi.reducerPath]: investorApi.reducer,
});
