import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import { Education } from '../../types/user';

interface EducationCardProps {
  education: Education;
  onDelete: () => void;
  onEdit?: () => void;
}

const EducationCard = ({ education, onDelete, onEdit }: EducationCardProps) => {
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' });
  };
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{education.school}</h3>
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