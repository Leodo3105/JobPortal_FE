import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    // Thêm reducer mới để cập nhật avatar
    updateUserAvatar: (state, action: PayloadAction<{ avatar: string; avatarUrl: string }>) => {
      if (state.user) {
        state.user.avatar = action.payload.avatar;
        state.user.avatarUrl = action.payload.avatarUrl;
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserAvatar } = authSlice.actions;
export default authSlice.reducer;