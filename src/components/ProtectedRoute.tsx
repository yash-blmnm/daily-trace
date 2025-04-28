import { ReactNode, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { JournalContextProvider } from '../context/JournalContext';

interface ProtectedRouteProps {
  children?: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Logged in, show the protected page
  return <JournalContextProvider>{children || <Outlet />}</JournalContextProvider>;
}

export default ProtectedRoute;
