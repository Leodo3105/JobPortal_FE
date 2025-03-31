import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import React from 'react';
import PrivateRoute from '../components/auth/PrivateRoute';

// Lazy load components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const JobseekerDashboard = lazy(() => import('../pages/Jobseeker/Dashboard'));
const MyApplications = lazy(() => import('../pages/Jobseeker/MyApplications')); 
const ApplicationDetail = lazy(() => import('../pages/Jobseeker/ApplicationDetail'));
const SavedJobs = lazy(() => import('../pages/Jobseeker/SavedJobs'));
const EmployerDashboard = lazy(() => import('../pages/Employer/Dashboard'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const JobseekerProfile = lazy(() => import('../pages/Jobseeker/Profile'));
const CompanyProfile = lazy(() => import('../pages/Employer/CompanyProfile'));
const CompanyPreview = lazy(() => import('../pages/Employer/CompanyPreview'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));
const RoleBasedProfileRedirect = lazy(() => import('../components/auth/RoleBasedProfileRedirect'));

// Layouts
const DashboardLayout = lazy(() => import('../components/layout/DashboardLayout'));

// Private routes (yêu cầu xác thực)
const privateRoutes: RouteObject[] = [
  {
    element: React.createElement(PrivateRoute, null),
    children: [
      {
        path: '/dashboard',
        element: React.createElement(Dashboard, null)
      },
      // Chuyển hướng /profile dựa trên vai trò
      {
        path: '/profile',
        element: React.createElement(RoleBasedProfileRedirect, null)
      },
      // Routes cho người tìm việc
      {
        element: React.createElement(PrivateRoute, { allowedRoles: ['jobseeker'] }),
        children: [
          {
            path: '/jobseeker/profile',
            element: React.createElement(JobseekerProfile, null)
          },
          {
            element: React.createElement(DashboardLayout, null),
            children: [
              {
                path: '/jobseeker/dashboard',
                element: React.createElement(JobseekerDashboard, null)
              },
              {
                path: '/jobseeker/applications',
                element: React.createElement(MyApplications, null)
              },
              {
                path: '/jobseeker/applications/:id',
                element: React.createElement(ApplicationDetail, null)
              },
              {
                path: '/jobseeker/saved-jobs',
                element: React.createElement(SavedJobs, null)
              }
            ]
          }
        ]
      },
      // Routes cho nhà tuyển dụng
      {
        element: React.createElement(PrivateRoute, { allowedRoles: ['employer'] }),
        children: [
          {
            path: '/employer/company-profile',
            element: React.createElement(CompanyProfile, null)
          },
          {
            path: '/employer/company-preview',
            element: React.createElement(CompanyPreview, null)
          },
          {
            element: React.createElement(DashboardLayout, null),
            children: [
              {
                path: '/employer/dashboard',
                element: React.createElement(EmployerDashboard, null)
              }
              // Thêm các route khác cho employer
            ]
          }
        ]
      },
      // Admin routes với dashboard layout
      {
        element: React.createElement(PrivateRoute, { allowedRoles: ['admin'] }),
        children: [
          {
            element: React.createElement(DashboardLayout, null),
            children: [
              {
                path: '/admin/dashboard',
                element: React.createElement(AdminDashboard, null)
              }
              // Thêm các route khác cho admin
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/unauthorized',
    element: React.createElement(Unauthorized, null)
  }
];

export default privateRoutes;