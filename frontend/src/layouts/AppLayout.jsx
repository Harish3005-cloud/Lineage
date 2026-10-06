import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Layers, Menu, X, Sun, Moon, UserCheck } from 'lucide-react';
import { useState } from 'react';

export default function AppLayout() {
  const { user, isAuthenticated, login } = useAuth();
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-app)' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content container */}
      <div className="flex-1 min-w-0 md:pl-64 flex flex-col min-h-screen">
        {/* Desktop & Mobile Header Bar */}
        <header className="flex items-center justify-between px-4 md:px-8 h-14 border-b shrink-0"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1 text-slate-600 dark:text-slate-300">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <span className="mono-pill uppercase">Persona: {user?.role || 'Guest'}</span>
              <span>•</span>
              <span>{user?.name}</span>
            </div>
          </div>

          {/* Right Header Bar Actions */}
          <div className="flex items-center gap-3">
            {/* Persona Switcher Quick Dropdown */}
            <select
              value={user?.email || ''}
              onChange={(e) => { login(e.target.value); }}
              className="text-xs p-1.5 rounded surface-inset border border-slate-300 dark:border-slate-700 outline-none"
            >
              <option value="sponsor@lineage.dev">Sponsor: Vikram Patel</option>
              <option value="expert@lineage.dev">Expert: Dr. Priya Menon</option>
              <option value="student@lineage.dev">Student A: Arjun Sharma (Minor)</option>
              <option value="studentb@lineage.dev">Student B: Kavitha Rajan</option>
              <option value="admin@lineage.dev">Admin: Neha Gupta</option>
            </select>

            {/* Theme Toggle Button */}
            <button
              onClick={toggle}
              title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-1.5 rounded surface-inset border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              {dark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-600" />}
              <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
