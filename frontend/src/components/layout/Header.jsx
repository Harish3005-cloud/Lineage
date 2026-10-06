import { useAuth } from '../../hooks/useAuth';
import { Bell, Search } from 'lucide-react';
import { getInitials } from '../../utils/formatters';
import './Header.css';

export default function Header({ title, subtitle, actions }) {
  const { user } = useAuth();

  return (
    <header className="main-header">
      <div className="header-left">
        {title && (
          <div className="header-title-group">
            <h1 className="header-title">{title}</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
          </div>
        )}
      </div>
      <div className="header-right">
        {actions && <div className="header-actions">{actions}</div>}
        <div className="header-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="header-search-input"
          />
        </div>
        <button className="header-icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="header-notification-dot"></span>
        </button>
        <div className="header-user-badge">
          <div
            className="avatar avatar-sm"
            style={{ background: user?.avatar_color || 'var(--color-primary-600)' }}
          >
            {getInitials(user?.name)}
          </div>
        </div>
      </div>
    </header>
  );
}
