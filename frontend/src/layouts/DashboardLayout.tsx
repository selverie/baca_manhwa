import { Avatar } from 'antd';
import {
  BookOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PAGE_PATH } from '../constants';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function confirmLogout() {
    setShowLogoutModal(true);
  }

  function handleLogout() {
    setShowLogoutModal(false);
    logout();
    navigate(PAGE_PATH.HOME);
  }

  const isAdmin = user?.role === 'ADMIN';

  const editorItems = [
    { key: PAGE_PATH.DASHBOARD.EDITOR, icon: <BookOutlined />, label: 'Manhwa', to: PAGE_PATH.DASHBOARD.EDITOR },
  ];
  const adminItems = [
    { key: PAGE_PATH.DASHBOARD.ADMIN, icon: <TeamOutlined />, label: 'Users', to: PAGE_PATH.DASHBOARD.ADMIN },
    { key: PAGE_PATH.DASHBOARD.EDITOR, icon: <BookOutlined />, label: 'Manhwa', to: PAGE_PATH.DASHBOARD.EDITOR },
  ];
  const menuItems = isAdmin ? adminItems : editorItems;

  const currentLabel = menuItems.find(i => i.key === location.pathname)?.label ?? 'Dashboard';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Mulish:wght@300;400;500;600;700&display=swap');

        .dl-root {
          display: flex;
          min-height: 100vh;
          font-family: 'Mulish', sans-serif;
          background: #0a0a0c;
        }

        /* ── SIDER ── */
        .dl-sider {
          width: 240px;
          min-height: 100vh;
          background: #0d0d10;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0; top: 0; bottom: 0;
          z-index: 20;
          overflow: hidden;
          transition: width .22s cubic-bezier(.4,0,.2,1);
        }
        .dl-sider.collapsed { width: 72px; }

        /* Logo */
        .dl-logo {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          text-decoration: none;
          overflow: hidden;
        }
        .dl-logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800; font-size: 17px;
          color: #fff; letter-spacing: -0.03em;
          white-space: nowrap;
          transition: opacity .15s, transform .15s;
          position: absolute;
        }
        .dl-logo-text span { color: #e63946; }
        .dl-sider.collapsed .dl-logo-text {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.85);
        }
        .dl-logo-icon {
          width: 30px; height: 30px;
          background: #e63946;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 900; font-size: 12px; color: #fff;
          flex-shrink: 0;
          letter-spacing: -0.02em;
          opacity: 0;
          pointer-events: none;
          transition: opacity .15s, transform .15s;
          transform: scale(0.85);
          position: absolute;
        }
        .dl-sider.collapsed .dl-logo-icon {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }

        /* Nav */
        .dl-nav {
          flex: 1;
          padding: 12px 10px;
          display: flex; flex-direction: column; gap: 2px;
          overflow: hidden;
        }
        .dl-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px;
          border-radius: 9px;
          cursor: pointer;
          transition: all .18s;
          color: rgba(255,255,255,0.4);
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
          text-decoration: none;
          border: 1px solid transparent;
        }
        .dl-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
        }
        .dl-nav-item.active {
          background: rgba(230,57,70,0.13);
          color: #e63946;
          border-color: rgba(230,57,70,0.2);
        }
        .dl-nav-item .anticon { flex-shrink: 0; font-size: 15px; opacity: 0.8; }
        .dl-nav-item.active .anticon { opacity: 1; }
        .dl-nav-label {
          transition: opacity .15s;
          overflow: hidden;
        }
        .dl-sider.collapsed .dl-nav-label { opacity: 0; }

        /* User footer */
        .dl-footer {
          padding: 12px 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .dl-user-pill {
          display: flex; align-items: center; gap: 9px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 99px;
          padding: 6px 10px 6px 6px;
          transition: all .18s;
          overflow: hidden;
          white-space: nowrap;
        }
        .dl-user-pill:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
        }
        .dl-user-info {
          flex: 1; min-width: 0;
          transition: opacity .15s, width .15s;
        }
        .dl-sider.collapsed .dl-user-info { opacity: 0; width: 0; }
        .dl-user-name {
          font-size: 12px; font-weight: 700;
          color: rgba(255,255,255,0.85);
          overflow: hidden; text-overflow: ellipsis;
          line-height: 1.3;
        }
        .dl-user-role {
          font-size: 10px; color: rgba(255,255,255,0.3);
          letter-spacing: 0.06em; line-height: 1.2;
        }
        .dl-logout-btn {
          background: transparent; border: none; cursor: pointer;
          color: rgba(255,255,255,0.25);
          display: flex; align-items: center;
          padding: 4px; border-radius: 6px;
          transition: all .18s; flex-shrink: 0;
        }
        .dl-logout-btn:hover {
          color: #e63946;
          background: rgba(230,57,70,0.1);
        }
        .dl-sider.collapsed .dl-logout-btn { display: none; }
        .dl-sider.collapsed .dl-user-pill { padding: 6px; justify-content: center; }

        /* ── MAIN AREA ── */
        .dl-main {
          flex: 1;
          display: flex; flex-direction: column;
          transition: margin-left .22s cubic-bezier(.4,0,.2,1);
        }

        /* Header */
        .dl-header {
          height: 60px;
          background: rgba(10, 10, 12, 0.88);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center;
          padding: 0 20px; gap: 12px;
          flex-shrink: 0;
          position: sticky; top: 0; z-index: 10;
        }
        .dl-toggle {
          width: 34px; height: 34px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.45);
          transition: all .18s; flex-shrink: 0;
          font-size: 14px;
        }
        .dl-toggle:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-color: rgba(255,255,255,0.16);
        }
        .dl-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: rgba(255,255,255,0.28);
          font-weight: 600; letter-spacing: 0.02em;
        }
        .dl-breadcrumb-current {
          color: rgba(255,255,255,0.65);
          font-weight: 700;
        }
        .dl-header-right {
          margin-left: auto;
          display: flex; align-items: center;
        }
        .dl-home-link {
          font-family: 'Mulish', sans-serif;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          display: flex; align-items: center; gap: 5px;
          padding: 6px 14px;
          border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all .18s; letter-spacing: 0.02em;
        }
        .dl-home-link:hover {
          color: rgba(255,255,255,0.75);
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.04);
        }

        /* Content */
        .dl-content {
          flex: 1;
          background: #0a0a0c;
          padding: 28px;
          min-height: calc(100vh - 60px);
        }

        /* ── LOGOUT MODAL ── */
        .dl-modal-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: dl-fadeIn .15s ease;
        }
        @keyframes dl-fadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        .dl-modal {
          background: #141416;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 28px 28px 22px;
          width: 300px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
          animation: dl-slideUp .2s cubic-bezier(.4,0,.2,1);
        }
        @keyframes dl-slideUp {
          from { opacity: 0; transform: translateY(14px) scale(0.96) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        .dl-modal-icon {
          width: 46px; height: 46px;
          background: rgba(230,57,70,0.1);
          border: 1px solid rgba(230,57,70,0.22);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          font-size: 19px; color: #e63946;
        }
        .dl-modal-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #fff; margin-bottom: 7px; letter-spacing: -0.01em;
        }
        .dl-modal-desc {
          font-size: 12px; color: rgba(255,255,255,0.38);
          line-height: 1.65; margin-bottom: 22px;
        }
        .dl-modal-actions {
          display: flex; gap: 8px;
        }
        .dl-modal-btn {
          flex: 1; height: 38px; border-radius: 9px;
          font-family: 'Mulish', sans-serif;
          font-size: 12px; font-weight: 700;
          cursor: pointer; border: none;
          transition: all .18s; letter-spacing: 0.03em;
        }
        .dl-modal-btn.cancel {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.09);
        }
        .dl-modal-btn.cancel:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.18);
        }
        .dl-modal-btn.confirm {
          background: #e63946;
          color: #fff;
          box-shadow: 0 4px 16px rgba(230,57,70,0.3);
        }
        .dl-modal-btn.confirm:hover {
          background: #c1121f;
          box-shadow: 0 4px 20px rgba(230,57,70,0.45);
        }
        .dl-modal-btn.confirm:active {
          transform: scale(0.97);
        }
      `}</style>

      <div className="dl-root">
        {/* Sider */}
        <aside className={`dl-sider${collapsed ? ' collapsed' : ''}`}>

          {/* Logo */}
          <NavLink to={PAGE_PATH.HOME} className="dl-logo">
            <div className="dl-logo-icon">BM</div>
            <div className="dl-logo-text">BACA<span>MANHWA</span></div>
          </NavLink>

          {/* Nav items */}
          <nav className="dl-nav">
            {menuItems.map(item => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) => `dl-nav-item${isActive ? ' active' : ''}`}
              >
                {item.icon}
                <span className="dl-nav-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User footer */}
          <div className="dl-footer">
            <div className="dl-user-pill">
              <Avatar
                size={28}
                icon={<UserOutlined />}
                style={{ background: '#e63946', flexShrink: 0, fontSize: 12 }}
              />
              <div className="dl-user-info">
                <div className="dl-user-name">{user?.name}</div>
                <div className="dl-user-role">{user?.role}</div>
              </div>
              <button className="dl-logout-btn" onClick={confirmLogout} title="Logout">
                <LogoutOutlined style={{ fontSize: 13 }} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="dl-main" style={{ marginLeft: collapsed ? 72 : 240 }}>

          {/* Header */}
          <header className="dl-header">
            <button className="dl-toggle" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>

            <div className="dl-breadcrumb">
              Dashboard
              <span style={{ opacity: 0.4 }}>/</span>
              <span className="dl-breadcrumb-current">{currentLabel}</span>
            </div>

            <div className="dl-header-right">
              <NavLink to={PAGE_PATH.HOME} className="dl-home-link">
                ← Kembali ke Home
              </NavLink>
            </div>
          </header>

          {/* Content */}
          <main className="dl-content">
            <Outlet />
          </main>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="dl-modal-overlay" onClick={() => setShowLogoutModal(false)}>
            <div className="dl-modal" onClick={e => e.stopPropagation()}>
              <div className="dl-modal-icon">
                <LogoutOutlined />
              </div>
              <div className="dl-modal-title">Keluar dari akun?</div>
              <div className="dl-modal-desc">
                Kamu akan keluar dari sesi ini. Pastikan semua perubahan sudah tersimpan sebelum melanjutkan.
              </div>
              <div className="dl-modal-actions">
                <button
                  className="dl-modal-btn cancel"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Batal
                </button>
                <button
                  className="dl-modal-btn confirm"
                  onClick={handleLogout}
                >
                  Ya, Keluar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}