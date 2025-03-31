import api from '../config/axios';
import { SavedJob } from '../types/job';

// Lấy danh sách việc làm đã lưu
export const getSavedJobs = async (): Promise<SavedJob[]> => {
  const response = await api.get<{ success: boolean; data: SavedJob[] }>('/saved-jobs');
  return response.data.data;
};

// Lưu một việc làm
export const saveJob = async (jobId: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>(`/saved-jobs/${jobId}`);
  return response.data;
};

// Bỏ lưu một việc làm
export const unsaveJob = async (jobId: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(`/saved-jobs/${jobId}`);
  return response.data;
};