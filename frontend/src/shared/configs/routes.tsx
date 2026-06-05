import { Routes as RRoutes, Route } from 'react-router';
import { PAGE_PATH } from '../constants';
import { LoginPage } from '../../auth/pages';
import { DashboardPage } from '../../dashboard/pages';
import { DashboardLayout } from '../components/layouts';
import { CreateOrUpdateUserPage, UsersPage } from '../../user-management/pages';

export function Routes() {
  return (
    <RRoutes>
      <Route path={PAGE_PATH.LOGIN} element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
        <Route path={PAGE_PATH.DASHBOARD} element={<DashboardPage />} />

        {/* Users Management */}
        <Route path={PAGE_PATH.USER.LIST} element={<UsersPage />} />
        <Route
          path={PAGE_PATH.USER.CREATE_USER}
          element={<CreateOrUpdateUserPage />}
        />
        <Route
          path={PAGE_PATH.USER.LIST + '/:id'}
          element={<CreateOrUpdateUserPage />}
        />
      </Route>
    </RRoutes>
  );
}
