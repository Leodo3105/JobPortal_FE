import api from '../config/axios';
import { Company, CompanyStats } from '../types/company';

// Lấy thông tin công ty của nhà tuyển dụng
export const getCompanyProfile = async (): Promise<Company> => {
  const response = await api.get<{ success: boolean; data: Company }>('/companies');
  return response.data.data;
};

// Tạo hoặc cập nhật thông tin công ty
export const updateCompanyProfile = async (companyData: Partial<Company>): Promise<Company> => {
  // Nếu đã có công ty, sử dụng PUT để cập nhật
  // Nếu chưa có, sử dụng POST để tạo mới
  const method = companyData.id ? 'put' : 'post';
  const response = await api[method]<{ success: boolean; data: Company }>('/companies', companyData);
  return response.data.data;
};

// Upload logo công ty
export const uploadLogo = async (formData: FormData): Promise<{ logo: string; logoUrl: string }> => {
  const response = await api.put<{ success: boolean; data: { logo: string; logoUrl: string } }>('/companies/logo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

// Lấy thống kê công ty
export const getCompanyStats = async (): Promise<CompanyStats> => {
    const response = await api.get<{ success: boolean; data: CompanyStats }>('/companies/stats');
    return response.data.data;
  };

// Cập nhật gói dịch vụ
export const updateSubscription = async (subscriptionData: {
  type: 'free' | 'basic' | 'premium' | 'enterprise';
  startDate?: Date;
  endDate?: Date;
  status?: 'active' | 'expired' | 'canceled';
}): Promise<Company> => {
  const response = await api.put<{ success: boolean; data: Company }>('/companies/subscription', subscriptionData);
  return response.data.data;
};