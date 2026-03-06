import { useState } from 'react';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    title: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!form.email || !form.password) {
        setError('Please fill in all fields.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin({ name: form.email.split('@')[0], email: form.email });
      }, 800);
    } else {
      if (!form.name || !form.email || !form.password || !form.company || !form.title) {
        setError('Please fill in all fields.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin({ name: form.name, email: form.email, company: form.company, title: form.title });
      }, 800);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-blob blob-1" />
        <div className="login-blob blob-2" />
        <div className="login-blob blob-3" />
      </div>

      <div className="login-container">
        <div className="login-brand">
          <div className="login-logo">
            <span className="logo-icon">🚀</span>
          </div>
          <h1 className="login-title">FounderMatch</h1>
          <p className="login-subtitle">
            Connect with visionary founders &amp; entrepreneurs
          </p>
        </div>

        <div className="login-card">
          <div className="login-tabs">
            <button
              className={`login-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
            <button
              className={`login-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => setMode('register')}
            >
              Join Now
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Your Title</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="CEO & Founder"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="StartupXYZ"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@startup.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
              aria-label={
                loading
                  ? 'Loading'
                  : mode === 'login'
                  ? 'Sign In'
                  : 'Create Account'
              }
            >
              {loading ? (
                <span className="btn-spinner" />
              ) : mode === 'login' ? (
                'Sign In →'
              ) : (
                'Create Account →'
              )}
            </button>
          </form>

          <p className="login-switch">
            {mode === 'login' ? (
              <>
                New to FounderMatch?{' '}
                <button className="link-btn" onClick={() => setMode('register')}>
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="link-btn" onClick={() => setMode('login')}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        <div className="login-features">
          <div className="feature-item">
            <span>🤝</span>
            <span>Find Co-founders</span>
          </div>
          <div className="feature-item">
            <span>💡</span>
            <span>Share Ideas</span>
          </div>
          <div className="feature-item">
            <span>📈</span>
            <span>Grow Together</span>
          </div>
        </div>
      </div>
    </div>
  );
}
