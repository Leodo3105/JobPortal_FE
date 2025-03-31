import api from '../config/axios';
import { Application } from '../types/application';

// Lấy danh sách đơn ứng tuyển của người dùng
export const getUserApplications = async (): Promise<Application[]> => {
  const response = await api.get<{ success: boolean; data: Application[] }>('/applications/user/myapplications');
  return response.data.data;
};

// Lấy chi tiết đơn ứng tuyển
export const getApplicationDetail = async (id: string): Promise<Application> => {
  const response = await api.get<{ success: boolean; data: Application }>(`/applications/${id}`);
  return response.data.data;
};

// Hủy đơn ứng tuyển - Backend chưa có API này, nhưng chúng ta có thể chuẩn bị trước
export const cancelApplication = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.put<{ success: boolean; message: string }>(`/applications/${id}/cancel`);
  return response.data;
};