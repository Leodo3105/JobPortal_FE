import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  FiHome, FiBriefcase, FiUser, FiBookmark, 
  FiFileText, FiUsers, FiSettings, FiPieChart 
} from 'react-icons/fi';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  
  // Sidebar links dựa theo vai trò
  const sidebarLinks = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'jobseeker':
        return [
          { path: '/jobseeker/dashboard', name: 'Dashboard', icon: <FiHome /> },
          { path: '/jobseeker/applications', name: 'Đơn ứng tuyển', icon: <FiFileText /> },
          { path: '/jobseeker/saved-jobs', name: 'Việc đã lưu', icon: <FiBookmark /> },
          { path: '/profile', name: 'Hồ sơ cá nhân', icon: <FiUser /> },
        ];
      case 'employer':
        return [
          { path: '/employer/dashboard', name: 'Dashboard', icon: <FiHome /> },
          { path: '/employer/jobs', name: 'Tin tuyển dụng', icon: <FiBriefcase /> },
          { path: '/employer/applications', name: 'Quản lý ứng viên', icon: <FiUsers /> },
          { path: '/employer/company-profile', name: 'Hồ sơ công ty', icon: <FiUser /> },
          { path: '/employer/settings', name: 'Cài đặt', icon: <FiSettings /> },
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', name: 'Dashboard', icon: <FiHome /> },
          { path: '/admin/users', name: 'Quản lý người dùng', icon: <FiUsers /> },
          { path: '/admin/jobs', name: 'Quản lý việc làm', icon: <FiBriefcase /> },
          { path: '/admin/companies', name: 'Quản lý công ty', icon: <FiBriefcase /> },
          { path: '/admin/categories', name: 'Quản lý danh mục', icon: <FiPieChart /> },
          { path: '/admin/settings', name: 'Cài đặt hệ thống', icon: <FiSettings /> },
        ];
      default:
        return [];
    }
  };
  
  const links = sidebarLinks();
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/" className="text-blue-600 font-bold text-xl">JobPortal</Link>
            </div>
            <div className="mt-5 flex-1 px-2 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <span className="mr-3 h-5 w-5">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                {user?.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={`/uploads/avatars/${user.avatar}`}
                    alt={user?.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    {user?.role === 'jobseeker' ? 'Người tìm việc' : user?.role === 'employer' ? 'Nhà tuyển dụng' : 'Quản trị viên'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;