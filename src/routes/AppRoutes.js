import { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { publicRoutes, privateRoutes } from './routes';
import ProtectedRoute from '../components/ProtectedRoute';
import { AdminLayout } from '../layouts';

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
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
