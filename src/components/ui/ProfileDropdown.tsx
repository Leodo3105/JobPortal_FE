import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FiUser, FiBriefcase, FiSettings, FiLogOut } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface ProfileDropdownProps {
  user: User;
}

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Xử lý click bên ngoài dropdown để đóng menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsOpen(false);
  };
  
  // Xác định đường dẫn profile dựa theo vai trò
  const getProfileUrl = () => {
    switch (user.role) {
      case 'employer':
        return '/employer/company-profile';
      case 'jobseeker':
        return '/jobseeker/profile';
      case 'admin':
        return '/admin/profile';
      default:
        return '/profile';
    }
  };
  
  // Xác định đường dẫn dashboard dựa theo vai trò
  const getDashboardUrl = () => {
    switch (user.role) {
      case 'jobseeker':
        return '/jobseeker/dashboard';
      case 'employer':
        return '/employer/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span className="sr-only">Mở menu người dùng</span>
        {user.avatar ? (
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={`/uploads/avatars/${user.avatar}`}
            alt={user.name}
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
            <div className="font-medium truncate">{user.name}</div>
            <div className="text-gray-500 truncate">{user.email}</div>
          </div>
          
          <Link
            to={getDashboardUrl()}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <FiBriefcase className="mr-2" /> Dashboard
          </Link>
          
          <Link
            to={getProfileUrl()}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <FiUser className="mr-2" /> 
            {user.role === 'employer' ? 'Hồ sơ công ty' : 'Hồ sơ cá nhân'}
          </Link>
          
          <Link
            to="/settings"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <FiSettings className="mr-2" /> Cài đặt
          </Link>
          
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <FiLogOut className="mr-2" /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;