import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">JobPortal</Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Việc làm</Link>
          <Link to="/companies" className="text-gray-700 hover:text-blue-600">Công ty</Link>
          {isAuthenticated && user?.role === 'employer' && (
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2"
              >
                <img 
                  src={user?.avatar || '/default-avatar.jpg'} 
                  alt={user?.name} 
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block">{user?.name}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hồ sơ
                  </Link>
                  
                  {user?.role === 'jobseeker' && (
                    <Link 
                      to="/applications" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Đơn ứng tuyển
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                Đăng nhập
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;