import { useEffect, useState } from 'react';
import { FiBriefcase, FiUsers, FiEye, FiCheck } from 'react-icons/fi';

// Interface cho dữ liệu giả
interface EmployerStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  newApplications: number;
  viewCount: number;
}

const EmployerDashboard = () => {
  const [stats, setStats] = useState<EmployerStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0,
    viewCount: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  // Giả lập việc fetch dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      // Trong triển khai thực tế, đây sẽ là API call
      setTimeout(() => {
        setStats({
          totalJobs: 12,
          activeJobs: 8,
          totalApplications: 45,
          newApplications: 7,
          viewCount: 350
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
              <p className="text-sm font-medium text-gray-500 truncate">Tin tuyển dụng</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.totalJobs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Tin đang hiển thị</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.activeJobs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
              <FiUsers className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Tổng ứng viên</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.totalApplications}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-full p-3">
              <FiEye className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Lượt xem</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{stats.viewCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ứng viên mới */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Ứng viên mới ({stats.newApplications})</h3>
        </div>
        <div className="px-6 py-5">
          <div className="overflow-hidden">
            {/* Placeholder cho danh sách ứng viên */}
            <div className="bg-gray-50 p-4 rounded-md text-center">
              <p className="text-gray-500">Hiện chưa có ứng viên mới.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tin tuyển dụng mới nhất */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Tin tuyển dụng của bạn</h3>
        </div>
        <div className="px-6 py-5">
          <div className="overflow-hidden">
            {/* Placeholder cho danh sách tin tuyển dụng */}
            <div className="bg-gray-50 p-4 rounded-md text-center">
              <p className="text-gray-500">Bạn chưa có tin tuyển dụng nào.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;