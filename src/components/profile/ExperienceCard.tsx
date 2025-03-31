import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCalendar, FiMapPin } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Experience } from '../../types/user';
import { deleteExperience } from '../../services/profileService';

interface ExperienceCardProps {
  experience: Experience;
  onDelete: (id: string) => void;
  onEdit?: (experience: Experience) => void;
}

const ExperienceCard = ({ experience, onDelete, onEdit }: ExperienceCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' });
  };
  
  // Handle delete experience
  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kinh nghiệm làm việc này?')) {
      try {
        setIsDeleting(true);
        await deleteExperience(experience.id);
        toast.success('Đã xóa kinh nghiệm làm việc');
        onDelete(experience.id);
      } catch (error) {
        console.error('Failed to delete experience:', error);
        toast.error('Không thể xóa kinh nghiệm làm việc');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{experience.position}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <button 
              onClick={() => onEdit(experience)} 
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
      <p className="text-gray-700 font-medium">{experience.company}</p>
      {experience.location && (
        <div className="flex items-center text-gray-600 mt-1">
          <FiMapPin className="mr-1" />
          <span>{experience.location}</span>
        </div>
      )}
      <div className="flex items-center text-gray-500 mt-1">
        <FiCalendar className="mr-1" />
        <span>
          {formatDate(experience.from)} - {experience.current ? 'Hiện tại' : experience.to ? formatDate(experience.to) : ''}
        </span>
      </div>
      {experience.description && (
        <p className="mt-2 text-gray-600">{experience.description}</p>
      )}
    </div>
  );
};

export default ExperienceCard;