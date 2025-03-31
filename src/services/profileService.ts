import api from '../config/axios';
import { JobseekerProfile } from '../types/user';
import { EducationInput, ExperienceInput } from '../types/profile';

// Lấy hồ sơ của người dùng hiện tại
export const getUserProfile = async (): Promise<JobseekerProfile> => {
  const response = await api.get<{ success: boolean; data: JobseekerProfile }>('/profiles');
  return response.data.data;
};

// Cập nhật hồ sơ người dùng
export const updateUserProfile = async (profileData: Partial<JobseekerProfile>): Promise<JobseekerProfile> => {
  const response = await api.put<{ success: boolean; data: JobseekerProfile }>('/profiles', profileData);
  return response.data.data;
};

// Thêm thông tin học vấn
export const addEducation = async (educationData: EducationInput): Promise<JobseekerProfile> => {
  const response = await api.put<{ success: boolean; data: JobseekerProfile }>('/profiles/education', educationData);
  return response.data.data;
};

// Xóa thông tin học vấn
export const deleteEducation = async (educationId: string): Promise<JobseekerProfile> => {
  const response = await api.delete<{ success: boolean; data: JobseekerProfile }>(`/profiles/education/${educationId}`);
  return response.data.data;
};

// Thêm kinh nghiệm làm việc
export const addExperience = async (experienceData: ExperienceInput): Promise<JobseekerProfile> => {
  const response = await api.put<{ success: boolean; data: JobseekerProfile }>('/profiles/experience', experienceData);
  return response.data.data;
};

// Xóa kinh nghiệm làm việc
export const deleteExperience = async (experienceId: string): Promise<JobseekerProfile> => {
  const response = await api.delete<{ success: boolean; data: JobseekerProfile }>(`/profiles/experience/${experienceId}`);
  return response.data.data;
};

// Upload CV
export const uploadCV = async (formData: FormData): Promise<{ fileName: string; filePath: string }> => {
  const response = await api.put<{ success: boolean; data: { fileName: string; filePath: string } }>('/cv/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

// Upload ảnh đại diện - KIỂM TRA KỸ PHẦN NÀY
export const uploadAvatar = async (formData: FormData): Promise<{ avatar: string; avatarUrl: string }> => {
  const response = await api.put<{ success: boolean; data: { avatar: string; avatarUrl: string } }>('/profiles/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('API response:', response.data); // Log để debug
  return response.data.data;
};