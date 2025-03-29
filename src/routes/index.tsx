import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import privateRoutes from './privateRoutes';
import publicRoutes from './publicRoutes';

// Loading component
const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  // Kết hợp tất cả routes
  const routes = [...publicRoutes, ...privateRoutes];
  
  // Sử dụng useRoutes hook để tạo route element
  const element = useRoutes(routes);
  
  // Wrap với Suspense để xử lý lazy loading
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

export default AppRoutes;