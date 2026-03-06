import { useState } from 'react';
import LoginPage from './components/LoginPage';
import SwipePage from './components/SwipePage';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <SwipePage user={user} onLogout={handleLogout} />;
}
