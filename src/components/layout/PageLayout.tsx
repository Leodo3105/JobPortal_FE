import { Outlet } from 'react-router-dom';
import MainLayout from './MainLayout';

const PageLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PageLayout;