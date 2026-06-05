import { Form, Input, Button, Alert } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services';
import { PAGE_PATH } from '../../constants';
import { useState } from 'react';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(values: { email: string; password: string }) {
    setLoading(true);
    setError('');
    try {
      const res = await authService.login(values);
      const data = res.data;
      login(data.user, data.accessToken);

      const role = data.user.role;
      if (role === 'ADMIN') navigate(PAGE_PATH.DASHBOARD.ADMIN);
      else if (role === 'EDITOR') navigate(PAGE_PATH.DASHBOARD.EDITOR);
      else navigate(PAGE_PATH.HOME);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Login gagal. Periksa email dan password.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .login-card {
          display: flex;
          width: 100%;
          max-width: 860px;
          min-height: 500px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.06);
        }

        /* ── LEFT PANEL ── */
        .login-left {
          flex: 1;
          background: #141414;
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-brand {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 28px;
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }

        .login-brand:hover {
          color: #e63946;
        }

        .login-brand span {
          color: #e63946;
        }

        .login-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
          line-height: 1.2;
        }

        .login-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 36px;
        }

        /* Ant Design dark overrides */
        .login-left .ant-form-item-label > label {
          font-size: 11px !important;
          font-weight: 600 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          color: rgba(255,255,255,0.4) !important;
        }

        .login-left .ant-form-item-label > label.ant-form-item-required::before {
          color: #e63946 !important;
        }

        .login-left .ant-input,
        .login-left .ant-input-affix-wrapper {
          background: #1e1e1e !important;
          border: 1.5px solid rgba(255,255,255,0.08) !important;
          border-radius: 10px !important;
          color: #fff !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }

        .login-left .ant-input-affix-wrapper .ant-input {
          background: transparent !important;
          border: none !important;
        }

        .login-left .ant-input:focus,
        .login-left .ant-input-affix-wrapper:focus,
        .login-left .ant-input-affix-wrapper-focused {
          border-color: #e63946 !important;
          box-shadow: 0 0 0 3px rgba(230,57,70,0.12) !important;
        }

        .login-left .ant-input::placeholder,
        .login-left .ant-input-password input::placeholder {
          color: rgba(255,255,255,0.2) !important;
        }

        .login-left .ant-input-suffix svg {
          color: rgba(255,255,255,0.3) !important;
        }

        .login-btn {
          width: 100%;
          height: 48px !important;
          border-radius: 10px !important;
          background: #e63946 !important;
          border-color: #e63946 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          letter-spacing: 0.04em;
          margin-top: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s !important;
        }

        .login-btn:hover {
          background: #c1121f !important;
          border-color: #c1121f !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(230,57,70,0.35) !important;
        }

        .login-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }

        .login-footer a {
          color: #e63946;
          font-weight: 600;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        /* ── RIGHT PANEL ── */
        .login-right {
          width: 360px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .login-right-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Dark overlay gradient on image */
        .login-right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.05) 50%,
            rgba(0,0,0,0.55) 100%
          );
        }

        .login-right-caption {
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-style: italic;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.08em;
          padding: 0 20px;
        }

        /* Responsive */
        @media (max-width: 680px) {
          .login-right { display: none; }
          .login-left { padding: 40px 28px; }
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          {/* ── LEFT: Form ── */}
          <div className="login-left">
            <Link to={PAGE_PATH.HOME} className="login-brand">
              BACA<span>MANHWA</span>
            </Link>

            <h1 className="login-heading">Selamat Datang!</h1>
            <p className="login-sub">Masuk ke akun untuk melanjutkan membaca</p>

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
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Email valid diperlukan' }]}
              >
                <Input placeholder="email@example.com" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Password diperlukan' }]}
              >
                <Input.Password placeholder="••••••••" size="large" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login-btn"
              >
                Masuk
              </Button>
            </Form>

            <p className="login-footer">
              Belum punya akun?{' '}
              <Link to={PAGE_PATH.REGISTER}>Daftar sekarang</Link>
            </p>
          </div>

          {/* ── RIGHT: Image ── */}
          {/*
            Letakkan gambar dari Pinterest di:
              frontend/public/images/login-illustration.jpg
            Gambar akan bisa diakses via path: /images/login-illustration.jpg
          */}
          <div className="login-right">
            <img
              src="/images/login.jpg"
              alt="Login illustration"
              className="login-right-img"
            />
            <div className="login-right-overlay" />
            <p className="login-right-caption">Temukan dunia manhwa-mu</p>
          </div>

        </div>
      </div>
    </>
  );
}