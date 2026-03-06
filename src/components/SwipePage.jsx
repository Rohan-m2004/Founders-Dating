import { useState, useCallback } from 'react';
import { founders as initialFounders } from '../data/founders';
import ProfileCard from './ProfileCard';
import MatchModal from './MatchModal';
import './SwipePage.css';

export default function SwipePage({ user, onLogout }) {
  const [stack, setStack] = useState([...initialFounders]);
  const [gone, setGone] = useState([]); // passed/liked
  const [liked, setLiked] = useState([]);
  const [match, setMatch] = useState(null);

  const currentFounder = stack[stack.length - 1];

  const handleSwipe = useCallback((direction, founderId) => {
    const founder = stack.find((f) => f.id === founderId);
    if (!founder) return;

    setTimeout(() => {
      setStack((prev) => prev.filter((f) => f.id !== founderId));
      setGone((prev) => [...prev, founder]);

      if (direction === 'right') {
        setLiked((prev) => [...prev, founder]);
        // 40% chance of a match for demo purposes
        if (Math.random() < 0.4) {
          setTimeout(() => setMatch(founder), 300);
        }
      }
    }, 250);
  }, [stack]);

  const triggerSwipe = (direction) => {
    if (!currentFounder) return;
    handleSwipe(direction, currentFounder.id);
  };

  const handleUndo = () => {
    if (gone.length === 0) return;
    const last = gone[gone.length - 1];
    setGone((prev) => prev.slice(0, -1));
    setLiked((prev) => prev.filter((f) => f.id !== last.id));
    setStack((prev) => [...prev, last]);
  };

  const resetDeck = () => {
    setStack([...initialFounders]);
    setGone([]);
    setLiked([]);
  };

  const closeMatch = () => setMatch(null);

  // Show the top 3 cards in the stack (with slight offset for depth effect)
  const visibleStack = stack.slice(-3);

  return (
    <div className="swipe-page">
      {/* Navbar */}
      <header className="swipe-nav">
        <div className="nav-brand">
          <span className="nav-logo">🚀</span>
          <span className="nav-title">FounderMatch</span>
        </div>

        <div className="nav-stats">
          <div className="stat-item">
            <span className="stat-value">{liked.length}</span>
            <span className="stat-label">Liked</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{gone.length}</span>
            <span className="stat-label">Seen</span>
          </div>
        </div>

        <div className="nav-user">
          <div className="user-chip">
            <div className="user-chip-avatar">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <span className="user-chip-name">{user.name}</span>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Sign out">
            ↩
          </button>
        </div>
      </header>

      {/* Main area */}
      <main className="swipe-main">
        {/* Card stack */}
        <div className="card-stack-area">
          {stack.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h3>You've seen everyone!</h3>
              <p>You liked {liked.length} founder{liked.length !== 1 ? 's' : ''}. Check back later for more.</p>
              <button className="reset-btn" onClick={resetDeck}>
                🔄 Start Over
              </button>
            </div>
          ) : (
            <div className="card-stack">
              {visibleStack.map((founder, idx) => {
                const isTop = idx === visibleStack.length - 1;
                const offset = (visibleStack.length - 1 - idx) * 10;
                const scale = 1 - (visibleStack.length - 1 - idx) * 0.04;
                return (
                  <ProfileCard
                    key={founder.id}
                    founder={founder}
                    isTop={isTop}
                    style={{
                      transform: isTop
                        ? undefined
                        : `translateY(${offset}px) scale(${scale})`,
                      transition: isTop ? undefined : 'transform 0.3s ease',
                      zIndex: idx,
                    }}
                    onSwipe={(dir) => handleSwipe(dir, founder.id)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {stack.length > 0 && (
          <div className="action-buttons">
            <button
              className="action-btn undo-btn"
              onClick={handleUndo}
              disabled={gone.length === 0}
              title="Undo"
            >
              ↩
            </button>

            <button
              className="action-btn pass-btn"
              onClick={() => triggerSwipe('left')}
              title="Pass"
            >
              ✕
            </button>

            <button
              className="action-btn like-btn"
              onClick={() => triggerSwipe('right')}
              title="Connect"
            >
              ♥
            </button>

            <button
              className="action-btn super-like-btn"
              onClick={() => triggerSwipe('right')}
              title="Super Like"
            >
              ★
            </button>
          </div>
        )}

        {/* Swipe hint */}
        {stack.length > 0 && (
          <p className="swipe-hint">
            Drag card left to pass · right to connect
          </p>
        )}
      </main>

      {/* Liked sidebar / progress */}
      <aside className="liked-sidebar">
        <h3 className="sidebar-title">Your Connections</h3>
        {liked.length === 0 ? (
          <p className="sidebar-empty">Swipe right on founders you want to connect with!</p>
        ) : (
          <ul className="liked-list">
            {liked.map((f) => (
              <li key={f.id} className="liked-item">
                <div className="liked-avatar" style={{ background: f.avatarColor }}>
                  {f.avatar}
                </div>
                <div className="liked-info">
                  <p className="liked-name">{f.name}</p>
                  <p className="liked-company">{f.company}</p>
                </div>
                <span className="liked-badge">✓</span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Match modal */}
      {match && (
        <MatchModal
          user={user}
          matchedFounder={match}
          onClose={closeMatch}
          onMessage={closeMatch}
        />
      )}
    </div>
  );
}
