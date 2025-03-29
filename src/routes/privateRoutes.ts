import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import React from 'react'; // Thêm dòng này

// Lazy load components
const Dashboard = lazy(() => import('../pages/Dashboard'));

// Protected routes (require authentication)
const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: React.createElement(Dashboard)
  },
  // Thêm các routes khác cần xác thực
];

export default privateRoutes;