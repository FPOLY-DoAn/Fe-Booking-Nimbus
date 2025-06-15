import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  // TODO: Replace this with your actual authentication check
  // const isAuthenticated = localStorage.getItem('token');
  // const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
