import { Spin, Empty, message, Alert } from 'antd';
import { DeleteOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { PublicNavbar } from '../../components/PublicNavbar';
import { useBookmarks } from '../../hooks/useData';
import { bookmarkService, manhwaService } from '../../services';
import { useAuth } from '../../hooks/useAuth';
import { PAGE_PATH } from '../../constants';
import { useState, useEffect } from 'react';
import type { Manhwa } from '../../types';

export function BookmarksPage() {
  const { isAuthenticated } = useAuth();
  const { data: bookmarks, isLoading, error, mutate } = useBookmarks(isAuthenticated);
  const [manhwas, setManhwas] = useState<Record<string, Manhwa>>({});
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    if (!bookmarks?.length) return;
    const ids = bookmarks.map((b) => b.manhwaId);
    Promise.all(ids.map((id) => manhwaService.getById(id).then((r) => r.data as Manhwa))).then(
      (results) => {
        const map: Record<string, Manhwa> = {};
        results.forEach((m) => { map[m.id] = m; });
        setManhwas(map);
      },
    );
  }, [bookmarks]);

  async function handleRemove(bookmarkId: string) {
    setRemoving(bookmarkId);
    try {
      await bookmarkService.delete(bookmarkId);
      message.success('Bookmark dihapus');
      mutate();
    } catch {
      message.error('Gagal menghapus');
    } finally {
      setRemoving(null);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0e', fontFamily: "'Mulish', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Mulish:wght@300;400;500;600&display=swap');

        /* ── Hero ── */
        .bm-hero {
          padding: 48px 0 36px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 36px;
        }
        .bm-eyebrow {
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
        .bm-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: #e63946;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .bm-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 0 0 12px 0;
        }
        .bm-heading span { color: #e63946; }
        .bm-sub {
          font-family: 'Mulish', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }

        /* ── Section label ── */
        .bm-section-label {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .bm-count {
          font-family: 'Mulish', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.2);
          letter-spacing: normal;
          text-transform: none;
        }

        /* ── Grid ── */
        .bm-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }
        @media (max-width: 1100px) { .bm-grid { grid-template-columns: repeat(5, 1fr); } }
        @media (max-width: 860px)  { .bm-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 600px)  { .bm-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; } }

        /* ── Card ── */
        .bm-card-link {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
          outline: none;
        }
        .bm-card {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          background: #111113;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.25s cubic-bezier(0.25,1,0.5,1);
        }
        .bm-card:hover { transform: translateY(-5px); }
        .bm-card:hover .bm-cover { filter: brightness(0.55); transform: scale(1.05); }
        .bm-card:hover .bm-hover-layer { opacity: 1; }

        .bm-cover-wrap {
          aspect-ratio: 2/3;
          overflow: hidden;
          background: #18181c;
          position: relative;
          flex-shrink: 0;
        }
        .bm-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: filter 0.3s ease, transform 0.4s cubic-bezier(0.25,1,0.5,1);
        }
        .bm-hover-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 12px;
          background: linear-gradient(to top, rgba(12,12,14,0.95) 0%, rgba(12,12,14,0.3) 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
          gap: 6px;
        }
        .bm-detail-btn {
          width: 100%;
          padding: 7px 0;
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          display: block;
          transition: background 0.15s;
          box-sizing: border-box;
        }
        .bm-detail-btn:hover { background: rgba(255,255,255,0.18); }

        /* ── Card body ── */
        .bm-body {
          padding: 10px 10px 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .bm-title {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.88);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
          min-height: calc(13px * 1.4 * 2);
        }
        .bm-author {
          font-family: 'Mulish', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.28);
          margin: 0 0 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* ── Delete button ── */
        .bm-delete-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 0;
          background: transparent;
          border: 1px solid rgba(230,57,70,0.25);
          border-radius: 4px;
          color: rgba(230,57,70,0.6);
          font-family: 'Mulish', sans-serif;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .bm-delete-btn:hover {
          background: rgba(230,57,70,0.1);
          border-color: rgba(230,57,70,0.5);
          color: #e63946;
        }
        .bm-delete-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── No cover placeholder ── */
        .bm-no-cover {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #18181c 0%, #1f1f24 100%);
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.15);
          text-align: center;
          padding: 12px;
          box-sizing: border-box;
        }
      `}</style>

      <PublicNavbar />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>

        {/* Hero */}
        <div className="bm-hero">
          <div className="bm-eyebrow">Koleksi Saya</div>
          <h1 className="bm-heading">
            My <span>Bookmarks</span>
          </h1>
          <p className="bm-sub">Manhwa yang kamu simpan untuk dibaca nanti.</p>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert message="Gagal memuat bookmark" type="error" showIcon />
        ) : !bookmarks?.length ? (
          <Empty
            image={<BookOutlined style={{ fontSize: 48, color: 'rgba(255,255,255,0.1)' }} />}
            description={
              <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Mulish', fontSize: 14 }}>
                Belum ada bookmark — tambahkan dari halaman detail manhwa
              </span>
            }
          />
        ) : (
          <>
            <div className="bm-section-label">
              <span>Tersimpan</span>
              <span className="bm-count">{bookmarks.length} judul</span>
            </div>

            <div className="bm-grid">
              {bookmarks.map((b) => {
                const m = manhwas[b.manhwaId];
                return (
                  <div key={b.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="bm-card">
                      {/* Cover */}
                      <div className="bm-cover-wrap">
                        {m?.coverImage ? (
                          <img
                            src={m.coverImage}
                            alt={m.title}
                            className="bm-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                `https://placehold.co/300x450/111113/2a2a2e?text=Cover`;
                            }}
                          />
                        ) : (
                          <div className="bm-no-cover">{m?.title || '...'}</div>
                        )}
                        {/* Hover overlay with detail button */}
                        <div className="bm-hover-layer">
                          <Link to={PAGE_PATH.MANHWA_DETAIL(b.manhwaId)} className="bm-detail-btn">
                            Lihat Detail
                          </Link>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="bm-body">
                        <div>
                          <p className="bm-title">{m?.title || '...'}</p>
                          <p className="bm-author">
                            <UserOutlined style={{ fontSize: 10 }} />
                            {m?.author || '—'}
                          </p>
                        </div>
                        <button
                          className="bm-delete-btn"
                          disabled={removing === b.id}
                          onClick={() => handleRemove(b.id)}
                        >
                          <DeleteOutlined style={{ fontSize: 11 }} />
                          {removing === b.id ? 'Menghapus...' : 'Hapus'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}