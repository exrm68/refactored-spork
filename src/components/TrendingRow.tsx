import React from 'react';
import { Movie } from '../types';

interface TrendingRowProps {
  movies: Movie[];
  onClick: (movie: Movie) => void;
}

// 🚀 React.memo for better performance
const TrendingRow = React.memo<TrendingRowProps>(({ movies, onClick }) => {
  if (!movies || movies.length === 0) return null;
  
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '18px',
        paddingLeft: '4px',
        paddingRight: '4px',
        paddingBottom: '12px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
      }}
        className="no-scrollbar"
      >
        {movies.slice(0, 10).map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => onClick(movie)}
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '100px',
              height: '150px',
              cursor: 'pointer',
              // 🚀 CSS transition instead of framer-motion!
              transition: 'transform 0.15s ease',
            }}
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.94)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.94)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Big number */}
            <div style={{
              position: 'absolute',
              left: '-14px',
              bottom: '-8px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '90px',
              fontWeight: 900,
              lineHeight: 1,
              zIndex: 10,
              userSelect: 'none',
              pointerEvents: 'none',
              WebkitTextStroke: '2px rgba(255,255,255,0.15)',
              color: 'transparent',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))',
            }}>
              {index + 1}
            </div>

            {/* Card */}
            <div style={{
              position: 'absolute',
              right: 0, top: 0,
              width: '82px', height: '122px',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#111114',
              zIndex: 20,
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            }}>
              <img
                src={movie.thumbnail}
                alt={movie.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

TrendingRow.displayName = 'TrendingRow';

export default TrendingRow;
