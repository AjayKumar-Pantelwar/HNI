import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from 'src/types/auth';

export const authSlice = createSlice({
  initialState: {
    isAuthenticated: false,
    user: null as LoginResponse & { username: string } | null,
  },
  name: 'auth',
  reducers: {
    login(state, action: PayloadAction<LoginResponse & { username: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
