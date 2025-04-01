import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiBookmark, FiClock, FiMapPin, FiBriefcase, FiTrash2 } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchSavedJobs, removeSavedJob } from '../../store/slices/savedJobsSlice';

const SavedJobs = () => {
  const dispatch = useAppDispatch();
  const { savedJobs, loading } = useAppSelector(state => state.savedJobs);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  useEffect(() => {
    dispatch(fetchSavedJobs());
  }, [dispatch]);
  
  const handleUnsave = async (jobId: string, savedJobId: string) => {
    try {
      setDeleting(savedJobId);
      await dispatch(removeSavedJob({ jobId, savedJobId })).unwrap();
      toast.success('Đã xóa khỏi danh sách đã lưu');
    } catch (error) {
      console.error('Failed to unsave job:', error);
      toast.error('Không thể xóa khỏi danh sách đã lưu');
    } finally {
      setDeleting(null);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <div className="flex items-center mb-6">
        <FiBookmark className="text-blue-500 mr-2" size={24} />
        <h1 className="text-2xl font-bold">Việc làm đã lưu</h1>
      </div>
      
      {savedJobs.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b px-6 py-4">
            <p className="text-gray-600">Bạn đã lưu {savedJobs.length} việc làm</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {savedJobs.map((savedJob) => (
              <div key={savedJob.id} className="p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div className="flex-1">
                    <Link 
                      to={`/jobs/${savedJob.job.id}`}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {savedJob.job.title}
                    </Link>
                    
                    <p className="text-gray-600 mt-1">
                      {savedJob.job.company.name}
                    </p>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="inline-flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-1" />
                        {savedJob.job.location}
                      </div>
                      
                      <div className="inline-flex items-center text-sm text-gray-500">
                        <FiBriefcase className="mr-1" />
                        {savedJob.job.jobType === 'full-time' ? 'Toàn thời gian' :
                          savedJob.job.jobType === 'part-time' ? 'Bán thời gian' :
                          savedJob.job.jobType === 'contract' ? 'Hợp đồng' :
                          savedJob.job.jobType === 'freelance' ? 'Freelance' :
                          savedJob.job.jobType === 'internship' ? 'Thực tập' :
                          savedJob.job.jobType}
                      </div>
                      
                      <div className="inline-flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1" />
                        Hạn nộp: {formatDate(savedJob.job.applicationDeadline)}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link 
                        to={`/jobs/${savedJob.job.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <button
                      onClick={() => handleUnsave(savedJob.job.id, savedJob.id)}
                      disabled={deleting === savedJob.id}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      aria-label="Xóa khỏi danh sách đã lưu"
                    >
                      {deleting === savedJob.id ? (
                        <div className="h-5 w-5 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
                      ) : (
                        <FiTrash2 className="text-red-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <FiBookmark className="text-blue-500" size={48} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Bạn chưa lưu việc làm nào</h2>
          <p className="text-gray-600 mb-6">
            Lưu các việc làm yêu thích để xem lại sau và ứng tuyển khi bạn đã sẵn sàng.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Tìm việc làm ngay
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;