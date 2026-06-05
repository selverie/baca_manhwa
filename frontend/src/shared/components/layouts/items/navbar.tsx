import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';

interface NavbarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function Navbar({ collapsed, onCollapse }: NavbarProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      style={{ background: colorBgContainer }}
      className="flex  items-center justify-between mx-4  gap-3 sticky top-0 z-[10] h-[44px] lg:h-[80px] p-0 mb-4"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => onCollapse(!collapsed)}
        style={{
          fontSize: '16px',
          width: 44,
          height: 44,
        }}
      />
    </Layout.Header>
  );
}
