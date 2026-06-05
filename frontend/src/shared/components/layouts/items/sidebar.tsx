import { Button, Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { PAGE_PATH } from '../../../constants';
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const fixedStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  left: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  zIndex: 20,
};

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile?: boolean;
  setIsMobile?: (isMobile: boolean) => void;
}

export function Sidebar({
  collapsed,
  onCollapse,
  isMobile,
  setIsMobile,
}: SidebarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    navigate(PAGE_PATH.LOGIN);
  }

  const items = useMemo(
    () => [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <NavLink to={PAGE_PATH.DASHBOARD}>Dashboard</NavLink>,
      },
      {
        key: 'user-management',
        icon: <UserOutlined />,
        label: <NavLink to={PAGE_PATH.USER.LIST}>Users</NavLink>,
      },
    ],
    [],
  );

  const styles = isMobile
    ? {
      ...fixedStyle,

      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }
    : fixedStyle;

  return (
    <Sider
      collapsible
      breakpoint="lg"
      collapsedWidth={collapsed ? (isMobile ? 0 : 80) : 200}
      onCollapse={(collapsed) => {
        onCollapse(collapsed);
      }}
      onBreakpoint={(broken) => {
        setIsMobile?.(broken);
      }}
      theme="dark"
      collapsed={collapsed}
      width={280}
      style={styles}
    >
      <div className="h-full flex flex-col justify-between ">
        <div>
          {collapsed ? (
            <div className="h-16 w-1" />
          ) : (
            <div className="flex items-center justify-center pt-6"></div>
          )}
          <Menu theme="dark" mode="inline" items={items} />
        </div>

        {(!isMobile || !collapsed) && (
          <div className="m-4 flex justify-between items-center bg-neutral-100 p-3">
            <div className="line-clamp-1">
              <h3 className="font-medium text-neutral-900 truncate ">
                super@admin
              </h3>
              <p className="text-sm text-neutral-500">Super Admin</p>
            </div>

            <Button
              variant="text"
              className="bg-neutral-100 border-none"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </Sider>
  );
}
