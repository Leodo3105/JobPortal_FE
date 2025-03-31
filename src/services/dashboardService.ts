import api from '../config/axios';

interface RecentApplication {
    id: string;
    job: {
      id: string;
      title: string;
      company: {
        id: string;
        name: string;
        logo?: string;
      }
    };
    status: string;
    createdAt: string;
  }

interface JobseekerDashboardStats {
  applications: {
    total: number;
    pending: number;
    viewed: number;
    interview: number;
    accepted: number;
    rejected: number;
  };
  savedJobs: number;
  profileCompletion: number;
  charts: {
    labels: string[];
    datasets: {
      applicationsPerMonth: number[];
    };
  };
  recentApplications: RecentApplication[]; // Sử dụng any tạm thời
}

// Lấy thống kê dashboard cho người tìm việc
export const getJobseekerDashboardStats = async (): Promise<JobseekerDashboardStats> => {
  const response = await api.get<{ success: boolean; data: JobseekerDashboardStats }>('/dashboard/jobseeker');
  return response.data.data;
};