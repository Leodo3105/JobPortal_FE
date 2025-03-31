import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink, FiClock, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import { getUserApplications } from '../../services/applicationService';
import { Application } from '../../types/application';

const ApplicationStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <FiClock className="mr-1" /> Chờ xem xét
        </span>
      );
    case 'viewed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <FiExternalLink className="mr-1" /> Đã xem
        </span>
      );
    case 'interview':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <FiCalendar className="mr-1" /> Phỏng vấn
        </span>
      );
    case 'accepted':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <FiCheck className="mr-1" /> Chấp nhận
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <FiX className="mr-1" /> Từ chối
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      );
  }
};

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getUserApplications();
        setApplications(data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        toast.error('Không thể tải danh sách đơn ứng tuyển');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);
  
  // Filter applications
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });
  
  // Calculate stats
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    viewed: applications.filter(app => app.status === 'viewed').length,
    interview: applications.filter(app => app.status === 'interview').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Đơn ứng tuyển của tôi</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Tất cả</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-yellow-500 text-sm">Chờ xem xét</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-blue-500 text-sm">Đã xem</p>
          <p className="text-2xl font-bold">{stats.viewed}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-purple-500 text-sm">Phỏng vấn</p>
          <p className="text-2xl font-bold">{stats.interview}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-green-500 text-sm">Chấp nhận</p>
          <p className="text-2xl font-bold">{stats.accepted}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-red-500 text-sm">Từ chối</p>
          <p className="text-2xl font-bold">{stats.rejected}</p>
        </div>
      </div>
      
      {/* Filter */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              Chờ xem xét ({stats.pending})
            </button>
            
            <button
              onClick={() => setFilter('viewed')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'viewed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Đã xem ({stats.viewed})
            </button>
            
            <button
              onClick={() => setFilter('interview')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'interview'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
            >
              Phỏng vấn ({stats.interview})
            </button>
            
            <button
              onClick={() => setFilter('accepted')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'accepted'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Chấp nhận ({stats.accepted})
            </button>
            
            <button
              onClick={() => setFilter('rejected')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'rejected'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              Từ chối ({stats.rejected})
            </button>
          </div>
        </div>
      </div>
      
      {/* Applications List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {filteredApplications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <div key={application.id} className="p-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application.job.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {application.job.company.name}
                    </p>
                    <div className="mt-2">
                      <ApplicationStatusBadge status={application.status} />
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                    <p className="text-sm text-gray-500">
                      Ngày ứng tuyển: {new Date(application.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                    <Link
                      to={`/jobseeker/applications/${application.id}`}
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                
                {application.interviews && application.interviews.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="font-medium text-blue-800">Thông tin phỏng vấn:</p>
                    <div className="mt-1">
                      <p className="text-sm text-blue-600">
                        <span className="font-medium">Thời gian:</span> {new Date(application.interviews[0].date).toLocaleString('vi-VN')}
                      </p>
                      <p className="text-sm text-blue-600">
                        <span className="font-medium">Địa điểm:</span> {application.interviews[0].location}
                      </p>
                      <p className="text-sm text-blue-600">
                        <span className="font-medium">Hình thức:</span> {
                          application.interviews[0].type === 'in-person' ? 'Trực tiếp' :
                          application.interviews[0].type === 'phone' ? 'Điện thoại' : 'Video'
                        }
                      </p>
                    </div>
                  </div>
                )}
                
                {application.employerFeedback && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="font-medium text-gray-800">Phản hồi từ nhà tuyển dụng:</p>
                    <p className="mt-1 text-sm text-gray-600">{application.employerFeedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">Không có đơn ứng tuyển nào {filter !== 'all' ? 'với trạng thái này' : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;