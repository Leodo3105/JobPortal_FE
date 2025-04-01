import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { 
  fetchJobApplications,
  clearErrors,
  clearMessages 
} from '../../store/slices/employerApplicationsSlice';
import { getEmployerJobs } from '../../services/jobService';
import { Job } from '../../types/job';
import { FiUsers, FiFilter, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ApplicationStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Chờ xem xét
        </span>
      );
    case 'viewed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Đã xem
        </span>
      );
    case 'interview':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Phỏng vấn
        </span>
      );
    case 'accepted':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Chấp nhận
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Từ chối
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

const EmployerApplications = () => {
  const dispatch = useAppDispatch();
  const { applications, loading, error, successMessage } = useAppSelector(state => state.employerApplications);
  
  // Local state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  
  // Load jobs on mount
  useEffect(() => {
    loadEmployerJobs();
    
    // Clean up
    return () => {
      dispatch(clearErrors());
      dispatch(clearMessages());
    };
  }, [dispatch]);
  
  // Handle success/error messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [successMessage, error, dispatch]);
  
  // Load jobs
  const loadEmployerJobs = async () => {
    try {
      setLoadingJobs(true);
      const jobsData = await getEmployerJobs();
      setJobs(jobsData);
      
      // If jobs are available, select the first one
      if (jobsData.length > 0) {
        setSelectedJobId(jobsData[0].id);
        dispatch(fetchJobApplications(jobsData[0].id));
      }
    } catch (err) {
      console.error('Error loading jobs:', err);
      toast.error('Không thể tải danh sách việc làm');
    } finally {
      setLoadingJobs(false);
    }
  };
  
  // Handle job selection change
  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const jobId = e.target.value;
    setSelectedJobId(jobId);
    if (jobId) {
      dispatch(fetchJobApplications(jobId));
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Filter applications by status
  const filteredApplications = applications.filter(app => 
    !filterStatus || app.status === filterStatus
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <FiUsers className="text-blue-500 mr-2" size={24} />
        <h1 className="text-2xl font-bold">Quản lý ứng viên</h1>
      </div>
      
      {/* Filter section */}
      <div className="bg-white shadow-md rounded-lg mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FiFilter className="mr-2" /> Bộ lọc
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobSelect">
                Chọn tin tuyển dụng
              </label>
              {loadingJobs ? (
                <div className="py-2">
                  <LoadingSpinner size="sm" />
                </div>
              ) : jobs.length > 0 ? (
                <select
                  id="jobSelect"
                  value={selectedJobId}
                  onChange={handleJobChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="py-2 text-red-500">
                  Bạn chưa có tin tuyển dụng nào.
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusFilter">
                Lọc theo trạng thái
              </label>
              <select
                id="statusFilter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xem xét</option>
                <option value="viewed">Đã xem</option>
                <option value="interview">Phỏng vấn</option>
                <option value="accepted">Chấp nhận</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Applications List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : applications.length > 0 ? (
          <>
            <div className="px-6 py-4 border-b">
              <p className="text-gray-600">
                Tìm thấy {filteredApplications.length} ứng viên{' '}
                {filterStatus && `với trạng thái "${filterStatus}"`}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ứng viên
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tiêu đề hồ sơ
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày ứng tuyển
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {application.user.avatar ? (
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={`/uploads/avatars/${application.user.avatar}`} 
                                alt={application.user.name} 
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                                {application.user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.profile.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(application.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ApplicationStatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/employer/applications/${application.id}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <FiEye className="mr-1" /> Xem chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            {selectedJobId ? (
              <p className="text-gray-500">Không có ứng viên nào cho việc làm này.</p>
            ) : (
              <p className="text-gray-500">Vui lòng chọn một việc làm để xem danh sách ứng viên.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerApplications;