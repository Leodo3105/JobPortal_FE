import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import privateRoutes from './privateRoutes';
import publicRoutes from './publicRoutes';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageLayout from '../components/layout/PageLayout';

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

const AppRoutes = () => {
  // Tạo cấu trúc routes
  const routeConfig = [
    {
      element: <PageLayout />,
      children: [...publicRoutes, ...privateRoutes]
    }
  ];
  
  // Sử dụng useRoutes hook để tạo route element
  const element = useRoutes(routeConfig);
  
  // Wrap với Suspense để xử lý lazy loading
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

export default AppRoutes;