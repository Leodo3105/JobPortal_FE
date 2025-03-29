import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import React from 'react'; // Thêm dòng này

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'));
const NotFound = lazy(() => import('../pages/NotFound'));

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
  {
    path: '/login',
    element: React.createElement(Login)
  },
  {
    path: '/register',
    element: React.createElement(Register)
  },
  {
    path: '/forgot-password',
    element: React.createElement(ForgotPassword)
  },
  {
    path: '/reset-password',
    element: React.createElement(ResetPassword)
  },
  {
    path: '*',
    element: React.createElement(NotFound)
  }
  // Thêm các routes công khai khác
];

export default publicRoutes;