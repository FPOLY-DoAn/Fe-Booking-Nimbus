import { lazy } from 'react';
import { AdminLayout, AuthLayout, UserLayout } from '../layouts';

const routes = [
  {
    path: '/',
    Component: lazy(() => import('../pages/User/HomePage')),
    Layout: UserLayout,
  },
  {
    path: '/login',
    Component: lazy(() => import('../pages/Auth/Login')),
    Layout: AuthLayout,
  },
  {
    path: '/register',
    Component: lazy(() => import('../pages/Auth/Register')),
    Layout: AuthLayout,
  },
  {
    path: '/admin',
    Component: lazy(() => import('../pages/Admin/Dashboard')),
    Layout: AdminLayout,
  },
  {
    path: '/admin/lich-lam-viec',
    Component: lazy(() => import('../pages/Admin/WorkSchedule')),
    Layout: AdminLayout,
  },
  {
    path: '/lich-kham',
    Component: lazy(() => import('../pages/User/Appointment')),
    Layout: UserLayout,
  },
];
export default routes;
