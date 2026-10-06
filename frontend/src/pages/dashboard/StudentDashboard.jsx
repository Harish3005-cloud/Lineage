import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ProjectCard from '../../components/common/ProjectCard';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';
import {
  MOCK_PROJECTS,
  MOCK_DASHBOARD_STATS,
  MOCK_CONTRIBUTIONS,
  MOCK_NOTIFICATIONS,
} from '../../utils/mockData';
import {
  FolderKanban,
  FileCode2,
  CheckCircle2,
  Coins,
  AlertTriangle,
  Gift,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

/**
 * Student Dashboard
 * Displays personalized metrics, AI-matched project recommendations,
 * real-time activity feed, contribution integrity status, and guardian consent (if minor).
 */
export default function StudentDashboard({
  stats: propStats,
  projects: propProjects,
  notifications: propNotifications,
  contributions: propContributions,
  isLoading = false,
  error = null,
}) {
  const { user, isMinor } = useAuth();

  // Support props for API integration with mock data fallback
  const stats = propStats || MOCK_DASHBOARD_STATS.student;
  const projects = propProjects || MOCK_PROJECTS;
  const notifications = propNotifications || MOCK_NOTIFICATIONS;
  const contributions = propContributions || MOCK_CONTRIBUTIONS;

  const [activeFilter, setActiveFilter] = useState('all');

  // Determine minor status from auth hook or user age
  const userIsMinor = isMinor || (user?.age != null && user.age < 18);
  const guardianConsentStatus = user?.guardian_consent || (userIsMinor ? 'pending' : 'not_required');

  // Integrity summary counts
  const acceptedCount = contributions.filter((c) => c.status === 'accepted').length || stats.accepted_contributions;
  const flaggedCount = contributions.filter((c) => c.status === 'flagged').length || 1;

  // Notification icon resolver
  const renderNotificationIcon = (type) => {
    switch (type) {
      case 'contribution_flagged':
        return (
          <div className="activity-icon-box activity-icon-flagged" title="Flagged Submission">
            <AlertTriangle size={18} />
          </div>
        );
      case 'reward_released':
        return (
          <div className="activity-icon-box activity-icon-reward" title="Reward Released">
            <Gift size={18} />
          </div>
        );
      case 'milestone_completed':
      default:
        return (
          <div className="activity-icon-box activity-icon-milestone" title="Milestone Status">
            <CheckCircle2 size={18} />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-content">
        <div className="loading-screen">
          <div className="spinner spinner-lg"></div>
          <p>Loading student dashboard...</p>
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
      {/* ── Stats Row (4 stat cards in a grid) ── */}
      <section className="stats-grid grid-4" aria-label="Student Key Metrics">
        {/* Active Projects */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Active Projects</span>
            <div className="stat-icon-wrapper stat-icon-primary">
              <FolderKanban size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.active_projects ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Enrolled research workspaces</span>
          </div>
        </div>

        {/* Contributions */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Contributions</span>
            <div className="stat-icon-wrapper stat-icon-accent">
              <FileCode2 size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.contributions ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Submitted artifacts & code</span>
          </div>
        </div>

        {/* Accepted */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Accepted</span>
            <div className="stat-icon-wrapper stat-icon-success">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.accepted_contributions ?? 0}</span>
          </div>
          <div className="stat-card-footer text-success">
            <span>Verified in integrity ledger</span>
          </div>
        </div>

        {/* Total Rewards */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Rewards</span>
            <div className="stat-icon-wrapper stat-icon-warning">
              <Coins size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">
              {formatCurrency(stats.total_rewards, stats.currency || '₹')}
            </span>
          </div>
          <div className="stat-card-footer">
            <span>Escrow disbursements received</span>
          </div>
        </div>
      </section>

      {/* ── Two Column Layout below stats ── */}
      <div className="dashboard-two-col">
        {/* Left Column (Wider): Recommended Projects */}
        <div className="dashboard-col-left">
          <section className="dashboard-section" aria-labelledby="recommended-projects-title">
            <div className="dashboard-section-header">
              <div className="dashboard-section-title-group">
                <h2 id="recommended-projects-title" className="dashboard-section-title">
                  Recommended Projects
                </h2>
                <p className="dashboard-section-subtitle">
                  AI-matched opportunities based on your skills and verified history
                </p>
              </div>
              <Link to="/projects/discover" className="dashboard-section-action">
                <span>View all projects</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="projects-stack">
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    showMatchScore={true}
                  />
                ))
              ) : (
                <div className="card empty-state">
                  <p>No recommended projects found matching your skills.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (Narrower): Activity, Integrity & Guardian Consent */}
        <div className="dashboard-col-right">
          {/* Guardian Consent Card (if user is minor) */}
          {userIsMinor && (
            <section className="card guardian-card" aria-label="Guardian Consent Status">
              <div className="guardian-card-header">
                <div className="guardian-card-title">
                  <UserCheck size={20} style={{ color: 'var(--color-warning-dark)' }} />
                  <span>Guardian Consent</span>
                </div>
                <StatusBadge status={guardianConsentStatus} />
              </div>
              <p className="guardian-card-message">
                Guardian consent required for paid workspace access and automated escrow disbursements.
              </p>
              <div className="guardian-card-actions">
                <Link to="/profile" className="btn btn-outline btn-sm">
                  Review Consent Form
                </Link>
              </div>
            </section>
          )}

          {/* Section: Integrity Status */}
          <section className="card integrity-status-card" aria-labelledby="integrity-status-title">
            <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
              <div className="dashboard-section-title-group">
                <h3 id="integrity-status-title" className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--color-accent-dark)' }} />
                  <span>Integrity Status</span>
                </h3>
              </div>
              <Link to="/integrity" className="dashboard-section-action text-xs">
                Lineage Details
              </Link>
            </div>

            <div className="integrity-badges-list">
              <div className="integrity-badge-row">
                <div className="flex items-center gap-2">
                  <span className="integrity-badge-pill accepted">
                    ✓ {acceptedCount} Accepted
                  </span>
                </div>
                <span className="integrity-metric-desc">Immutable cryptographic proof</span>
              </div>

              <div className="integrity-badge-row">
                <div className="flex items-center gap-2">
                  <span className="integrity-badge-pill flagged">
                    ⚠ {flaggedCount} Flagged for Review
                  </span>
                </div>
                <span className="integrity-metric-desc">Similarity / attribution check</span>
              </div>
            </div>
          </section>

          {/* Section: Recent Activity (Notifications) */}
          <section className="card activity-card" aria-labelledby="recent-activity-title">
            <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
              <h3 id="recent-activity-title" className="card-title">
                Recent Activity
              </h3>
              <span className="text-xs text-secondary">
                {notifications.length} updates
              </span>
            </div>

            <div className="activity-list">
              {notifications && notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`activity-item ${!notif.read ? 'unread' : ''}`}
                  >
                    {renderNotificationIcon(notif.type)}
                    <div className="activity-content">
                      <div className="activity-item-title">{notif.title}</div>
                      <div className="activity-item-message">{notif.message}</div>
                      <span className="activity-item-time">
                        {formatRelativeTime(notif.created_at)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-secondary text-center py-4">No recent activity.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
