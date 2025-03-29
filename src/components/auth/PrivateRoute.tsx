import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Nếu chưa đăng nhập, chuyển đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu có quy định về vai trò được phép và người dùng không có vai trò phù hợp
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Chuyển hướng đến trang không có quyền truy cập
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu đã đăng nhập và có quyền truy cập, hiển thị nội dung của route
  return <Outlet />;
};

export default PrivateRoute;