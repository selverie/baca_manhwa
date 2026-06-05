import { useParams, useNavigate } from 'react-router';
import { Button, Spin, Alert, message } from 'antd';
import {
  ArrowLeftOutlined,
  BookOutlined,
  UserOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { PublicNavbar } from '../../components/PublicNavbar';
import { useManhwa, useBookmarks } from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import { bookmarkService } from '../../services';
import { PAGE_PATH } from '../../constants';
import { useState } from 'react';

// Dummy chapters 1–100
const DUMMY_CHAPTERS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  label: `Chapter ${i + 1}`,
})).reverse(); // newest first

const CHAPTERS_PER_PAGE = 50;

export function ManhwaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data: manhwa, isLoading, error } = useManhwa(id!);
  const { data: bookmarks, mutate: mutateBookmarks } = useBookmarks(isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [chapterPage, setChapterPage] = useState(0);

  const bookmarked = bookmarks?.find((b) => b.manhwaId === id);

  const visibleChapters = DUMMY_CHAPTERS.slice(
    chapterPage * CHAPTERS_PER_PAGE,
    chapterPage * CHAPTERS_PER_PAGE + CHAPTERS_PER_PAGE,
  );
  const totalChapterPages = Math.ceil(DUMMY_CHAPTERS.length / CHAPTERS_PER_PAGE);

  async function handleBookmark() {
    setLoading(true);
    try {
      if (bookmarked) {
        await bookmarkService.delete(bookmarked.id);
        message.success('Bookmark dihapus');
      } else {
        await bookmarkService.create(id!);
        message.success('Ditambahkan ke bookmark');
      }
      mutateBookmarks();
    } catch {
      message.error('Gagal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0e', fontFamily: "'Mulish', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Mulish:wght@300;400;500;600&display=swap');

        /* ── Back button ── */
        .dp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 9px 16px;
          color: rgba(255,255,255,0.5);
          font-family: 'Mulish', sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          margin-bottom: 32px;
        }
        .dp-back-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.07);
        }

        /* ── Hero section ── */
        .dp-hero {
          display: flex;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 40px;
        }
        @media (max-width: 700px) {
          .dp-hero { flex-direction: column; align-items: center; }
        }

        /* ── Cover ── */
        .dp-cover-wrap {
          flex-shrink: 0;
          position: relative;
          width: 200px;
          height: 267px;
          border-radius: 10px;
          overflow: hidden;
          background: #1a1a1a;
        }
        .dp-cover-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dp-cover-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.15);
          font-size: 13px;
        }
        .dp-cover-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(230,57,70,0.9);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 7px;
          border-radius: 4px;
        }
        .dp-cover-shadow {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.7);
          pointer-events: none;
        }

        /* ── Info panel ── */
        .dp-info { flex: 1; min-width: 0; }

        .dp-eyebrow {
          font-family: 'Mulish', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e63946;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .dp-eyebrow::before {
          content: '';
          display: block;
          width: 20px;
          height: 2px;
          background: #e63946;
          border-radius: 2px;
        }

        .dp-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 12px 0;
        }

        .dp-author {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          margin-bottom: 24px;
        }

        .dp-synopsis-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 10px;
        }
        .dp-synopsis-text {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          line-height: 1.75;
          margin-bottom: 28px;
          font-weight: 300;
        }

        /* ── Bookmark button ── */
        .dp-bm-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 12px 24px;
          border-radius: 8px;
          font-family: 'Mulish', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s, transform 0.15s;
        }
        .dp-bm-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .dp-bm-btn:active { transform: translateY(0); }
        .dp-bm-btn.filled { background: #e63946; color: #fff; }
        .dp-bm-btn.outline {
          background: transparent;
          border: 1px solid rgba(230,57,70,0.5);
          color: #e63946;
        }
        .dp-bm-btn.ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.5);
        }

        /* ── Chapters section ── */
        .dp-chapters-wrap {
          margin-top: 0;
        }
        .dp-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .dp-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .dp-chapter-count {
          font-family: 'Mulish', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
        }

        .dp-chapter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 10px;
          margin-bottom: 24px;
        }

        .dp-chapter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          color: rgba(255,255,255,0.6);
          font-family: 'Mulish', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, color 0.18s, transform 0.12s;
          white-space: nowrap;
        }
        .dp-chapter-btn:hover {
          background: rgba(230,57,70,0.08);
          border-color: rgba(230,57,70,0.3);
          color: #e63946;
          transform: translateY(-1px);
        }
        .dp-chapter-btn svg { flex-shrink: 0; opacity: 0.5; }

        /* ── Chapter pagination ── */
        .dp-ch-pagination {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .dp-ch-pg-btn {
          padding: 7px 14px;
          border-radius: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.4);
          font-family: 'Mulish', sans-serif;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }
        .dp-ch-pg-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
        }
        .dp-ch-pg-btn.active {
          background: rgba(230,57,70,0.12);
          border-color: rgba(230,57,70,0.4);
          color: #e63946;
        }
      `}</style>

      <PublicNavbar />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ paddingTop: 36 }}>
          <button className="dp-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
            Kembali
          </button>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message="Manhwa tidak ditemukan" type="error" showIcon />
          ) : manhwa ? (
            <>
              {/* ── Hero ── */}
              <div className="dp-hero">
                {/* Cover */}
                <div className="dp-cover-wrap">
                  {manhwa.coverImage ? (
                    <img
                      src={manhwa.coverImage}
                      alt={manhwa.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/300x400/1a1a1a/555?text=${encodeURIComponent(manhwa.title)}`;
                      }}
                    />
                  ) : (
                    <div className="dp-cover-placeholder">No Cover</div>
                  )}
                  <div className="dp-cover-badge">KW</div>
                  <div className="dp-cover-shadow" />
                </div>

                {/* Info */}
                <div className="dp-info">
                  <div className="dp-eyebrow">Detail Manhwa</div>
                  <h1 className="dp-title">{manhwa.title}</h1>
                  <div className="dp-author">
                    <UserOutlined style={{ fontSize: 13 }} />
                    {manhwa.author || '—'}
                  </div>

                  {manhwa.synopsis && (
                    <>
                      <div className="dp-synopsis-label">Sinopsis</div>
                      <p className="dp-synopsis-text">{manhwa.synopsis}</p>
                    </>
                  )}

                  {isAuthenticated ? (
                    <button
                      className={`dp-bm-btn ${bookmarked ? 'outline' : 'filled'}`}
                      onClick={handleBookmark}
                      disabled={loading}
                    >
                      <BookOutlined />
                      {bookmarked ? 'Hapus Bookmark' : 'Add Bookmark'}
                    </button>
                  ) : (
                    <button
                      className="dp-bm-btn ghost"
                      onClick={() => navigate(PAGE_PATH.LOGIN)}
                    >
                      <BookOutlined />
                      Login to Bookmark
                    </button>
                  )}
                </div>
              </div>

              {/* ── Chapters ── */}
              <div className="dp-chapters-wrap">
                <div className="dp-section-header">
                  <span className="dp-section-title">Daftar Chapter</span>
                  <span className="dp-chapter-count">{DUMMY_CHAPTERS.length} chapter</span>
                </div>

                <div className="dp-chapter-grid">
                  {visibleChapters.map((ch) => (
                    <button
                      key={ch.id}
                      className="dp-chapter-btn"
                      onClick={() => {
                        /* navigate to chapter reader */
                      }}
                    >
                      <ReadOutlined style={{ fontSize: 12 }} />
                      {ch.label}
                    </button>
                  ))}
                </div>

                {/* Chapter page nav */}
                {totalChapterPages > 1 && (
                  <div className="dp-ch-pagination">
                    {Array.from({ length: totalChapterPages }, (_, i) => (
                      <button
                        key={i}
                        className={`dp-ch-pg-btn ${chapterPage === i ? 'active' : ''}`}
                        onClick={() => setChapterPage(i)}
                      >
                        {i === 0
                          ? `Ch. 100–51`
                          : `Ch. 50–1`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}