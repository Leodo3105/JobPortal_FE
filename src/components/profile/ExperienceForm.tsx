import { useState, FormEvent } from 'react';
import { FiX } from 'react-icons/fi';
import { addExperience } from '../../services/profileService';
import { toast } from 'react-toastify';

interface ExperienceFormProps {
  onClose: () => void;
  onSubmit: () => void;
  initialData?: {
    id?: string;
    company: string;
    position: string;
    location?: string;
    from: string;
    to?: string;
    current: boolean;
    description?: string;
  };
}

const ExperienceForm = ({ onClose, onSubmit, initialData }: ExperienceFormProps) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || '',
    position: initialData?.position || '',
    location: initialData?.location || '',
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
      
      await addExperience({
        company: formData.company,
        position: formData.position,
        location: formData.location,
        from: formData.from,
        to: formData.current ? undefined : formData.to,
        current: formData.current,
        description: formData.description
      });
      
      toast.success('Đã thêm kinh nghiệm làm việc');
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Failed to add experience:', error);
      toast.error('Không thể thêm kinh nghiệm làm việc');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Cập nhật kinh nghiệm làm việc' : 'Thêm kinh nghiệm làm việc'}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
              Công ty *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tên công ty"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
              Vị trí *
            </label>
            <input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ví dụ: Frontend Developer, Product Manager, ..."
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
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ví dụ: Hà Nội, Remote, ..."
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
              <span className="text-gray-700">Hiện đang làm việc tại đây</span>
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
              Mô tả công việc
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              placeholder="Mô tả về trách nhiệm, thành tích và các dự án đã tham gia, ..."
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

export default ExperienceForm;