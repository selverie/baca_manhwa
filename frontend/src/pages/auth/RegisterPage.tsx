import { Form, Input, Button, Alert } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services';
import { PAGE_PATH } from '../../constants';
import { useState } from 'react';

export function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(values: {
    name: string;
    email: string;
    password: string;
  }) {
    setLoading(true);
    setError('');
    try {
      const res = await authService.register(values);
      const data = res.data;
      login(data.user, data.accessToken);
      navigate(PAGE_PATH.HOME);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registrasi gagal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .reg-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .reg-card {
          display: flex;
          width: 100%;
          max-width: 860px;
          min-height: 560px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.06);
        }

        /* ── LEFT PANEL ── */
        .reg-left {
          flex: 1;
          background: #141414;
          padding: 48px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .reg-brand {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 24px;
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }

        .reg-brand:hover { color: #e63946; }
        .reg-brand span { color: #e63946; }

        .reg-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
          line-height: 1.2;
        }

        .reg-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
        }

        /* Ant Design dark overrides */
        .reg-left .ant-form-item-label > label {
          font-size: 11px !important;
          font-weight: 600 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          color: rgba(255,255,255,0.4) !important;
        }

        .reg-left .ant-form-item-label > label.ant-form-item-required::before {
          color: #e63946 !important;
        }

        .reg-left .ant-form-item {
          margin-bottom: 16px !important;
        }

        .reg-left .ant-input,
        .reg-left .ant-input-affix-wrapper {
          background: #1e1e1e !important;
          border: 1.5px solid rgba(255,255,255,0.08) !important;
          border-radius: 10px !important;
          color: #fff !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }

        .reg-left .ant-input-affix-wrapper .ant-input {
          background: transparent !important;
          border: none !important;
        }

        .reg-left .ant-input:focus,
        .reg-left .ant-input-affix-wrapper:focus,
        .reg-left .ant-input-affix-wrapper-focused {
          border-color: #e63946 !important;
          box-shadow: 0 0 0 3px rgba(230,57,70,0.12) !important;
        }

        .reg-left .ant-input::placeholder,
        .reg-left .ant-input-password input::placeholder {
          color: rgba(255,255,255,0.2) !important;
        }

        .reg-left .ant-input-suffix svg {
          color: rgba(255,255,255,0.3) !important;
        }

        .reg-btn {
          width: 100%;
          height: 48px !important;
          border-radius: 10px !important;
          background: #e63946 !important;
          border-color: #e63946 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          letter-spacing: 0.04em;
          margin-top: 4px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s !important;
        }

        .reg-btn:hover {
          background: #c1121f !important;
          border-color: #c1121f !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(230,57,70,0.35) !important;
        }

        .reg-footer {
          text-align: center;
          margin-top: 18px;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }

        .reg-footer a {
          color: #e63946;
          font-weight: 600;
          text-decoration: none;
        }

        .reg-footer a:hover { text-decoration: underline; }

        /* ── RIGHT PANEL ── */
        .reg-right {
          width: 360px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .reg-right-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .reg-right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.05) 50%,
            rgba(0,0,0,0.55) 100%
          );
        }

        .reg-right-caption {
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-style: italic;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.08em;
          padding: 0 20px;
        }

        /* Responsive */
        @media (max-width: 680px) {
          .reg-right { display: none; }
          .reg-left { padding: 40px 28px; }
        }
      `}</style>

      <div className="reg-root">
        <div className="reg-card">

          {/* ── LEFT: Form ── */}
          <div className="reg-left">
            <Link to={PAGE_PATH.HOME} className="reg-brand">
              BACA<span>MANHWA</span>
            </Link>

            <h1 className="reg-heading">Buat Akun Baru</h1>
            <p className="reg-sub">Daftar dan mulai membaca manhwa favoritmu</p>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="mb-4"
                closable
                onClose={() => setError('')}
              />
            )}

            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                label="Nama"
                rules={[{ required: true, message: 'Nama diperlukan' }]}
              >
                <Input placeholder="Nama lengkap" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Email valid diperlukan' }]}
              >
                <Input placeholder="email@example.com" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, min: 6, message: 'Min 6 karakter' }]}
              >
                <Input.Password placeholder="••••••••" size="large" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="reg-btn"
              >
                Daftar
              </Button>
            </Form>

            <p className="reg-footer">
              Sudah punya akun?{' '}
              <Link to={PAGE_PATH.LOGIN}>Login sekarang</Link>
            </p>
          </div>

          {/* ── RIGHT: Image ── */}
          {/*
            Gunakan gambar yang sama dengan LoginPage:
              frontend/public/images/login-illustration.jpg
            Atau bisa pakai gambar berbeda:
              frontend/public/images/register-illustration.jpg
          */}
          <div className="reg-right">
            <img
              src="/images/register.jpg"
              alt="Register illustration"
              className="reg-right-img"
            />
            <div className="reg-right-overlay" />
            <p className="reg-right-caption">Mulai petualangan manhwa-mu</p>
          </div>

        </div>
      </div>
    </>
  );
}