import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

const RoleBasedProfileRedirect = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user.role) {
    case 'employer':
      return <Navigate to="/employer/company-profile" replace />;
    case 'jobseeker':
      return <Navigate to="/jobseeker/profile" replace />;
    case 'admin':
      return <Navigate to="/admin/profile" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RoleBasedProfileRedirect;