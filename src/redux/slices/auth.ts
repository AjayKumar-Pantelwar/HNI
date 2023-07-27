import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from 'src/types/auth';

export const authSlice = createSlice({
  initialState: {
    isAuthenticated: false,
    loginData: null as (LoginResponse & { username: string }) | null,
  },
  name: 'auth',
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    setLoginData(state, action: PayloadAction<LoginResponse & { username: string }>) {
      state.loginData = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginData = null;
    },
  },
});
