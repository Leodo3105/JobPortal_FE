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

// Lấy danh sách ứng viên cho một công việc (dành cho nhà tuyển dụng)
export const getJobApplications = async (jobId: string): Promise<Application[]> => {
  const response = await api.get<{ success: boolean; data: Application[] }>(`/applications/job/${jobId}`);
  return response.data.data;
};

// Cập nhật trạng thái đơn ứng tuyển
export const updateApplicationStatus = async (
  applicationId: string,
  status: 'pending' | 'viewed' | 'interview' | 'accepted' | 'rejected',
  feedback?: string
): Promise<Application> => {
  const response = await api.put<{ success: boolean; data: Application }>(`/applications/${applicationId}/status`, { 
    status,
    feedback
  });
  return response.data.data;
};

// Lên lịch phỏng vấn
export const scheduleInterview = async (
  applicationId: string,
  interviewData: {
    date: string;
    location: string;
    type: 'in-person' | 'phone' | 'video';
    notes?: string;
  }
): Promise<Application> => {
  const response = await api.put<{ success: boolean; data: Application }>(
    `/applications/${applicationId}/schedule-interview`,
    interviewData
  );
  return response.data.data;
};

// Thêm ghi chú cho đơn ứng tuyển
export const addApplicationNote = async (
  applicationId: string,
  content: string
): Promise<Application> => {
  const response = await api.put<{ success: boolean; data: Application }>(
    `/applications/${applicationId}/notes`,
    { content }
  );
  return response.data.data;
};

// Tải CV của ứng viên
export const downloadApplicationCV = (applicationId: string): string => {
  return `${api.defaults.baseURL}/applications/${applicationId}/cv`;
};