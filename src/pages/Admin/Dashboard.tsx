import { useState, useEffect } from 'react';
import { FiUsers, FiBriefcase, FiCheckSquare, FiAlertCircle, FiBox, FiTrendingUp } from 'react-icons/fi';

// Interface cho dữ liệu thống kê
interface AdminStats {
  totalUsers: number;
  jobseekers: number;
  employers: number;
  admins: number;
  totalJobs: number;
  activeJobs: number;
  closedJobs: number;
  expiredJobs: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    jobseekers: 0,
    employers: 0,
    admins: 0,
    totalJobs: 0,
    activeJobs: 0,
    closedJobs: 0,
    expiredJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  // Giả lập việc fetch dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      // Trong triển khai thực tế, đây sẽ là API call
      setTimeout(() => {
        setStats({
          totalUsers: 1250,
          jobseekers: 980,
          employers: 250,
          admins: 20,
          totalJobs: 450,
          activeJobs: 320,
          closedJobs: 80,
          expiredJobs: 50,
          totalApplications: 2500,
          pendingApplications: 750,
          acceptedApplications: 950,
          rejectedApplications: 800
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
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
      
      {/* Thống kê người dùng */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Thống kê người dùng</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Tổng người dùng</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Người tìm việc</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.jobseekers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Nhà tuyển dụng</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.employers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Quản trị viên</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.admins}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Thống kê việc làm */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Thống kê việc làm</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FiBriefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Tổng việc làm</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.totalJobs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                <FiCheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Việc làm đang hoạt động</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.activeJobs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-100 rounded-full p-3">
                <FiBox className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Việc làm đã đóng</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.closedJobs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                <FiAlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Việc làm hết hạn</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.expiredJobs}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Thống kê đơn ứng tuyển */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Thống kê đơn ứng tuyển</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FiTrendingUp className="h-6 w-6 text-blue-600" />
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
                <FiAlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Đơn chờ xử lý</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.pendingApplications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                <FiCheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Đơn được chấp nhận</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.acceptedApplications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                <FiAlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Đơn bị từ chối</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.rejectedApplications}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Thống kê mới nhất */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Người dùng mới đăng ký</h3>
          </div>
          <div className="px-6 py-5">
            <div className="overflow-hidden">
              {/* Placeholder cho danh sách người dùng mới */}
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="text-gray-500">Danh sách người dùng mới sẽ hiển thị tại đây.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Tin tuyển dụng mới</h3>
          </div>
          <div className="px-6 py-5">
            <div className="overflow-hidden">
              {/* Placeholder cho danh sách tin tuyển dụng mới */}
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="text-gray-500">Danh sách tin tuyển dụng mới sẽ hiển thị tại đây.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;