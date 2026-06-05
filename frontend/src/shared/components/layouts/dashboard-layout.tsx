import { Navbar } from './items/navbar';
import { useEffect, useState } from 'react';
import { Loading } from '../ui';
import { cn } from '../../utils';
import { Layout } from 'antd';
import { Sidebar } from './items/sidebar';
import { Outlet } from 'react-router';

const { Content } = Layout;

export function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  async function init() {}

  useEffect(() => {
    init();
  }, []);

  if (false) {
    return <Loading />;
  }

  return (
    <Layout className="min-h-screen ">
      <Sidebar
        collapsed={collapsed}
        onCollapse={(collapsed: boolean) => setCollapsed(collapsed)}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />
      <Layout
        className={cn(
          'ml-0 lg:ml-[280px] px-0 p-4',
          collapsed && 'lg:ml-[80px]',
        )}
      >
        <Navbar
          collapsed={collapsed}
          onCollapse={(collapsed: boolean) => setCollapsed(collapsed)}
        />
        <Content className="mt-0 mx-4 mb-0">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
