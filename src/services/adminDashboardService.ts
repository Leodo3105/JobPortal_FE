import api from '../config/axios';

export interface AdminDashboardStats {
  users: {
    total: number;
    jobseekers: number;
    employers: number;
    admins: number;
  };
  jobs: {
    total: number;
    active: number;
    closed: number;
    expired: number;
    draft: number;
  };
  applications: {
    total: number;
    pending: number;
    viewed: number;
    interview: number;
    accepted: number;
    rejected: number;
  };
  companies: {
    total: number;
    featured: number;
  };
  profiles: {
    total: number;
    withCV: number;
  };
  charts: {
    labels: string[];
    datasets: {
      newUsers: number[];
      newJobs: number[];
      newApplications: number[];
    };
  };
  popular: {
    categories: { _id: string; count: number }[];
    locations: { _id: string; count: number }[];
  };
}

// Lấy thống kê tổng quan cho Admin Dashboard
export const getAdminDashboardStats = async (): Promise<AdminDashboardStats> => {
  const response = await api.get<{ success: boolean; data: AdminDashboardStats }>('/dashboard/admin');
  return response.data.data;
};