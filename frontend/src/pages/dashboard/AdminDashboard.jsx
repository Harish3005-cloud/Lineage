import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, formatRelativeTime, truncateHash } from '../../utils/formatters';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_LEDGER,
  MOCK_DISPUTES,
  MOCK_TRUST_OVERVIEW,
} from '../../utils/mockData';
import {
  Users,
  FolderKanban,
  ClipboardList,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Scale,
  ScrollText,
  CheckCircle,
  Database,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

/**
 * Admin Dashboard
 * System administrator console providing platform governance, ledger health,
 * tamper detection, escrow solvency, and dispute arbitration.
 */
export default function AdminDashboard({
  stats: propStats,
  ledger: propLedger,
  disputes: propDisputes,
  trustOverview: propTrustOverview,
  isLoading = false,
  error = null,
}) {
  const stats = propStats || MOCK_DASHBOARD_STATS.admin;
  const ledger = propLedger || MOCK_LEDGER;
  const disputes = propDisputes || MOCK_DISPUTES;
  const trust = propTrustOverview || MOCK_TRUST_OVERVIEW;

  const quickAccessItems = [
    {
      title: 'Users',
      path: '/admin/users',
      count: `${stats.total_users ?? 12} registered`,
      iconClass: 'quick-access-icon-users',
      icon: <Users size={24} />,
      emoji: '👥',
      description: 'Role access & verification',
    },
    {
      title: 'Projects',
      path: '/admin/projects',
      count: `${stats.active_projects ?? 3} active`,
      iconClass: 'quick-access-icon-projects',
      icon: <FolderKanban size={24} />,
      emoji: '📁',
      description: 'Charters & milestones',
    },
    {
      title: 'Integrity Reviews',
      path: '/admin/reviews',
      count: `${stats.pending_reviews ?? 2} pending`,
      iconClass: 'quick-access-icon-reviews',
      icon: <ClipboardList size={24} />,
      emoji: '🛡️',
      description: 'Similarity flags & triage',
    },
    {
      title: 'Ledger',
      path: '/admin/ledger',
      count: `${stats.ledger_entries ?? 3} entries`,
      iconClass: 'quick-access-icon-ledger',
      icon: <Layers size={24} />,
      emoji: '⛓️',
      description: 'Hash-chained integrity audit',
    },
    {
      title: 'Disputes',
      path: '/admin/disputes',
      count: `${stats.open_disputes ?? 1} open`,
      iconClass: 'quick-access-icon-disputes',
      icon: <Scale size={24} />,
      emoji: '⚖️',
      description: 'Arbitration & appeals',
    },
    {
      title: 'Audit',
      path: '/admin/audit',
      count: 'Full trail active',
      iconClass: 'quick-access-icon-audit',
      icon: <ScrollText size={24} />,
      emoji: '📋',
      description: 'System actions & AI logs',
    },
  ];

  if (isLoading) {
    return (
      <div className="dashboard-content">
        <div className="loading-screen">
          <div className="spinner spinner-lg"></div>
          <p>Loading admin console...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-content">
        <div className="card" style={{ borderColor: 'var(--color-error)' }}>
          <h3 className="text-error">Unable to load dashboard</h3>
          <p className="text-secondary">{error.message || 'An error occurred while fetching your data.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      {/* ── First Stats Grid (4 cols): Platform Metrics ── */}
      <section className="stats-grid grid-4" aria-label="Platform Overview Metrics">
        {/* Total Users */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Users</span>
            <div className="stat-icon-wrapper stat-icon-primary">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.total_users ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Students, Experts, Sponsors</span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Active Projects</span>
            <div className="stat-icon-wrapper stat-icon-accent">
              <FolderKanban size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.active_projects ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Live research environments</span>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Pending Reviews</span>
            <div className="stat-icon-wrapper stat-icon-warning">
              <ClipboardList size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.pending_reviews ?? 0}</span>
          </div>
          <div className="stat-card-footer text-warning">
            <span>Awaiting expert triage</span>
          </div>
        </div>

        {/* Flagged Submissions */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Flagged Submissions</span>
            <div className="stat-icon-wrapper stat-icon-error">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.flagged_submissions ?? 0}</span>
          </div>
          <div className="stat-card-footer text-error">
            <span>High similarity / plagiarism</span>
          </div>
        </div>
      </section>

      {/* ── Second Stats Grid (4 cols): Ledger & Escrow Health ── */}
      <section className="stats-grid grid-4" aria-label="Ledger and Escrow Health">
        {/* Ledger Entries */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Ledger Entries</span>
            <div className="stat-icon-wrapper stat-icon-primary">
              <Layers size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.ledger_entries ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>SHA-256 chained blocks</span>
          </div>
        </div>

        {/* Ledger Status (Badge) */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Ledger Status</span>
            <div className="stat-icon-wrapper stat-icon-success">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div style={{ marginTop: 'var(--space-1)' }}>
              <StatusBadge
                status={stats.ledger_status || 'valid'}
                label={stats.ledger_status === 'valid' ? 'Valid & Intact' : 'Broken Chain'}
              />
            </div>
          </div>
          <div className="stat-card-footer text-success">
            <span>Zero hash collisions detected</span>
          </div>
        </div>

        {/* Open Disputes */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Open Disputes</span>
            <div className="stat-icon-wrapper stat-icon-warning">
              <Scale size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.open_disputes ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Pending arbitration</span>
          </div>
        </div>

        {/* Total Escrow */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Escrow</span>
            <div className="stat-icon-wrapper stat-icon-success">
              <Database size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">
              {formatCurrency(stats.escrow_total, stats.currency || '₹')}
            </span>
          </div>
          <div className="stat-card-footer">
            <span>Total platform solvency</span>
          </div>
        </div>
      </section>

      {/* ── Quick Access Grid: 6 cards linking to admin pages ── */}
      <section className="dashboard-section" aria-labelledby="quick-access-title">
        <div className="dashboard-section-header">
          <div className="dashboard-section-title-group">
            <h2 id="quick-access-title" className="dashboard-section-title">
              Governance & Quick Access
            </h2>
            <p className="dashboard-section-subtitle">
              Direct access to system administration modules and verifiable integrity audits
            </p>
          </div>
        </div>

        <div className="quick-access-grid">
          {quickAccessItems.map((item) => (
            <Link key={item.title} to={item.path} className="quick-access-card">
              <div className={`quick-access-icon ${item.iconClass}`}>
                {item.icon}
              </div>
              <div className="quick-access-info">
                <div className="flex items-center justify-between">
                  <span className="quick-access-title">{item.title}</span>
                  <ArrowRight size={14} className="text-tertiary" />
                </div>
                <span className="quick-access-count font-medium text-accent">
                  {item.count}
                </span>
                <span className="text-xs text-tertiary mt-1">
                  {item.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent Ledger & Dispute Activity ── */}
      <div className="dashboard-two-col">
        {/* Left: Recent Ledger Blocks */}
        <div className="dashboard-col-left">
          <section className="card" aria-labelledby="recent-ledger-title">
            <div className="card-header">
              <div className="dashboard-section-title-group">
                <h3 id="recent-ledger-title" className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Layers size={20} style={{ color: 'var(--color-success-dark)' }} />
                  <span>Recent Ledger Commitments</span>
                </h3>
                <p className="text-xs text-secondary">
                  Cryptographically chained blocks verified by SHA-256
                </p>
              </div>
              <Link to="/admin/ledger" className="dashboard-section-action text-xs">
                Inspect Ledger Chain
              </Link>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Entry #</th>
                    <th>Action</th>
                    <th>Contribution ID</th>
                    <th>Current Hash</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.map((entry) => (
                    <tr key={entry.entry_number}>
                      <td className="font-mono font-bold">#{entry.entry_number}</td>
                      <td className="text-xs">{entry.action}</td>
                      <td className="font-mono text-xs">{entry.contribution_id}</td>
                      <td className="font-mono text-xs text-tertiary">
                        {truncateHash(entry.current_hash, 10)}
                      </td>
                      <td>
                        <StatusBadge status={entry.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right: Open Disputes */}
        <div className="dashboard-col-right">
          <section className="card" aria-labelledby="open-disputes-title">
            <div className="card-header">
              <div className="dashboard-section-title-group">
                <h3 id="open-disputes-title" className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Scale size={20} style={{ color: 'var(--color-warning-dark)' }} />
                  <span>Open Disputes</span>
                </h3>
                <p className="text-xs text-secondary">
                  Formal appeals requiring administrator resolution
                </p>
              </div>
              <Link to="/admin/disputes" className="dashboard-section-action text-xs">
                Manage
              </Link>
            </div>

            <div className="activity-list">
              {disputes && disputes.length > 0 ? (
                disputes.map((dispute) => (
                  <div key={dispute.id} className="activity-item">
                    <div className="activity-content">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-primary">
                          {dispute.contribution_id}
                        </span>
                        <StatusBadge status={dispute.status} />
                      </div>
                      <p className="activity-item-message mt-1">
                        {dispute.reason}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-secondary">
                          Raised by: {dispute.raised_by?.name} ({dispute.raised_by?.role})
                        </span>
                        <span className="activity-item-time">
                          {formatRelativeTime(dispute.created_at)}
                        </span>
                      </div>
                      <div className="mt-2 text-right">
                        <Link to="/admin/disputes" className="btn btn-outline btn-sm">
                          Arbitrate
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-secondary text-center py-4">No open disputes at this time.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
