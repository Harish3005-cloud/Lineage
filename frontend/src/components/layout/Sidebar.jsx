import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { getInitials } from '../../utils/formatters';
import {
  LayoutDashboard, FolderOpen, Users, FileText,
  Bot, Shield, Layers, ScrollText, Wallet,
  ClipboardList, Sun, Moon, LogOut, ChevronLeft, ChevronRight, PlusCircle, Award
} from 'lucide-react';
import { useState } from 'react';

const NAV = [
  {
    group: 'Workspace',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/project', icon: FolderOpen, label: 'Project' },
      { to: '/post-project', icon: PlusCircle, label: 'Post Research' },
      { to: '/matching', icon: Users, label: 'Team Matching' },
      { to: '/contributions', icon: FileText, label: 'Contributions' },
    ],
  },
  {
    group: 'Trust',
    items: [
      { to: '/ai-activity', icon: Bot, label: 'AI Activity' },
      { to: '/integrity', icon: Shield, label: 'Integrity' },
      { to: '/ledger', icon: Layers, label: 'Ledger' },
    ],
  },
  {
    group: 'Agreements',
    items: [
      { to: '/charter', icon: ScrollText, label: 'Charter' },
      { to: '/credit', icon: Wallet, label: 'Credit & Escrow' },
      { to: '/non-monetary', icon: Award, label: 'Non-Monetary Credential' },
    ],
  },
  {
    group: 'Admin',
    items: [
      { to: '/reviews', icon: ClipboardList, label: 'Review Queue' },
    ],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col z-40 transition-all duration-200 border-r"
      style={{
        width: collapsed ? 64 : 240,
        background: 'var(--bg-sidebar)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.06] shrink-0">
        <div className="w-7 h-7 rounded bg-teal-600 flex items-center justify-center shrink-0">
          <Layers size={15} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-white font-semibold tracking-widest text-sm">LINEAGE</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV.map(group => (
          <div key={group.group} className="mb-4">
            {!collapsed && (
              <div className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                {group.group}
              </div>
            )}
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-2.5 py-1.5 rounded text-[13px] font-medium transition-colors mb-0.5 ${
                    isActive
                      ? 'text-white'
                      : 'hover:text-white/80'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-on-sidebar-active)' : 'var(--text-on-sidebar)',
                  background: isActive ? 'var(--bg-sidebar-active)' : 'transparent',
                })}
              >
                <item.icon size={16} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/[0.06] p-2 space-y-1">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded text-[13px] transition-colors"
          style={{ color: 'var(--text-on-sidebar)' }}
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
          {!collapsed && <span>{dark ? 'Light mode' : 'Dark mode'}</span>}
        </button>

        {/* User */}
        {user && (
          <div className="flex items-center gap-2.5 px-2.5 py-1.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: user.avatar_color || '#4a5275' }}
            >
              {getInitials(user.name)}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-white/90 truncate">{user.name}</div>
                <div className="text-[10px] capitalize" style={{ color: 'var(--text-on-sidebar)' }}>
                  {user.role}
                </div>
              </div>
            )}
            <button onClick={handleLogout} title="Sign out"
              className="text-white/30 hover:text-white/70 transition-colors shrink-0">
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-secondary)',
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
