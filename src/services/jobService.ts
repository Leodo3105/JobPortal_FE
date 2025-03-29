import api from '../config/axios';
import { Job, JobInput } from '../types/job';
import { Application } from '../types/application';

// Lấy danh sách tin tuyển dụng của nhà tuyển dụng
export const getEmployerJobs = async (): Promise<Job[]> => {
  const response = await api.get<{ success: boolean; data: Job[] }>('/jobs/employer/myjobs');
  return response.data.data;
};

// Tạo tin tuyển dụng mới
export const createJob = async (jobData: JobInput): Promise<Job> => {
  const response = await api.post<{ success: boolean; data: Job }>('/jobs', jobData);
  return response.data.data;
};

// Cập nhật tin tuyển dụng
export const updateJob = async (id: string, jobData: Partial<JobInput>): Promise<Job> => {
  const response = await api.put<{ success: boolean; data: Job }>(`/jobs/${id}`, jobData);
  return response.data.data;
};

// Xóa tin tuyển dụng
export const deleteJob = async (id: string): Promise<void> => {
  await api.delete<{ success: boolean }>(`/jobs/${id}`);
};

// Cập nhật trạng thái tin tuyển dụng
export const changeJobStatus = async (id: string, status: 'active' | 'closed' | 'draft' | 'expired'): Promise<Job> => {
  const response = await api.put<{ success: boolean; data: Job }>(`/jobs/${id}/status`, { status });
  return response.data.data;
};

// Lấy danh sách ứng viên của một tin tuyển dụng
export const getJobApplications = async (jobId: string): Promise<Application[]> => {
    const response = await api.get<{ success: boolean; data: Application[] }>(`/applications/job/${jobId}`);
    return response.data.data;
  };