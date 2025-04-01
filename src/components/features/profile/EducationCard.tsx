import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Education } from '../../../types/user';
import { deleteEducation } from '../../../services/profileService';

interface EducationCardProps {
  education: Education;
  onDelete: (id: string) => void;
  onEdit?: (education: Education) => void;
}

const EducationCard = ({ education, onDelete, onEdit }: EducationCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' });
  };
  
  // Handle delete education
  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thông tin học vấn này?')) {
      try {
        setIsDeleting(true);
        await deleteEducation(education.id);
        toast.success('Đã xóa thông tin học vấn');
        onDelete(education.id);
      } catch (error) {
        console.error('Failed to delete education:', error);
        toast.error('Không thể xóa thông tin học vấn');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{education.school}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <button 
              onClick={() => onEdit(education)} 
              className="text-blue-500 hover:text-blue-700"
              aria-label="Edit"
            >
              <FiEdit2 />
            </button>
          )}
          <button 
            onClick={handleDelete} 
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
            disabled={isDeleting}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      <p className="text-gray-700 font-medium">{education.degree} - {education.fieldOfStudy}</p>
      <div className="flex items-center text-gray-500 mt-1">
        <FiCalendar className="mr-1" />
        <span>
          {formatDate(education.from)} - {education.current ? 'Hiện tại' : education.to ? formatDate(education.to) : ''}
        </span>
      </div>
      {education.description && (
        <p className="mt-2 text-gray-600">{education.description}</p>
      )}
    </div>
  );
};

export default EducationCard;