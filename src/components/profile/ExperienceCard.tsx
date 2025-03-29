import { FiEdit2, FiTrash2, FiCalendar, FiMapPin } from 'react-icons/fi';
import { Experience } from '../../types/user';

interface ExperienceCardProps {
  experience: Experience;
  onDelete: () => void;
  onEdit?: () => void;
}

const ExperienceCard = ({ experience, onDelete, onEdit }: ExperienceCardProps) => {
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' });
  };
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{experience.position}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <button 
              onClick={onEdit} 
              className="text-blue-500 hover:text-blue-700"
              aria-label="Edit"
            >
              <FiEdit2 />
            </button>
          )}
          <button 
            onClick={onDelete} 
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
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