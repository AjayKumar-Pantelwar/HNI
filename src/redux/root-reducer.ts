import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import checkoutReducer from './slices/checkout';
import { authSlice } from './slices/auth.slice';
import { adminApi } from './api/admin.api';
import { roleApi } from './api/role.api';
import { dealApi } from './api/deal.api';

// ----------------------------------------------------------------------

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

const checkoutPersistConfig = {
  key: 'checkout',
  storage,
  keyPrefix: 'redux-',
};

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
};

export const rootReducer = combineReducers({
  checkout: persistReducer(checkoutPersistConfig, checkoutReducer),
  [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
  [adminApi.reducerPath]: adminApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [dealApi.reducerPath]: dealApi.reducer,
});
