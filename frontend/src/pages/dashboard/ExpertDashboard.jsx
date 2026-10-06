import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../../components/common/ProjectCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  truncateHash,
} from '../../utils/formatters';
import {
  MOCK_PROJECTS,
  MOCK_DASHBOARD_STATS,
  MOCK_REVIEWS,
  MOCK_CONTRIBUTIONS,
} from '../../utils/mockData';
import {
  FolderKanban,
  CheckCircle,
  AlertCircle,
  Coins,
  ShieldCheck,
  FileCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

/**
 * Expert Dashboard
 * For research advisors and domain experts to conduct integrity peer reviews,
 * oversee active research cohorts, and manage technical contributions.
 */
export default function ExpertDashboard({
  stats: propStats,
  projects: propProjects,
  reviews: propReviews,
  contributions: propContributions,
  isLoading = false,
  error = null,
}) {
  const stats = propStats || MOCK_DASHBOARD_STATS.expert;
  const projects = propProjects || MOCK_PROJECTS;
  const pendingReviews = propReviews || MOCK_REVIEWS;
  const contributions = propContributions || MOCK_CONTRIBUTIONS;

  if (isLoading) {
    return (
      <div className="dashboard-content">
        <div className="loading-screen">
          <div className="spinner spinner-lg"></div>
          <p>Loading expert dashboard...</p>
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
      <section className="stats-grid grid-4" aria-label="Expert Key Metrics">
        {/* Active Collaborations */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Active Collaborations</span>
            <div className="stat-icon-wrapper stat-icon-primary">
              <FolderKanban size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.active_collaborations ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Mentoring active project teams</span>
          </div>
        </div>

        {/* Reviews Completed */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Reviews Completed</span>
            <div className="stat-icon-wrapper stat-icon-success">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.reviews_completed ?? 0}</span>
          </div>
          <div className="stat-card-footer text-success">
            <span>Integrity decisions submitted</span>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Pending Reviews</span>
            <div className="stat-icon-wrapper stat-icon-warning">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.pending_reviews ?? 0}</span>
          </div>
          <div className="stat-card-footer text-warning">
            <span>Awaiting human verification</span>
          </div>
        </div>

        {/* Total Rewards */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Rewards</span>
            <div className="stat-icon-wrapper stat-icon-accent">
              <Coins size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">
              {formatCurrency(stats.total_rewards, stats.currency || '₹')}
            </span>
          </div>
          <div className="stat-card-footer">
            <span>Peer advisory disbursements</span>
          </div>
        </div>
      </section>

      {/* ── Two Column Layout below stats ── */}
      <div className="dashboard-two-col">
        {/* Left Column (Wider): Recommended Projects & Pending Reviews */}
        <div className="dashboard-col-left">
          {/* Section: Pending Reviews */}
          <section className="card" aria-labelledby="pending-reviews-title">
            <div className="card-header">
              <div className="dashboard-section-title-group">
                <h3 id="pending-reviews-title" className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--color-warning-dark)' }} />
                  <span>Pending Reviews</span>
                </h3>
                <p className="dashboard-section-subtitle">
                  Submissions requiring expert domain evaluation and attribution verification
                </p>
              </div>
              <Link to="/reviews" className="dashboard-section-action text-xs">
                View review queue
              </Link>
            </div>

            <div className="pending-reviews-list">
              {pendingReviews && pendingReviews.length > 0 ? (
                pendingReviews.map((review) => (
                  <div key={review.id} className="pending-review-item">
                    <div className="pending-review-top">
                      <div className="flex items-center gap-2">
                        <span className="pending-review-artifact">{review.contribution_id}</span>
                        <StatusBadge status={review.integrity_status || 'needs_review'} />
                        {review.similarity_score && (
                          <span className="badge badge-warning text-xs">
                            {review.similarity_score}% similarity detected
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-secondary">
                        {formatRelativeTime(review.created_at)}
                      </span>
                    </div>

                    {review.comments && (
                      <p className="pending-review-notes">
                        <strong>Review Note:</strong> {review.comments}
                      </p>
                    )}

                    <div className="pending-review-actions">
                      <span className="text-xs text-secondary">
                        Assigned Reviewer: {review.reviewer?.name}
                      </span>
                      <Link to={`/reviews`} className="btn btn-primary btn-sm">
                        Evaluate Lineage
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state py-4">
                  <p className="text-sm text-secondary">All pending peer reviews are up to date!</p>
                </div>
              )}
            </div>
          </section>

          {/* Section: Recommended Projects */}
          <section className="dashboard-section" aria-labelledby="expert-recommended-projects">
            <div className="dashboard-section-header">
              <div className="dashboard-section-title-group">
                <h2 id="expert-recommended-projects" className="dashboard-section-title">
                  Recommended Projects
                </h2>
                <p className="dashboard-section-subtitle">
                  Research initiatives seeking your advisory domain expertise
                </p>
              </div>
              <Link to="/projects/discover" className="dashboard-section-action">
                <span>Browse all</span>
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
                  <p>No project advisory recommendations found.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (Narrower): Recent Contributions */}
        <div className="dashboard-col-right">
          <section className="card" aria-labelledby="recent-contributions-title">
            <div className="card-header">
              <div className="dashboard-section-title-group">
                <h3 id="recent-contributions-title" className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <FileCheck size={20} style={{ color: 'var(--color-accent-dark)' }} />
                  <span>Recent Contributions</span>
                </h3>
                <p className="text-xs text-secondary">
                  Audited code and technical research artifacts
                </p>
              </div>
              <Link to="/contributions" className="dashboard-section-action text-xs">
                History
              </Link>
            </div>

            <div className="activity-list">
              {contributions && contributions.length > 0 ? (
                contributions.map((item) => (
                  <div key={item.id} className="activity-item">
                    <div className="activity-content">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-primary">
                          {item.artifact}
                        </span>
                        <StatusBadge status={item.status} />
                      </div>
                      <div className="text-xs text-secondary mt-1">
                        Contributor: {item.contributor?.name} ({item.contributor?.role})
                      </div>
                      <div className="text-xs text-secondary">
                        Origin: {item.origin === 'ai_assisted' ? '🤖 AI-Assisted' : '👤 Human'}
                        {item.impact_score && ` • Impact: ${item.impact_score}/10`}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-mono text-xs text-tertiary">
                          {truncateHash(item.hash, 8)}
                        </span>
                        <span className="activity-item-time">
                          {formatRelativeTime(item.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-secondary text-center py-4">No recent contributions found.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
