import './MatchModal.css';

export default function MatchModal({ user, matchedFounder, onClose, onMessage }) {
  return (
    <div className="match-overlay" onClick={onClose}>
      <div className="match-modal" onClick={(e) => e.stopPropagation()}>
        <div className="match-confetti">
          {['🎉', '🚀', '💡', '🤝', '✨', '🎊'].map((emoji, i) => (
            <span key={i} className="confetti-piece" style={{ '--delay': `${i * 0.15}s`, '--x': `${(i * 60) - 150}px` }}>
              {emoji}
            </span>
          ))}
        </div>

        <div className="match-header">
          <h2 className="match-title">It&apos;s a Match!</h2>
          <p className="match-subtitle">You and {matchedFounder.name} are interested in connecting</p>
        </div>

        <div className="match-avatars">
          <div className="match-avatar user-avatar">
            <span>{user.name.slice(0, 2).toUpperCase()}</span>
          </div>
          <div className="match-heart">💜</div>
          <div className="match-avatar founder-avatar" style={{ background: matchedFounder.avatarColor }}>
            <span>{matchedFounder.avatar}</span>
          </div>
        </div>

        <div className="match-founder-info">
          <p className="match-founder-name">{matchedFounder.name}</p>
          <p className="match-founder-role">{matchedFounder.title} @ {matchedFounder.company}</p>
        </div>

        <div className="match-actions">
          <button className="match-btn message-btn" onClick={onMessage}>
            💬 Send Message
          </button>
          <button className="match-btn continue-btn" onClick={onClose}>
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}
