import { useState } from 'react';
import { Table, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useUsers } from '../../hooks/useData';
import { userService } from '../../services';
import type { User, UserRole } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const ROLE_CONFIG: Record<UserRole, { color: string; bg: string; label: string }> = {
  USER:   { color: 'rgba(255,255,255,0.55)', bg: 'rgba(255,255,255,0.07)', label: 'USER' },
  EDITOR: { color: '#60a5fa',               bg: 'rgba(96,165,250,0.1)',    label: 'EDITOR' },
  ADMIN:  { color: '#e63946',               bg: 'rgba(230,57,70,0.1)',     label: 'ADMIN' },
};

export function AdminDashboardPage() {
  const { user: currentUser } = useAuth();
  const { data: users, isLoading, mutate } = useUsers(currentUser?.role === 'ADMIN');
  const [updating, setUpdating] = useState<string | null>(null);

  const stats = {
    total:  users?.length ?? 0,
    admin:  users?.filter((u) => u.role === 'ADMIN').length ?? 0,
    editor: users?.filter((u) => u.role === 'EDITOR').length ?? 0,
    user:   users?.filter((u) => u.role === 'USER').length ?? 0,
  };

  async function handleRoleChange(userId: string, role: string) {
    setUpdating(userId);
    try {
      await userService.updateRole(userId, role);
      message.success('Role diperbarui');
      mutate();
    } catch {
      message.error('Gagal memperbarui role');
    } finally {
      setUpdating(null);
    }
  }

  const columns: ColumnsType<User> = [
    {
      title: 'NAMA',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <span style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14 }}>
          {text}
        </span>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Mulish, sans-serif', fontSize: 13 }}>
          {text}
        </span>
      ),
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => {
        const cfg = ROLE_CONFIG[role];
        return (
          <span style={{
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: 5,
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'Mulish, sans-serif',
            letterSpacing: '0.1em',
            color: cfg.color,
            background: cfg.bg,
            border: `1px solid ${cfg.color}22`,
          }}>
            {cfg.label}
          </span>
        );
      },
    },
    {
      title: 'ACTION',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Select
          value={record.role}
          loading={updating === record.id}
          onChange={(val) => handleRoleChange(record.id, val)}
          options={[
            { value: 'USER',   label: 'USER' },
            { value: 'EDITOR', label: 'EDITOR' },
            { value: 'ADMIN',  label: 'ADMIN' },
          ]}
          style={{ width: 120 }}
          size="small"
          className="adm-role-select"
        />
      ),
    },
  ];

  const statCards = [
    {
      label: 'Total Users',
      value: stats.total,
      color: 'rgba(255,255,255,0.85)',
      iconColor: 'rgba(255,255,255,0.3)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M1 15c0-3.314 2.686-5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M9.5 15c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: 'Admin',
      value: stats.admin,
      color: '#e63946',
      iconColor: '#e63946',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2L10.8 6.5H15.5L11.7 9.3L13.2 14L9 11.2L4.8 14L6.3 9.3L2.5 6.5H7.2L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'Editor',
      value: stats.editor,
      color: '#60a5fa',
      iconColor: '#60a5fa',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 13.5L5.5 11L13.5 3L15 4.5L7 12.5L3 14.5L3 13.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'User',
      value: stats.user,
      color: 'rgba(255,255,255,0.55)',
      iconColor: 'rgba(255,255,255,0.3)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M2 16c0-3.866 3.134-6 7-6s7 2.134 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ fontFamily: "'Mulish', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Mulish:wght@300;400;500;600;700&display=swap');

        /* Stat cards */
        .adm-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        @media (max-width: 900px) { .adm-stat-grid { grid-template-columns: repeat(2, 1fr); } }

        .adm-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 20px 22px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          transition: border-color 0.2s, background 0.2s;
        }
        .adm-stat-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
        }
        .adm-stat-label {
          font-family: 'Mulish', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 10px;
        }
        .adm-stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .adm-stat-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Table */
        .adm-table-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
        }
        .adm-table-header {
          padding: 18px 24px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .adm-table-title {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .adm-table-count {
          font-family: 'Mulish', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
        }

        /* Ant Table overrides */
        .adm-table-wrap .ant-table {
          background: transparent !important;
          font-family: 'Mulish', sans-serif !important;
        }
        .adm-table-wrap .ant-table-thead > tr > th {
          background: rgba(255,255,255,0.025) !important;
          border-bottom: 1px solid rgba(255,255,255,0.07) !important;
          color: rgba(255,255,255,0.28) !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          padding: 12px 24px !important;
        }
        .adm-table-wrap .ant-table-thead > tr > th::before { display: none !important; }
        .adm-table-wrap .ant-table-tbody > tr > td {
          background: transparent !important;
          border-bottom: 1px solid rgba(255,255,255,0.045) !important;
          padding: 14px 24px !important;
          transition: background 0.15s !important;
        }
        .adm-table-wrap .ant-table-tbody > tr:hover > td {
          background: rgba(255,255,255,0.03) !important;
        }
        .adm-table-wrap .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }
        .adm-table-wrap .ant-pagination {
          padding: 14px 24px !important;
          margin: 0 !important;
          border-top: 1px solid rgba(255,255,255,0.06) !important;
        }
        .adm-table-wrap .ant-pagination .ant-pagination-item a {
          color: rgba(255,255,255,0.4) !important;
          font-family: 'Mulish', sans-serif !important;
        }
        .adm-table-wrap .ant-pagination .ant-pagination-item {
          background: transparent !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
        .adm-table-wrap .ant-pagination .ant-pagination-item-active {
          border-color: #e63946 !important;
          background: rgba(230,57,70,0.1) !important;
        }
        .adm-table-wrap .ant-pagination .ant-pagination-item-active a { color: #e63946 !important; }
        .adm-table-wrap .ant-spin-dot-item { background: #e63946 !important; }

        /* Role select */
        .adm-role-select .ant-select-selector {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.1) !important;
          border-radius: 6px !important;
          color: rgba(255,255,255,0.7) !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 12px !important;
          font-weight: 600 !important;
        }
        .adm-role-select:hover .ant-select-selector {
          border-color: rgba(255,255,255,0.25) !important;
        }
        .adm-role-select .ant-select-arrow { color: rgba(255,255,255,0.25) !important; }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 6,
        }}>
          <span style={{
            display: 'block',
            width: 3,
            height: 20,
            background: '#e63946',
            borderRadius: 2,
            flexShrink: 0,
          }} />
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            Admin Dashboard
          </h1>
        </div>
        <p style={{
          fontFamily: 'Mulish, sans-serif',
          fontSize: 13,
          color: 'rgba(255,255,255,0.28)',
          margin: '0 0 0 13px',
          fontWeight: 400,
        }}>
          Kelola pengguna dan role
        </p>
      </div>

      {/* Stat cards */}
      <div className="adm-stat-grid">
        {statCards.map((s) => (
          <div className="adm-stat-card" key={s.label}>
            <div>
              <div className="adm-stat-label">{s.label}</div>
              <div className="adm-stat-value" style={{ color: s.color }}>{s.value}</div>
            </div>
            <div className="adm-stat-icon" style={{ color: s.iconColor }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="adm-table-wrap">
        <div className="adm-table-header">
          <span className="adm-table-title">Daftar Pengguna</span>
          <span className="adm-table-count">{stats.total} total</span>
        </div>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}