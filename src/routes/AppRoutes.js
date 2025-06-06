import { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import routes from '../constants/initialRoute';

const renderRoutes = () =>
  routes.map(({ path, Component, Layout }) => (
    <Route
      key={path}
      path={path}
      element={
        <Layout>
          <Component />
        </Layout>
      }
    />
  ));

const AppRoutes = () => {
  return (
    <Suspense fallback={'Loading......'}>
      <Routes>{renderRoutes()}</Routes>
    </Suspense>
  );
};

export default AppRoutes;
