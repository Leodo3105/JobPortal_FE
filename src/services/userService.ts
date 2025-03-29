import api from '../config/axios';
import {  UserProfile } from '../types/user';

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<{ success: boolean; data: UserProfile }>('/profiles');
  return response.data.data;
};

export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await api.put<{ success: boolean; data: UserProfile }>('/profiles', profileData);
  return response.data.data;
};