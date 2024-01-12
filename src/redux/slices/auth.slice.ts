import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'src/types/auth.types';

export const authSlice = createSlice({
  initialState: {
    isAuthenticated: false,
    user: null as User | null,
  },
  name: 'auth',
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
