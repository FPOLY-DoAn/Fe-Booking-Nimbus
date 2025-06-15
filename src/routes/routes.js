import { lazy } from 'react';
import { AdminLayout, AuthLayout, UserLayout } from '../layouts';

export const publicRoutes = [
  {
    path: '/',
    element: lazy(() => import('../pages/User/HomePage')),
    layout: UserLayout,
  },
  {
    path: '/login',
    element: lazy(() => import('../pages/Auth/Login')),
    layout: AuthLayout,
  },
  {
    path: '/register',
    element: lazy(() => import('../pages/Auth/Register')),
    layout: AuthLayout,
  },
];

export const privateRoutes = [
  {
    path: '/admin',
    element: lazy(() => import('../pages/Admin/Dashboard')),
    layout: AdminLayout,
  },
  {
    path: '/admin/orders',
    element: lazy(() => import('../pages/Admin/LichLamViec')),
    layout: AdminLayout,
  },
];
