import api from '../config/axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

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

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>('/auth/me');
  return response.data;
};