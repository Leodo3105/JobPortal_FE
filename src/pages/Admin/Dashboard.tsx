import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiUsers, FiBriefcase, FiCheckSquare, FiAlertCircle, FiBox, FiTrendingUp, FiBarChart2, FiMapPin } from 'react-icons/fi';
import { getAdminDashboardStats, AdminDashboardStats } from '../../services/adminDashboardService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Chart component
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAdminDashboardStats();
        setStats(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải thống kê Dashboard';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error || !stats) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Lỗi khi tải dữ liệu</h2>
        <p className="text-gray-600 mb-4">{error || 'Không thể tải thống kê Dashboard'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Thử lại
        </button>
      </div>
    );
  }
  
  // Transform chart data
  const chartData = stats.charts.labels.map((label, index) => ({
    name: label,
    'Người dùng mới': stats.charts.datasets.newUsers[index],
    'Việc làm mới': stats.charts.datasets.newJobs[index],
    'Đơn ứng tuyển mới': stats.charts.datasets.newApplications[index]
  }));
  
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.users.total}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.users.jobseekers}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.users.employers}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.users.admins}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Thống kê việc làm */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Thống kê việc làm</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FiBriefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Tổng việc làm</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.jobs.total}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.jobs.active}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.jobs.closed}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.jobs.expired}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-full p-3">
                <FiBox className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Bản nháp</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.jobs.draft}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Thống kê đơn ứng tuyển */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Thống kê đơn ứng tuyển</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FiTrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Tổng đơn ứng tuyển</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.applications.total}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.applications.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FiCheckSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Đã xem</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.applications.viewed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Phỏng vấn</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.applications.interview}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.applications.accepted}</p>
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
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.applications.rejected}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Thống kê thêm */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Thống kê khác</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Tổng công ty</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.companies.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Công ty nổi bật</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.companies.featured}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Tổng hồ sơ</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.profiles.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                <FiUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Hồ sơ có CV</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stats.profiles.withCV}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Biểu đồ */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Biểu đồ thống kê theo tháng</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Người dùng mới" fill="#3182ce" />
                <Bar dataKey="Việc làm mới" fill="#38a169" />
                <Bar dataKey="Đơn ứng tuyển mới" fill="#805ad5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      
      {/* Thống kê phân loại */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FiBarChart2 className="mr-2" /> Danh mục phổ biến
            </h3>
          </div>
          <div className="px-6 py-5">
            <div className="overflow-hidden">
              {stats.popular.categories.length > 0 ? (
                <ul className="space-y-4">
                  {stats.popular.categories.map((category, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{category._id}</span>
                      <span className="font-semibold bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                        {category.count} việc làm
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">Không có dữ liệu danh mục.</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FiMapPin className="mr-2" /> Địa điểm phổ biến
            </h3>
          </div>
          <div className="px-6 py-5">
            <div className="overflow-hidden">
              {stats.popular.locations.length > 0 ? (
                <ul className="space-y-4">
                  {stats.popular.locations.map((location, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{location._id}</span>
                      <span className="font-semibold bg-green-100 text-green-800 py-1 px-3 rounded-full">
                        {location.count} việc làm
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">Không có dữ liệu địa điểm.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;