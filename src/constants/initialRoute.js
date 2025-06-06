import { lazy } from "react";
import { AdminLayout, AuthLayout, UserLayout } from "../layouts";

const routes = [
    {
        path:'/',
        Component: lazy(() => import('../pages/User/HomePage')),
        Layout: UserLayout
    },
    {
        path:'/login',
        Component: lazy(() => import('../pages/Auth/Login')),
        Layout: AuthLayout
    },
    {
        path:'/admin',
        Component: lazy(() => import('../pages/Admin/AdminPage')),
        Layout: AdminLayout
    }
]
export default routes;