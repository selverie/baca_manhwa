import { useState, useMemo } from 'react';
import { Pagination, Spin, Empty, Alert } from 'antd';
import { PublicNavbar } from '../../components/PublicNavbar';
import { ManhwaCard } from '../../components/ManhwaCard';
import { useManhwas } from '../../hooks/useData';

const PAGE_SIZE = 12;

export function HomePage() {
  const { data: manhwas, isLoading, error } = useManhwas();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!manhwas) return [];
    const q = search.toLowerCase();
    return manhwas.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q),
    );
  }, [manhwas, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0e', fontFamily: "'Mulish', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Mulish:wght@300;400;500;600&display=swap');

        .hp-search-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
        }
        .hp-search-wrap input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 11px 16px 11px 44px;
          color: rgba(255,255,255,0.85);
          font-family: 'Mulish', sans-serif;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .hp-search-wrap input::placeholder { color: rgba(255,255,255,0.22); }
        .hp-search-wrap input:focus {
          border-color: rgba(230,57,70,0.45);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 3px rgba(230,57,70,0.08);
        }
        .hp-search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          display: flex;
        }

        .hp-hero {
          padding: 48px 0 36px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 36px;
        }
        .hp-hero-eyebrow {
          font-family: 'Mulish', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e63946;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hp-hero-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: #e63946;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .hp-hero-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 0 0 12px 0;
        }
        .hp-hero-heading span { color: #e63946; }
        .hp-hero-sub {
          font-family: 'Mulish', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          margin: 0;
          line-height: 1.6;
          max-width: 480px;
        }

        .hp-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 28px;
        }
        .hp-count {
          font-family: 'Mulish', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.25);
          white-space: nowrap;
        }

        .hp-section-label {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* Grid: selalu 6 kolom */
        .hp-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
          margin-bottom: 48px;
        }
        @media (max-width: 1100px) {
          .hp-grid { grid-template-columns: repeat(5, 1fr); }
        }
        @media (max-width: 860px) {
          .hp-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 600px) {
          .hp-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
        }

        .ant-pagination .ant-pagination-item a { color: rgba(255,255,255,0.45) !important; font-family: 'Mulish', sans-serif !important; }
        .ant-pagination .ant-pagination-item { border-color: rgba(255,255,255,0.1) !important; background: transparent !important; }
        .ant-pagination .ant-pagination-item:hover { border-color: rgba(230,57,70,0.4) !important; }
        .ant-pagination .ant-pagination-item:hover a { color: #e63946 !important; }
        .ant-pagination .ant-pagination-item-active { border-color: #e63946 !important; background: rgba(230,57,70,0.1) !important; }
        .ant-pagination .ant-pagination-item-active a { color: #e63946 !important; }
        .ant-pagination .ant-pagination-prev button,
        .ant-pagination .ant-pagination-next button { color: rgba(255,255,255,0.35) !important; }
        .ant-pagination .ant-pagination-prev:hover button,
        .ant-pagination .ant-pagination-next:hover button { color: #e63946 !important; }
      `}</style>

      <PublicNavbar />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Hero */}
        <div className="hp-hero">
          <div className="hp-hero-eyebrow">Katalog Manhwa</div>
          <h1 className="hp-hero-heading">
            Temukan <span>Manhwa</span> Favoritmu
          </h1>
          <p className="hp-hero-sub">
            Dari action penuh adrenalin hingga romance yang menyentuh hati — semua ada di sini.
          </p>
        </div>

        {/* Toolbar */}
        <div className="hp-toolbar">
          <div className="hp-search-wrap">
            <span className="hp-search-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              placeholder="Cari judul atau author.."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          {!isLoading && !error && (
            <span className="hp-count">{filtered.length} judul tersedia</span>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert
            message="Gagal memuat data manhwa"
            description="Pastikan server backend berjalan."
            type="error"
            showIcon
          />
        ) : filtered.length === 0 ? (
          <Empty description={<span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Mulish' }}>Manhwa tidak ditemukan</span>} />
        ) : (
          <>
            <div className="hp-section-label">Semua Judul</div>

            <div className="hp-grid">
              {paginated.map((m) => (
                <ManhwaCard key={m.id} manhwa={m} />
              ))}
            </div>

            {filtered.length > PAGE_SIZE && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  current={page}
                  total={filtered.length}
                  pageSize={PAGE_SIZE}
                  onChange={setPage}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}