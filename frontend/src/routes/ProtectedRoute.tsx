import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';
import type { ReactNode } from 'react';
import { PAGE_PATH } from '../constants';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PAGE_PATH.LOGIN} replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={PAGE_PATH.HOME} replace />;
  }

  return <>{children}</>;
}
