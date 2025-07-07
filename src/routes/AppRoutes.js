import { Suspense } from 'react'
import { Routes, Route } from 'react-router'
import ProtectedRoute from '../components/ProtectedRoute'
import { AdminLayout } from '../layouts'
import { publicRoutes, privateRoutes } from '../constants/initialRoute'
import NotFound from '../components/NotFound'

const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element: Element, layout: Layout }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout>
                <Element />
              </Layout>
            }
          />
        ))}

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {privateRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Route>
        </Route>

        {/* Catch all route - 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
