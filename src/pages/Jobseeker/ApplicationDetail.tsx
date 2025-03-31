import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiDownload, FiClock, FiCheck, FiX, FiCalendar, FiMapPin, FiPhone, FiVideo } from 'react-icons/fi';
import { getApplicationDetail } from '../../services/applicationService';
import { Application } from '../../types/application';

const ApplicationStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <FiClock className="mr-1" /> Chờ xem xét
        </span>
      );
    case 'viewed':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          <FiClock className="mr-1" /> Đã xem
        </span>
      );
    case 'interview':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          <FiCalendar className="mr-1" /> Phỏng vấn
        </span>
      );
    case 'accepted':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <FiCheck className="mr-1" /> Chấp nhận
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <FiX className="mr-1" /> Từ chối
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      );
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchApplicationDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getApplicationDetail(id);
        setApplication(data);
      } catch (error) {
        console.error('Failed to fetch application details:', error);
        toast.error('Không thể tải thông tin đơn ứng tuyển');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplicationDetail();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!application) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Không tìm thấy thông tin</h2>
          <p className="text-gray-600 mb-6">Không tìm thấy thông tin đơn ứng tuyển hoặc bạn không có quyền xem.</p>
          <button
            onClick={() => navigate('/jobseeker/applications')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiArrowLeft className="mr-2" /> Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/jobseeker/applications')}
          className="mr-4 text-gray-600 hover:text-gray-900"
          aria-label="Quay lại danh sách đơn ứng tuyển"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Chi tiết đơn ứng tuyển</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-semibold">{application.job.title}</h2>
              <p className="text-gray-600 mt-1">{application.job.company.name}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <ApplicationStatusBadge status={application.status} />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông tin ứng tuyển</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Ngày ứng tuyển:</span> {formatDate(application.createdAt)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Trạng thái:</span> {
                    application.status === 'pending' ? 'Chờ xem xét' :
                    application.status === 'viewed' ? 'Đã xem' :
                    application.status === 'interview' ? 'Phỏng vấn' :
                    application.status === 'accepted' ? 'Chấp nhận' :
                    application.status === 'rejected' ? 'Từ chối' :
                    application.status
                  }
                </p>
                <div className="pt-2">
                  <a
                    href={`/api/applications/${application.id}/cv`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FiDownload className="mr-2" /> Tải CV
                  </a>
                </div>
              </div>
              
              {application.coverLetter && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Thư xin việc:</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">{application.coverLetter}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              {application.interviews && application.interviews.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Thông tin phỏng vấn</h3>
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="space-y-2">
                      <p className="flex items-center text-blue-800">
                        <FiCalendar className="mr-2" />
                        <span className="font-medium">Thời gian:</span> 
                        <span className="ml-2">{new Date(application.interviews[0].date).toLocaleString('vi-VN')}</span>
                      </p>
                      <p className="flex items-center text-blue-800">
                        <FiMapPin className="mr-2" />
                        <span className="font-medium">Địa điểm:</span> 
                        <span className="ml-2">{application.interviews[0].location}</span>
                      </p>
                      <p className="flex items-center text-blue-800">
                        {application.interviews[0].type === 'in-person' ? <FiMapPin className="mr-2" /> :
                        application.interviews[0].type === 'phone' ? <FiPhone className="mr-2" /> :
                        <FiVideo className="mr-2" />}
                        <span className="font-medium">Hình thức:</span> 
                        <span className="ml-2">
                          {application.interviews[0].type === 'in-person' ? 'Trực tiếp' :
                          application.interviews[0].type === 'phone' ? 'Điện thoại' : 'Video'}
                        </span>
                      </p>
                    </div>
                    
                    {application.interviews[0].notes && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="font-medium text-blue-800">Ghi chú:</p>
                        <p className="mt-1 text-blue-700">{application.interviews[0].notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {application.employerFeedback && (
                <div className={application.interviews && application.interviews.length > 0 ? 'mt-6' : ''}>
                  <h3 className="text-lg font-semibold mb-4">Phản hồi từ nhà tuyển dụng</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">{application.employerFeedback}</p>
                  </div>
                </div>
              )}
              
              {application.notes && application.notes.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Ghi chú</h3>
                  <div className="space-y-3">
                    {application.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(note.createdAt).toLocaleString('vi-VN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Thông tin công việc</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {application.job.company.logo && (
              <div className="w-16 h-16 mr-4 mb-4 md:mb-0">
                <img
                  src={`/uploads/logos/${application.job.company.logo}`}
                  alt={application.job.company.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            
            <div>
              <h4 className="text-lg font-medium">{application.job.title}</h4>
              <p className="text-gray-600">{application.job.company.name}</p>
              <p className="text-gray-600 mt-2">{application.job.location}</p>
              
              <div className="mt-4">
                <Link
                  to={`/jobs/${application.job.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Xem chi tiết công việc
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;