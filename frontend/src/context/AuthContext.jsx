import { createContext, useContext, useState, useCallback } from 'react';
import { USERS } from '../data/mockData';

export const AuthContext = createContext(null);

const MOCK_CREDENTIALS = {
  'sponsor@lineage.dev': USERS.sponsor,
  'expert@lineage.dev': USERS.expert,
  'student@lineage.dev': USERS.studentA,
  'studentb@lineage.dev': USERS.studentB,
  'admin@lineage.dev': USERS.admin,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('lineage_user');
      return stored ? JSON.parse(stored) : USERS.studentA;
    } catch { return USERS.studentA; }
  });

  const login = useCallback((email) => {
    const u = MOCK_CREDENTIALS[email] || USERS.studentA;
    setUser(u);
    try { localStorage.setItem('lineage_user', JSON.stringify(u)); } catch {}
    return u;
  }, []);

  const register = useCallback((userData) => {
    const u = {
      id: `u-${Date.now()}`,
      name: userData.fullName || userData.name || 'New User',
      email: userData.email,
      role: userData.role || 'student',
      skills: userData.skills || [],
      avatar_color: '#0d9488',
    };
    setUser(u);
    try { localStorage.setItem('lineage_user', JSON.stringify(u)); } catch {}
    return u;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem('lineage_user'); } catch {}
  }, []);

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
