import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';

import { adminApi } from './api/admin.api';
import { bondsApi } from './api/bonds.api';
import { carouselApi } from './api/carousel.api';
import { mldsApi } from './api/mlds.api';
import { roleApi } from './api/role.api';
import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      roleApi.middleware,
      adminApi.middleware,
      carouselApi.middleware,
      bondsApi.middleware,
      mldsApi.middleware,
      // dealApi.middleware,
      // companyApi.middleware,
      // constantApi.middleware,
      // investorApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export const useDispatch = () => useAppDispatch<AppDispatch>();
