import { Link, useNavigate } from 'react-router';
import { Avatar, Dropdown } from 'antd';
import {
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { PAGE_PATH } from '../constants';

export function PublicNavbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate(PAGE_PATH.HOME);
  }

  const authenticatedMenuItems = [
    ...(user?.role === 'EDITOR' || user?.role === 'ADMIN'
      ? [
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: (
              <Link
                to={
                  user.role === 'ADMIN'
                    ? PAGE_PATH.DASHBOARD.ADMIN
                    : PAGE_PATH.DASHBOARD.EDITOR
                }
              >
                Dashboard
              </Link>
            ),
          },
        ]
      : []),
    {
      key: 'bookmarks',
      icon: <BookOutlined />,
      label: <Link to={PAGE_PATH.BOOKMARKS}>My Bookmarks</Link>,
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  const guestMenuItems = [
    {
      key: 'login',
      icon: <LoginOutlined />,
      label: 'Login',
      onClick: () => navigate(PAGE_PATH.LOGIN),
    },
    {
      key: 'register',
      icon: <UserAddOutlined />,
      label: 'Register',
      onClick: () => navigate(PAGE_PATH.REGISTER),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Mulish:wght@300;400;500;600&display=swap');

        .pnav-root {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'Mulish', sans-serif;
        }

        .pnav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .pnav-logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 2px;
          letter-spacing: -0.03em;
        }
        .pnav-logo-white {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          line-height: 1;
        }
        .pnav-logo-red {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #e63946;
          line-height: 1;
        }

        /* Right area */
        .pnav-right {
          display: flex;
          align-items: center;
        }

        /* Avatar trigger — shared untuk guest & user */
        .pnav-avatar-trigger {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 99px;
          padding: 5px 14px 5px 6px;
          transition: all 0.18s ease;
          outline: none;
        }
        .pnav-avatar-trigger:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
        }

        /* Guest trigger — hanya icon, tanpa nama */
        .pnav-guest-trigger {
          display: flex;
          align-items: center;
          cursor: pointer;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 99px;
          padding: 5px;
          transition: all 0.18s ease;
          outline: none;
        }
        .pnav-guest-trigger:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.18);
        }

        .pnav-user-name {
          font-family: 'Mulish', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.01em;
        }
        .pnav-chevron {
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
        }

        /* Dropdown override */
        .pnav-dropdown .ant-dropdown-menu {
          background: #16161a !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 10px !important;
          padding: 6px !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6) !important;
          min-width: 160px !important;
        }
        .pnav-dropdown .ant-dropdown-menu-item {
          border-radius: 6px !important;
          padding: 9px 12px !important;
          color: rgba(255,255,255,0.65) !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          transition: all 0.15s !important;
        }
        .pnav-dropdown .ant-dropdown-menu-item:hover {
          background: rgba(255,255,255,0.07) !important;
          color: #fff !important;
        }
        .pnav-dropdown .ant-dropdown-menu-item-danger {
          color: rgba(230,57,70,0.75) !important;
        }
        .pnav-dropdown .ant-dropdown-menu-item-danger:hover {
          background: rgba(230,57,70,0.1) !important;
          color: #e63946 !important;
        }
        .pnav-dropdown .ant-dropdown-menu-item .anticon {
          font-size: 14px !important;
          opacity: 0.7;
        }
        .pnav-dropdown .ant-dropdown-menu-item a {
          color: inherit !important;
          text-decoration: none !important;
        }
        .pnav-dropdown .ant-dropdown-menu-item-divider {
          background: rgba(255,255,255,0.07) !important;
          margin: 4px 0 !important;
        }

        /* Label khusus Register di guest dropdown */
        .pnav-register-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .pnav-register-badge {
          font-size: 10px;
          font-weight: 700;
          background: #e63946;
          color: #fff;
          border-radius: 4px;
          padding: 2px 6px;
          letter-spacing: 0.04em;
        }
      `}</style>

      <nav className="pnav-root">
        <div className="pnav-inner">

          {/* Logo */}
          <Link to={PAGE_PATH.HOME} className="pnav-logo">
            <span className="pnav-logo-white">BACA</span>
            <span className="pnav-logo-red">MANHWA</span>
          </Link>

          {/* Right */}
          <div className="pnav-right">
            {isAuthenticated && user ? (
              /* Authenticated — tampilkan nama + avatar */
              <Dropdown
                menu={{ items: authenticatedMenuItems }}
                placement="bottomRight"
                overlayClassName="pnav-dropdown"
                trigger={['click']}
              >
                <button className="pnav-avatar-trigger">
                  <Avatar
                    size={26}
                    icon={<UserOutlined />}
                    style={{ background: '#e63946', flexShrink: 0, fontSize: 13 }}
                  />
                  <span className="pnav-user-name">{user.name}</span>
                  <span className="pnav-chevron">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </Dropdown>
            ) : (
              /* Guest — hanya icon profil, klik dropdown Login & Register */
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'login',
                      icon: <LoginOutlined />,
                      label: 'Login',
                      onClick: () => navigate(PAGE_PATH.LOGIN),
                    },
                    {
                      key: 'register',
                      icon: <UserAddOutlined />,
                      label: (
                        <span className="pnav-register-label">
                          Register
                          <span className="pnav-register-badge">FREE</span>
                        </span>
                      ),
                      onClick: () => navigate(PAGE_PATH.REGISTER),
                    },
                  ],
                }}
                placement="bottomRight"
                overlayClassName="pnav-dropdown"
                trigger={['click']}
              >
                <button className="pnav-guest-trigger">
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 14,
                    }}
                  />
                </button>
              </Dropdown>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}