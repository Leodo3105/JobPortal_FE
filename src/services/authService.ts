import api from '../config/axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { User } from '../types/user';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.get('/auth/logout');
};

// Đây là phương thức để refresh thông tin người dùng hiện tại
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<{ success: boolean; data: User }>('/auth/me');
  return response.data.data;
};

export const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token: string, password: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>('/auth/reset-password', { token, password });
  return response.data;
};