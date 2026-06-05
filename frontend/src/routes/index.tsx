import { Routes as RRoutes, Route, Navigate } from 'react-router';
import { HomePage } from '../pages/public/HomePage';
import { ManhwaDetailPage } from '../pages/public/ManhwaDetailPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { BookmarksPage } from '../pages/bookmarks/BookmarksPage';
import { EditorDashboardPage } from '../pages/dashboard/EditorDashboardPage';
import { AdminDashboardPage } from '../pages/dashboard/AdminDashboardPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PAGE_PATH } from '../constants';

export function Routes() {
  return (
    <RRoutes>
      {/* Public */}
      <Route path={PAGE_PATH.HOME} element={<HomePage />} />
      <Route path="/manhwa/:id" element={<ManhwaDetailPage />} />
      <Route path={PAGE_PATH.LOGIN} element={<LoginPage />} />
      <Route path={PAGE_PATH.REGISTER} element={<RegisterPage />} />

      {/* User protected */}
      <Route
        path={PAGE_PATH.BOOKMARKS}
        element={
          <ProtectedRoute roles={['USER', 'EDITOR', 'ADMIN']}>
            <BookmarksPage />
          </ProtectedRoute>
        }
      />

      {/* Dashboard */}
      <Route
        element={
          <ProtectedRoute roles={['EDITOR', 'ADMIN']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path={PAGE_PATH.DASHBOARD.EDITOR} element={<EditorDashboardPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path={PAGE_PATH.DASHBOARD.ADMIN} element={<AdminDashboardPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={PAGE_PATH.HOME} replace />} />
    </RRoutes>
  );
}
