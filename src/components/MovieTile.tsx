import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Movie } from '../types';

interface MovieTileProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (movie: Movie) => void;
}

// 🔥 React.memo = No unnecessary re-renders!
const MovieTile = React.memo<MovieTileProps>(({ movie, isFavorite, onToggleFavorite, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={() => onClick(movie)}
      className="movie-tile-optimized"
      style={{
        position: 'relative',
        aspectRatio: '2/3',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#111114',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        // 🚀 CSS transition instead of framer-motion!
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* POSTER */}
      <img
        src={movie.thumbnail}
        alt={movie.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1c1c20 0%, #111114 100%)',
        }} />
      )}

      {/* GRADIENT */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 28%, rgba(0,0,0,0.08) 50%, transparent 68%)',
        zIndex: 1,
      }} />

      {/* TOP ICONS */}
      <div style={{
        position: 'absolute', top: 7, left: 7, right: 7,
        display: 'flex', justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(movie.id); }}
          style={{
            width: 24, height: 24, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isFavorite ? 'rgba(239,68,68,0.85)' : 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(8px)',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Heart size={10} style={{ color: '#fff', fill: isFavorite ? '#fff' : 'none' }} />
        </button>

        {movie.isExclusive && (
          <span style={{
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(255,215,0,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,215,0,0.3)',
            fontSize: '7px',
            fontWeight: 700,
            letterSpacing: '0.4px',
            color: '#FFD700',
            textTransform: 'uppercase',
          }}>
            VIP
          </span>
        )}
      </div>

      {/* BOTTOM INFO */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '8px 8px 10px',
        zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: 3,
      }}>
        <h3 style={{
          margin: 0, fontSize: '11px', fontWeight: 700,
          lineHeight: 1.25, color: '#fff',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
        }}>
          {movie.title}
        </h3>
        
        <div style={{ display: 'flex', gap: 4, fontSize: '8px', color: 'rgba(255,255,255,0.6)' }}>
          {movie.releaseYear && <span>{movie.releaseYear}</span>}
          {movie.releaseYear && movie.category && <span>•</span>}
          {movie.category && <span>{movie.category}</span>}
        </div>
      </div>
    </div>
  );
});

MovieTile.displayName = 'MovieTile';

export default MovieTile;
