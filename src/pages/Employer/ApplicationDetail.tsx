import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { 
  fetchApplicationDetail, 
  changeApplicationStatus, 
  setInterviewSchedule, 
  addNote,
  clearErrors,
  clearMessages
} from '../../store/slices/employerApplicationsSlice';
import { downloadApplicationCV } from '../../services/applicationService';
import { toast } from 'react-toastify';
import { 
  FiArrowLeft, 
  FiDownload,  
  FiCheck, 
  FiX, 
  FiCalendar, 
  FiMapPin, 
  FiPhone, 
  FiVideo,
  FiEdit,
  FiMessageSquare,
  FiSend
} from 'react-icons/fi';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentApplication, loading, error, successMessage } = useAppSelector(state => state.employerApplications);
  
  // Local state for forms
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [statusFormData, setStatusFormData] = useState({
    status: 'pending',
    feedback: ''
  });
  const [interviewFormData, setInterviewFormData] = useState({
    date: '',
    time: '',
    location: '',
    type: 'in-person',
    notes: ''
  });
  const [noteContent, setNoteContent] = useState('');
  
  // Load application details
  useEffect(() => {
    if (id) {
      dispatch(fetchApplicationDetail(id));
    }
    
    // Clean up
    return () => {
      dispatch(clearErrors());
      dispatch(clearMessages());
    };
  }, [id, dispatch]);
  
  // Handle success/error messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
      
      // Close modals if open
      setShowStatusModal(false);
      setShowInterviewModal(false);
      setShowNoteModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [successMessage, error, dispatch]);
  
  // Initialize modals with current data when application changes
  useEffect(() => {
    if (currentApplication) {
      setStatusFormData({
        status: currentApplication.status,
        feedback: currentApplication.employerFeedback || ''
      });
    }
  }, [currentApplication]);
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format datetime
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle status form changes
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStatusFormData({
      ...statusFormData,
      [name]: value
    });
  };
  
  // Handle interview form changes
  const handleInterviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInterviewFormData({
      ...interviewFormData,
      [name]: value
    });
  };
  
  // Handle update status submit
  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    dispatch(changeApplicationStatus({
      applicationId: id,
      status: statusFormData.status as 'pending' | 'viewed' | 'interview' | 'accepted' | 'rejected',
      feedback: statusFormData.feedback || undefined
    }));
  };
  
  // Handle schedule interview submit
  const handleInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    // Combine date and time
    const dateTime = `${interviewFormData.date}T${interviewFormData.time}`;
    
    dispatch(setInterviewSchedule({
      applicationId: id,
      interviewData: {
        date: dateTime,
        location: interviewFormData.location,
        type: interviewFormData.type as 'in-person' | 'phone' | 'video',
        notes: interviewFormData.notes || undefined
      }
    }));
  };
  
  // Handle add note submit
  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !noteContent.trim()) return;
    
    dispatch(addNote({
      applicationId: id,
      content: noteContent
    }));
    
    // Clear note content
    setNoteContent('');
  };
  
  // Download CV
  const handleDownloadCV = () => {
    if (!currentApplication) return;
    
    const cvUrl = downloadApplicationCV(currentApplication.id);
    window.open(cvUrl, '_blank');
  };
  
  if (loading && !currentApplication) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!currentApplication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Không tìm thấy thông tin</h2>
          <p className="text-gray-600 mb-6">Không tìm thấy thông tin đơn ứng tuyển hoặc bạn không có quyền xem.</p>
          <button
            onClick={() => navigate('/employer/applications')}
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
          onClick={() => navigate('/employer/applications')}
          className="mr-4 text-gray-600 hover:text-gray-900"
          aria-label="Quay lại danh sách đơn ứng tuyển"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Chi tiết đơn ứng tuyển</h1>
      </div>
      
      {/* Action buttons */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowStatusModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiEdit className="mr-2" /> Cập nhật trạng thái
          </button>
          
          <button
            onClick={() => setShowInterviewModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            <FiCalendar className="mr-2" /> Lên lịch phỏng vấn
          </button>
          
          <button
            onClick={() => setShowNoteModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <FiMessageSquare className="mr-2" /> Thêm ghi chú
          </button>
          
          <button
            onClick={handleDownloadCV}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiDownload className="mr-2" /> Tải CV
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Applicant information */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Thông tin ứng viên</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-6">
              {currentApplication.user.avatar ? (
                <img 
                  className="h-16 w-16 rounded-full object-cover" 
                  src={`/uploads/avatars/${currentApplication.user.avatar}`} 
                  alt={currentApplication.user.name} 
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                  {currentApplication.user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{currentApplication.user.name}</h3>
                <p className="text-gray-600">{currentApplication.user.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-medium">Tiêu đề hồ sơ:</span> {currentApplication.profile.title}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Ngày ứng tuyển:</span> {formatDate(currentApplication.createdAt)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Trạng thái:</span>{' '}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  currentApplication.status === 'viewed' ? 'bg-blue-100 text-blue-800' :
                  currentApplication.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                  currentApplication.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentApplication.status === 'pending' ? 'Chờ xem xét' :
                   currentApplication.status === 'viewed' ? 'Đã xem' :
                   currentApplication.status === 'interview' ? 'Phỏng vấn' :
                   currentApplication.status === 'accepted' ? 'Chấp nhận' :
                   'Từ chối'}
                </span>
              </p>
            </div>
            
            {currentApplication.coverLetter && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Thư xin việc:</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 whitespace-pre-line">{currentApplication.coverLetter}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Application details */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Thông tin đơn ứng tuyển</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Thông tin công việc:</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Vị trí:</span> {currentApplication.job.title}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Công ty:</span> {currentApplication.job.company.name}
                </p>
              </div>
              
              {currentApplication.employerFeedback && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Phản hồi của bạn:</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">{currentApplication.employerFeedback}</p>
                  </div>
                </div>
              )}
              
              {currentApplication.interviews && currentApplication.interviews.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Thông tin phỏng vấn:</h3>
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="space-y-2">
                      <p className="flex items-center text-blue-800">
                        <FiCalendar className="mr-2" />
                        <span className="font-medium">Thời gian:</span> 
                        <span className="ml-2">{formatDateTime(currentApplication.interviews[0].date)}</span>
                      </p>
                      <p className="flex items-center text-blue-800">
                        <FiMapPin className="mr-2" />
                        <span className="font-medium">Địa điểm:</span> 
                        <span className="ml-2">{currentApplication.interviews[0].location}</span>
                      </p>
                      <p className="flex items-center text-blue-800">
                        {currentApplication.interviews[0].type === 'in-person' ? <FiMapPin className="mr-2" /> :
                        currentApplication.interviews[0].type === 'phone' ? <FiPhone className="mr-2" /> :
                        <FiVideo className="mr-2" />}
                        <span className="font-medium">Hình thức:</span> 
                        <span className="ml-2">
                          {currentApplication.interviews[0].type === 'in-person' ? 'Trực tiếp' :
                          currentApplication.interviews[0].type === 'phone' ? 'Điện thoại' : 'Video'}
                        </span>
                      </p>
                    </div>
                    
                    {currentApplication.interviews[0].notes && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="font-medium text-blue-800">Ghi chú:</p>
                        <p className="mt-1 text-blue-700">{currentApplication.interviews[0].notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {currentApplication.notes && currentApplication.notes.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Ghi chú của bạn:</h3>
                  <div className="space-y-3">
                    {currentApplication.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDateTime(note.createdAt)}
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
      
      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Cập nhật trạng thái</h2>
              <button 
                onClick={() => setShowStatusModal(false)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Đóng"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleStatusSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Trạng thái
                </label>
                <select
                  id="status"
                  name="status"
                  value={statusFormData.status}
                  onChange={handleStatusChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="pending">Chờ xem xét</option>
                  <option value="viewed">Đã xem</option>
                  <option value="interview">Phỏng vấn</option>
                  <option value="accepted">Chấp nhận</option>
                  <option value="rejected">Từ chối</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                  Phản hồi cho ứng viên (tùy chọn)
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={statusFormData.feedback}
                  onChange={handleStatusChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={4}
                  placeholder="Nhập phản hồi của bạn cho ứng viên..."
                />
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" color="white" /> 
                      <span className="ml-2">Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck className="mr-2" /> Cập nhật
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Interview Schedule Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Lên lịch phỏng vấn</h2>
              <button 
                onClick={() => setShowInterviewModal(false)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Đóng"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleInterviewSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  Ngày phỏng vấn
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={interviewFormData.date}
                  onChange={handleInterviewChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                  Giờ phỏng vấn
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={interviewFormData.time}
                  onChange={handleInterviewChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  Địa điểm
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={interviewFormData.location}
                  onChange={handleInterviewChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nhập địa điểm phỏng vấn"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  Hình thức
                </label>
                <select
                  id="type"
                  name="type"
                  value={interviewFormData.type}
                  onChange={handleInterviewChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="in-person">Trực tiếp</option>
                  <option value="phone">Điện thoại</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                  Ghi chú (tùy chọn)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={interviewFormData.notes}
                  onChange={handleInterviewChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  placeholder="Thông tin thêm về cuộc phỏng vấn..."
                />
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" color="white" /> 
                      <span className="ml-2">Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <FiCalendar className="mr-2" /> Lên lịch
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Thêm ghi chú</h2>
              <button 
                onClick={() => setShowNoteModal(false)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Đóng"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleNoteSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noteContent">
                  Nội dung ghi chú
                </label>
                <textarea
                  id="noteContent"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={5}
                  placeholder="Nhập ghi chú của bạn về ứng viên này..."
                  required
                />
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
                  disabled={loading || !noteContent.trim()}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" color="white" /> 
                      <span className="ml-2">Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" /> Lưu ghi chú
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;