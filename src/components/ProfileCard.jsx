import { useRef, useState, useCallback } from 'react';
import './ProfileCard.css';

export default function ProfileCard({ founder, onSwipe, isTop, style }) {
  const cardRef = useRef(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
  });

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const getRotation = () => {
    return dragX * 0.08;
  };

  const getLikeOpacity = () => {
    return Math.min(Math.max(dragX / 80, 0), 1);
  };

  const getNopeOpacity = () => {
    return Math.min(Math.max(-dragX / 80, 0), 1);
  };

  const startDrag = useCallback((clientX) => {
    if (!isTop) return;
    dragState.current.isDragging = true;
    dragState.current.startX = clientX;
    dragState.current.currentX = 0;
    setIsDragging(true);
  }, [isTop]);

  const moveDrag = useCallback((clientX) => {
    if (!dragState.current.isDragging) return;
    const delta = clientX - dragState.current.startX;
    dragState.current.currentX = delta;
    setDragX(delta);
  }, []);

  const endDrag = useCallback(() => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    setIsDragging(false);
    const threshold = 100;
    if (dragState.current.currentX > threshold) {
      onSwipe('right');
    } else if (dragState.current.currentX < -threshold) {
      onSwipe('left');
    } else {
      setDragX(0);
    }
  }, [onSwipe]);

  const onMouseDown = (e) => startDrag(e.clientX);
  const onMouseMove = (e) => moveDrag(e.clientX);
  const onMouseUp = () => endDrag();

  const onTouchStart = (e) => startDrag(e.touches[0].clientX);
  const onTouchMove = (e) => moveDrag(e.touches[0].clientX);
  const onTouchEnd = () => endDrag();

  const cardStyle = {
    ...style,
    transform: `translateX(${dragX}px) rotate(${getRotation()}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
    cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default',
    userSelect: 'none',
  };

  return (
    <div
      ref={cardRef}
      className={`profile-card ${isTop ? 'is-top' : ''}`}
      style={cardStyle}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Swipe indicators */}
      <div className="swipe-indicator like" style={{ opacity: getLikeOpacity() }}>
        <span>CONNECT</span>
      </div>
      <div className="swipe-indicator nope" style={{ opacity: getNopeOpacity() }}>
        <span>PASS</span>
      </div>

      {/* Card header with gradient */}
      <div className="card-header" style={{ background: founder.bgGradient }}>
        <div className="card-avatar" style={{ background: founder.avatarColor }}>
          {founder.avatar}
        </div>
        <div className="card-header-info">
          <h2 className="card-name">{founder.name}, {founder.age}</h2>
          <p className="card-role">{founder.title}</p>
          <div className="card-company">
            <span className="company-badge">🏢 {founder.company}</span>
          </div>
        </div>
        <div className="card-location">
          <span>📍 {founder.location}</span>
        </div>
      </div>

      {/* Card tabs */}
      <div className="card-tabs">
        <button
          className={`card-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActiveTab('about'); }}
        >
          About
        </button>
        <button
          className={`card-tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActiveTab('skills'); }}
        >
          Skills
        </button>
        <button
          className={`card-tab ${activeTab === 'highlights' ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActiveTab('highlights'); }}
        >
          Highlights
        </button>
      </div>

      {/* Card body */}
      <div className="card-body">
        {activeTab === 'about' && (
          <div className="tab-content">
            <p className="card-tagline">&ldquo;{founder.tagline}&rdquo;</p>
            <p className="card-bio">{founder.bio}</p>
            <div className="card-meta">
              <div className="meta-item">
                <span className="meta-label">Stage</span>
                <span className="meta-value stage">{founder.stage}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">{founder.industry}</span>
              </div>
            </div>
            <div className="looking-for">
              <span className="meta-label">Looking for</span>
              <p className="looking-for-text">{founder.lookingFor}</p>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="tab-content">
            <p className="tab-section-title">Core Skills</p>
            <div className="skills-grid">
              {founder.skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'highlights' && (
          <div className="tab-content">
            <p className="tab-section-title">Key Achievements</p>
            <ul className="achievements-list">
              {founder.achievements.map((a) => (
                <li key={a} className="achievement-item">
                  <span className="achievement-icon">🏆</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
