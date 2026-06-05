import { useState } from 'react';
import { Table, Modal, Form, Input, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useManhwas } from '../../hooks/useData';
import { manhwaService } from '../../services';
import type { Manhwa, CreateManhwaDto } from '../../types';

export function EditorDashboardPage() {
  const { data: manhwas, isLoading, mutate } = useManhwas();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingManhwa, setEditingManhwa] = useState<Manhwa | null>(null);
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setEditingManhwa(null);
    form.resetFields();
    setModalOpen(true);
  }

  function openEdit(manhwa: Manhwa) {
    setEditingManhwa(manhwa);
    form.setFieldsValue(manhwa);
    setModalOpen(true);
  }

  async function handleSave(values: CreateManhwaDto) {
    setSaving(true);
    try {
      if (editingManhwa) {
        await manhwaService.update(editingManhwa.id, values);
        message.success('Manhwa diperbarui');
      } else {
        await manhwaService.create(values);
        message.success('Manhwa ditambahkan');
      }
      mutate();
      setModalOpen(false);
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await manhwaService.delete(id);
      message.success('Manhwa dihapus');
      mutate();
    } catch {
      message.error('Gagal menghapus');
    }
  }

  const columns: ColumnsType<Manhwa> = [
    {
      title: 'COVER',
      key: 'cover',
      width: 72,
      render: (_, record) =>
        record.coverImage ? (
          <img
            src={record.coverImage}
            alt={record.title}
            style={{ width: 40, height: 56, objectFit: 'cover', borderRadius: 6, display: 'block' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div style={{
            width: 40, height: 56, background: 'rgba(255,255,255,0.05)',
            borderRadius: 6, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 10,
            color: 'rgba(255,255,255,0.2)', fontFamily: 'Mulish, sans-serif',
          }}>N/A</div>
        ),
    },
    {
      title: 'JUDUL',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <span style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14 }}>
          {text}
        </span>
      ),
    },
    {
      title: 'AUTHOR',
      dataIndex: 'author',
      key: 'author',
      render: (text) => (
        <span style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Mulish, sans-serif', fontSize: 13 }}>
          {text || '—'}
        </span>
      ),
    },
    {
      title: 'ACTION',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => openEdit(record)}
            style={{
              width: 32, height: 32, borderRadius: 7,
              background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)',
              color: '#60a5fa', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(96,165,250,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(96,165,250,0.08)')}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 9.5L4.5 7L10.5 1L12 2.5L6 8.5L2 10.5L2 9.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </button>
          <Popconfirm
            title="Hapus manhwa ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <button
              style={{
                width: 32, height: 32, borderRadius: 7,
                background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.2)',
                color: '#e63946', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(230,57,70,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(230,57,70,0.08)')}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 3.5H11M5 3.5V2.5H8V3.5M4.5 3.5V10.5H8.5V3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ fontFamily: "'Mulish', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Mulish:wght@300;400;500;600;700&display=swap');

        /* Stat card */
        .ed-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 20px 24px;
          display: inline-flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
          min-width: 220px;
        }
        .ed-stat-icon {
          width: 44px; height: 44px;
          background: rgba(230,57,70,0.1);
          border: 1px solid rgba(230,57,70,0.2);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #e63946; flex-shrink: 0;
        }
        .ed-stat-label {
          font-family: 'Mulish', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); margin-bottom: 6px;
        }
        .ed-stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 32px; font-weight: 700;
          line-height: 1; letter-spacing: -0.03em;
          color: #fff;
        }

        /* Table */
        .ed-table-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; overflow: hidden;
        }
        .ed-table-header {
          padding: 18px 24px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .ed-table-title {
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* Add button */
        .ed-btn-add {
          font-family: 'Mulish', sans-serif;
          font-size: 13px; font-weight: 700;
          color: #fff; background: #e63946;
          border: 1px solid #e63946; border-radius: 8px;
          padding: 7px 16px; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: all 0.15s; line-height: 1;
        }
        .ed-btn-add:hover { background: #c1121f; border-color: #c1121f; }
        .ed-btn-add:active { transform: scale(0.97); }

        /* Ant Table overrides */
        .ed-table-wrap .ant-table { background: transparent !important; font-family: 'Mulish', sans-serif !important; }
        .ed-table-wrap .ant-table-thead > tr > th {
          background: rgba(255,255,255,0.025) !important;
          border-bottom: 1px solid rgba(255,255,255,0.07) !important;
          color: rgba(255,255,255,0.28) !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 11px !important; font-weight: 700 !important;
          letter-spacing: 0.12em !important; text-transform: uppercase !important;
          padding: 12px 24px !important;
        }
        .ed-table-wrap .ant-table-thead > tr > th::before { display: none !important; }
        .ed-table-wrap .ant-table-tbody > tr > td {
          background: transparent !important;
          border-bottom: 1px solid rgba(255,255,255,0.045) !important;
          padding: 12px 24px !important; transition: background 0.15s !important;
        }
        .ed-table-wrap .ant-table-tbody > tr:hover > td { background: rgba(255,255,255,0.03) !important; }
        .ed-table-wrap .ant-table-tbody > tr:last-child > td { border-bottom: none !important; }
        .ed-table-wrap .ant-pagination {
          padding: 14px 24px !important; margin: 0 !important;
          border-top: 1px solid rgba(255,255,255,0.06) !important;
        }
        .ed-table-wrap .ant-pagination .ant-pagination-item a { color: rgba(255,255,255,0.4) !important; font-family: 'Mulish', sans-serif !important; }
        .ed-table-wrap .ant-pagination .ant-pagination-item { background: transparent !important; border-color: rgba(255,255,255,0.1) !important; }
        .ed-table-wrap .ant-pagination .ant-pagination-item-active { border-color: #e63946 !important; background: rgba(230,57,70,0.1) !important; }
        .ed-table-wrap .ant-pagination .ant-pagination-item-active a { color: #e63946 !important; }
        .ed-table-wrap .ant-spin-dot-item { background: #e63946 !important; }

        /* Modal overrides */
        .ed-modal .ant-modal-content {
          background: #13131a !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 14px !important;
          padding: 28px !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.7) !important;
        }
        .ed-modal .ant-modal-header { background: transparent !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; padding: 0 0 18px !important; margin-bottom: 22px !important; }
        .ed-modal .ant-modal-title { font-family: 'Outfit', sans-serif !important; font-size: 16px !important; font-weight: 700 !important; color: #fff !important; }
        .ed-modal .ant-modal-close { color: rgba(255,255,255,0.3) !important; }
        .ed-modal .ant-modal-close:hover { color: rgba(255,255,255,0.7) !important; }
        .ed-modal .ant-form-item-label > label { color: rgba(255,255,255,0.5) !important; font-family: 'Mulish', sans-serif !important; font-size: 12px !important; font-weight: 600 !important; letter-spacing: 0.06em !important; text-transform: uppercase !important; }
        .ed-modal .ant-input, .ed-modal .ant-input-textarea textarea {
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
          color: rgba(255,255,255,0.85) !important;
          font-family: 'Mulish', sans-serif !important; font-size: 14px !important;
        }
        .ed-modal .ant-input:focus, .ed-modal .ant-input-textarea textarea:focus {
          border-color: rgba(230,57,70,0.45) !important;
          box-shadow: 0 0 0 3px rgba(230,57,70,0.08) !important;
        }
        .ed-modal .ant-input::placeholder, .ed-modal .ant-input-textarea textarea::placeholder {
          color: rgba(255,255,255,0.18) !important;
        }

        /* Modal buttons */
        .ed-btn-cancel {
          font-family: 'Mulish', sans-serif; font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.45); background: transparent;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
          padding: 8px 18px; cursor: pointer; transition: all 0.15s; line-height: 1;
        }
        .ed-btn-cancel:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.7); }
        .ed-btn-save {
          font-family: 'Mulish', sans-serif; font-size: 13px; font-weight: 700;
          color: #fff; background: #e63946;
          border: 1px solid #e63946; border-radius: 8px;
          padding: 8px 22px; cursor: pointer; transition: all 0.15s; line-height: 1;
        }
        .ed-btn-save:hover { background: #c1121f; border-color: #c1121f; }
        .ed-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ display: 'block', width: 3, height: 20, background: '#e63946', borderRadius: 2, flexShrink: 0 }} />
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              Editor Dashboard
            </h1>
          </div>
          <p style={{ fontFamily: 'Mulish, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.28)', margin: '0 0 0 13px', fontWeight: 400 }}>
            Kelola koleksi manhwa
          </p>
        </div>
        <button className="ed-btn-add" onClick={openCreate}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1.5V11.5M1.5 6.5H11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Tambah Manhwa
        </button>
      </div>

      {/* Stat card */}
      <div className="ed-stat-card">
        <div className="ed-stat-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="4" y="2" width="9" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M7 6H10M7 9H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M8 15l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="ed-stat-label">Total Manhwa</div>
          <div className="ed-stat-value">{manhwas?.length ?? 0}</div>
        </div>
      </div>

      {/* Table */}
      <div className="ed-table-wrap">
        <div className="ed-table-header">
          <span className="ed-table-title">Daftar Manhwa</span>
          <span style={{ fontFamily: 'Mulish, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            {manhwas?.length ?? 0} judul
          </span>
        </div>
        <Table
          dataSource={manhwas}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Modal */}
      <Modal
        title={editingManhwa ? 'Edit Manhwa' : 'Tambah Manhwa'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        className="ed-modal"
        width={480}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 4 }}>
          <Form.Item name="title" label="Judul" rules={[{ required: true, message: 'Judul wajib diisi' }]}>
            <Input placeholder="Masukkan judul manhwa..." />
          </Form.Item>
          <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Author wajib diisi' }]}>
            <Input placeholder="Nama author..." />
          </Form.Item>
          <Form.Item name="synopsis" label="Sinopsis">
            <Input.TextArea rows={3} placeholder="Sinopsis singkat..." />
          </Form.Item>
          <Form.Item name="coverImage" label="URL Cover Image">
            <Input placeholder="https://..." />
          </Form.Item>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" className="ed-btn-cancel" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button type="submit" className="ed-btn-save" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}