import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children?: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
