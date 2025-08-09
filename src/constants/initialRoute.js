import { lazy } from 'react'
import { AdminLayout, AuthLayout, UserLayout } from '../layouts'

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
  {
    path: '/lich-kham',
    element: lazy(() => import('../pages/User/Appointment')),
    layout: UserLayout,
  },
  {
    path: '/OTP',
    element: lazy(() => import('../pages/Auth/OTP')),
    layout: AuthLayout,
  }
]

export const privateRoutes = [
  {
    path: '/admin',
    element: lazy(() => import('../pages/Admin/Dashboard')),
    layout: AdminLayout,
  },
  {
    path: '/admin/lich-lam-viec',
    element: lazy(() => import('../pages/Admin/WorkSchedule')),
    layout: AdminLayout,
  },
  {
    path: '/admin/quan-ly-bac-si',
    element: lazy(() => import('../pages/Admin/ListDoctor')), 
    layout: AdminLayout,
  }
]
