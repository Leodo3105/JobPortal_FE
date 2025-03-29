import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FiMenu, FiX, FiBell } from 'react-icons/fi';
import ProfileDropdown from '../ui/ProfileDropdown';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Menu dựa theo vai trò
  const renderRoleBasedLinks = () => {
    if (!isAuthenticated || !user) return null;
    
    switch (user.role) {
      case 'jobseeker':
        return (
          <>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Tìm việc làm
            </Link>
            <Link to="/jobseeker/applications" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Đơn ứng tuyển
            </Link>
            <Link to="/jobseeker/saved-jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Việc đã lưu
            </Link>
          </>
        );
      case 'employer':
        return (
          <>
            <Link to="/employer/jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Quản lý tin tuyển dụng
            </Link>
            <Link to="/employer/post-job" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Đăng tuyển
            </Link>
            <Link to="/employer/applications" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Quản lý ứng viên
            </Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo và navigation chính */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-2xl">JobPortal</span>
            </Link>
            
            {/* Menu desktop */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Trang chủ
              </Link>
              
              <Link to="/companies" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Công ty
              </Link>
              
              {renderRoleBasedLinks()}
            </div>
          </div>
          
          {/* Buttons và profile dropdown */}
          <div className="flex items-center">
            {isAuthenticated && user ? (
              <div className="flex items-center ml-4 md:ml-6">
                {/* Notification button */}
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Xem thông báo</span>
                  <FiBell className="h-6 w-6" />
                </button>
                
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <ProfileDropdown user={user} />
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Đăng ký
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">{mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}</span>
                {mobileMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
            {isAuthenticated && user ? (
              <div className="flex items-center px-4 mb-3">
                {user.avatar ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={`/uploads/avatars/${user.avatar}`}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
            ) : null}
            
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Trang chủ
              </Link>
              <Link
                to="/companies"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Công ty
              </Link>
              
              {/* Conditional links based on auth status */}
              {isAuthenticated && user ? (
                <>
                  {/* Role-based links */}
                  {user.role === 'jobseeker' && (
                    <>
                      <Link
                        to="/jobs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Tìm việc làm
                      </Link>
                      <Link
                        to="/jobseeker/applications"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Đơn ứng tuyển
                      </Link>
                      <Link
                        to="/jobseeker/saved-jobs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Việc đã lưu
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'employer' && (
                    <>
                      <Link
                        to="/employer/jobs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Quản lý tin tuyển dụng
                      </Link>
                      <Link
                        to="/employer/post-job"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Đăng tuyển
                      </Link>
                      <Link
                        to="/employer/applications"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Quản lý ứng viên
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  {/* Profile link - điều hướng tùy theo vai trò */}
                  <Link
                    to={user.role === 'employer' ? '/employer/company-profile' : '/jobseeker/profile'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    {user.role === 'employer' ? 'Hồ sơ công ty' : 'Hồ sơ cá nhân'}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      // Sử dụng hàm logout 
                      // (cần cập nhật để xử lý logout như trong ProfileDropdown)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;