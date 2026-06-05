import { Link } from 'react-router';
import type { Manhwa } from '../types';
import { PAGE_PATH } from '../constants';

interface ManhwaCardProps {
  manhwa: Manhwa;
}

export function ManhwaCard({ manhwa }: ManhwaCardProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600&family=Mulish:wght@300;400&display=swap');

        .mc-root {
          text-decoration: none;
          display: flex;        /* flex so child can stretch to full height */
          flex-direction: column;
          height: 100%;
          outline: none;
        }

        .mc-card {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          background: #111113;
          transition: transform 0.25s cubic-bezier(0.25,1,0.5,1);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;         /* fill the grid cell fully */
        }
        .mc-card:hover {
          transform: translateY(-5px);
        }
        .mc-card:hover .mc-cover {
          filter: brightness(0.55);
          transform: scale(1.05);
        }
        .mc-card:hover .mc-hover-layer {
          opacity: 1;
        }

        .mc-cover-wrap {
          aspect-ratio: 2/3;
          overflow: hidden;
          background: #18181c;
          position: relative;
          flex-shrink: 0;       /* never shrink the image */
        }
        .mc-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: filter 0.3s ease, transform 0.4s cubic-bezier(0.25,1,0.5,1);
        }

        .mc-hover-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px 12px 14px;
          background: linear-gradient(to top, rgba(12,12,14,0.95) 0%, rgba(12,12,14,0.3) 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .mc-read-btn {
          width: 100%;
          padding: 8px 0;
          background: #e63946;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-align: center;
          transition: background 0.15s;
        }
        .mc-read-btn:hover { background: #c9212e; }

        .mc-body {
          padding: 10px 10px 13px;
          flex: 1;              /* take remaining space so all cards align bottom */
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .mc-title {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.88);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0 0 5px 0;
          letter-spacing: -0.01em;
          /* Fixed height for exactly 2 lines so all cards are uniform */
          min-height: calc(13px * 1.4 * 2);
        }
        .mc-author {
          font-family: 'Mulish', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.3);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mc-no-cover {
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
        }
      `}</style>

      <Link to={PAGE_PATH.MANHWA_DETAIL(manhwa.id)} className="mc-root">
        <div className="mc-card">
          <div className="mc-cover-wrap">
            {manhwa.coverImage ? (
              <img
                src={manhwa.coverImage}
                alt={manhwa.title}
                className="mc-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placehold.co/300x450/111113/2a2a2e?text=${encodeURIComponent(manhwa.title)}`;
                }}
              />
            ) : (
              <div className="mc-no-cover">{manhwa.title}</div>
            )}
            <div className="mc-hover-layer">
              <div className="mc-read-btn">Baca Sekarang</div>
            </div>
          </div>
          <div className="mc-body">
            <p className="mc-title">{manhwa.title}</p>
            <p className="mc-author">{manhwa.author || '—'}</p>
          </div>
        </div>
      </Link>
    </>
  );
}