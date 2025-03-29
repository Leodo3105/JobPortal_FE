import { useEffect, useState } from 'react';
import { FiBriefcase, FiClock, FiCheck, FiX } from 'react-icons/fi';

// Interface cho dữ liệu giả
interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  interviewInvitations: number;
  rejectedApplications: number;
  savedJobs: number;
}

const JobseekerDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    interviewInvitations: 0,
    rejectedApplications: 0,
    savedJobs: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  // Giả lập việc fetch dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      // Trong triển khai thực tế, đây sẽ là API call
      setTimeout(() => {
        setStats({
          totalApplications: 25,
          pendingApplications: 12,
          interviewInvitations: 5,
          rejectedApplications: 8,
          savedJobs: 15
        });
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
              <FiBriefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Tổng đơn ứng tuyển</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.totalApplications}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-full p-3">
              <FiClock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Đang chờ</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.pendingApplications}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Lời mời phỏng vấn</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.interviewInvitations}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
              <FiX className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Bị từ chối</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.rejectedApplications}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Đơn ứng tuyển gần đây */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Đơn ứng tuyển gần đây</h3>
        </div>
        <div className="px-6 py-5">
          <div className="overflow-hidden">
            {/* Placeholder cho danh sách đơn ứng tuyển */}
            <div className="bg-gray-50 p-4 rounded-md text-center">
              <p className="text-gray-500">Hiện chưa có đơn ứng tuyển nào.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Việc làm đề xuất */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Việc làm phù hợp với bạn</h3>
        </div>
        <div className="px-6 py-5">
          <div className="overflow-hidden">
            {/* Placeholder cho danh sách việc làm */}
            <div className="bg-gray-50 p-4 rounded-md text-center">
              <p className="text-gray-500">Cập nhật hồ sơ để nhận đề xuất việc làm phù hợp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerDashboard;