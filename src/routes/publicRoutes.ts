import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import React from 'react'; // Thêm dòng này

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));

// Public routes (không cần xác thực)
const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Home)
  },
  {
    path: '/about',
    element: React.createElement(About)
  },
  // Thêm các routes công khai khác
];

export default publicRoutes;