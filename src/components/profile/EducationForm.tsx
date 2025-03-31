import { useState, FormEvent } from 'react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { addEducation } from '../../services/profileService';
import { JobseekerProfile } from '../../types/user';

interface Education {
  id?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

interface EducationFormProps {
  onClose: () => void;
  onSubmit: (updatedProfile: JobseekerProfile) => void;
  initialData?: Education;
}

const EducationForm = ({ onClose, onSubmit, initialData }: EducationFormProps) => {
  const [formData, setFormData] = useState({
    school: initialData?.school || '',
    degree: initialData?.degree || '',
    fieldOfStudy: initialData?.fieldOfStudy || '',
    from: initialData?.from ? new Date(initialData.from).toISOString().split('T')[0] : '',
    to: initialData?.to ? new Date(initialData.to).toISOString().split('T')[0] : '',
    current: initialData?.current || false,
    description: initialData?.description || ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const response = await addEducation({
        school: formData.school,
        degree: formData.degree,
        fieldOfStudy: formData.fieldOfStudy,
        from: formData.from,
        to: formData.current ? undefined : formData.to,
        current: formData.current,
        description: formData.description
      });
      
      toast.success(initialData ? 'Đã cập nhật thông tin học vấn' : 'Đã thêm thông tin học vấn');
      onSubmit(response);
    } catch (error) {
      console.error('Failed to add/update education:', error);
      toast.error(initialData ? 'Không thể cập nhật thông tin học vấn' : 'Không thể thêm thông tin học vấn');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Cập nhật thông tin học vấn' : 'Thêm thông tin học vấn'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Đóng"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">
              Trường học *
            </label>
            <input
              id="school"
              name="school"
              type="text"
              value={formData.school}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tên trường học của bạn"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="degree">
              Bằng cấp *
            </label>
            <input
              id="degree"
              name="degree"
              type="text"
              value={formData.degree}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ví dụ: Cử nhân, Thạc sĩ, ..."
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fieldOfStudy">
              Chuyên ngành *
            </label>
            <input
              id="fieldOfStudy"
              name="fieldOfStudy"
              type="text"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ví dụ: Công nghệ thông tin, Kinh tế, ..."
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
              Ngày bắt đầu *
            </label>
            <input
              id="from"
              name="from"
              type="date"
              value={formData.from}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="current"
                checked={formData.current}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">Hiện đang học tại đây</span>
            </label>
          </div>
          
          {!formData.current && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
                Ngày kết thúc
              </label>
              <input
                id="to"
                name="to"
                type="date"
                value={formData.to}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              placeholder="Mô tả về quá trình học tập, thành tích, hoạt động ngoại khóa, ..."
            />
          </div>
          
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : initialData ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;