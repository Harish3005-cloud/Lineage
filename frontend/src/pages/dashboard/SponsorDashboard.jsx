import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../../components/common/ProjectCard';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, getInitials } from '../../utils/formatters';
import {
  MOCK_PROJECTS,
  MOCK_DASHBOARD_STATS,
  MOCK_ESCROW,
  MOCK_MATCHING,
} from '../../utils/mockData';
import {
  PlusCircle,
  FolderKanban,
  Flame,
  Coins,
  CheckCircle2,
  Users,
  Target,
  ShieldCheck,
  ArrowRight,
  Wallet,
  Clock,
  Sparkles,
} from 'lucide-react';

/**
 * Sponsor Dashboard
 * Allows sponsors to oversee active research grants, track milestone-driven escrow,
 * evaluate inbound talent applications, and launch new project charters.
 */
export default function SponsorDashboard({
  stats: propStats,
  projects: propProjects,
  escrow: propEscrow,
  applications: propApplications,
  isLoading = false,
  error = null,
}) {
  const stats = propStats || MOCK_DASHBOARD_STATS.sponsor;
  const projects = propProjects || MOCK_PROJECTS;
  const escrow = propEscrow || MOCK_ESCROW;
  const applications = propApplications || MOCK_MATCHING.slice(0, 3);

  const [filterStatus, setFilterStatus] = useState('all');

  // Filter projects by sponsor (or show all for demo)
  const myProjects = projects.filter((p) => p.sponsor?.id === 3 || true);

  if (isLoading) {
    return (
      <div className="dashboard-content">
        <div className="loading-screen">
          <div className="spinner spinner-lg"></div>
          <p>Loading sponsor dashboard...</p>
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
      {/* ── Top CTA Banner ── */}
      <div className="sponsor-cta-banner">
        <div className="sponsor-cta-text">
          <h2>Fund Verified Research Milestones</h2>
          <p>
            Create deterministic milestone charters with smart escrow and cryptographic contribution lineage.
          </p>
        </div>
        <Link to="/projects/create" className="sponsor-btn-create">
          <PlusCircle size={20} />
          <span>+ Create Research Project</span>
        </Link>
      </div>

      {/* ── Stats Grid (6 stat cards using 3 or 6 col grid) ── */}
      <section className="stats-grid grid-3" aria-label="Sponsor Key Metrics">
        {/* Total Projects */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Projects</span>
            <div className="stat-icon-wrapper stat-icon-primary">
              <FolderKanban size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.total_projects ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Authored project charters</span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Active Projects</span>
            <div className="stat-icon-wrapper stat-icon-accent">
              <Flame size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.active_projects ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Currently in research sprint</span>
          </div>
        </div>

        {/* Total Budget */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Budget</span>
            <div className="stat-icon-wrapper stat-icon-success">
              <Wallet size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">
              {formatCurrency(stats.total_budget, stats.currency || '₹')}
            </span>
          </div>
          <div className="stat-card-footer">
            <span>Committed project capital</span>
          </div>
        </div>

        {/* Released Funds */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Released Funds</span>
            <div className="stat-icon-wrapper stat-icon-success">
              <Coins size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">
              {formatCurrency(stats.released_funds, stats.currency || '₹')}
            </span>
          </div>
          <div className="stat-card-footer text-success">
            <span>Disbursed for verified milestones</span>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Pending Applications</span>
            <div className="stat-icon-wrapper stat-icon-warning">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.pending_applications ?? 0}</span>
          </div>
          <div className="stat-card-footer text-warning">
            <span>Awaiting sponsor review</span>
          </div>
        </div>

        {/* Milestones Completed */}
        <div className="card dashboard-stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Milestones Completed</span>
            <div className="stat-icon-wrapper stat-icon-primary">
              <Target size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{stats.milestones_completed ?? 0}</span>
          </div>
          <div className="stat-card-footer">
            <span>Signed off by expert review</span>
          </div>
        </div>
      </section>

      {/* ── Section: Budget Overview & Escrow Status ── */}
      <section className="card budget-overview-card" aria-labelledby="budget-overview-title">
        <div className="card-header">
          <div className="dashboard-section-title-group">
            <h3 id="budget-overview-title" className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <ShieldCheck size={22} style={{ color: 'var(--color-success)' }} />
              <span>Budget Overview & Smart Escrow Status</span>
            </h3>
            <p className="dashboard-section-subtitle">
              Escrow funds are programmatically locked and released solely upon cryptographic proof of artifact delivery.
            </p>
          </div>
          <StatusBadge status={escrow.status || 'funded'} />
        </div>

        <div className="escrow-breakdown-grid">
          <div className="escrow-metric-box">
            <span className="escrow-metric-label">Total Escrow Budget</span>
            <span className="escrow-metric-value">{formatCurrency(escrow.total_budget, escrow.currency)}</span>
          </div>
          <div className="escrow-metric-box">
            <span className="escrow-metric-label">Funded Amount</span>
            <span className="escrow-metric-value text-accent">{formatCurrency(escrow.funded_amount, escrow.currency)}</span>
          </div>
          <div className="escrow-metric-box">
            <span className="escrow-metric-label">Released Funds</span>
            <span className="escrow-metric-value text-success">{formatCurrency(escrow.released_amount, escrow.currency)}</span>
          </div>
          <div className="escrow-metric-box">
            <span className="escrow-metric-label">Remaining In Escrow</span>
            <span className="escrow-metric-value">{formatCurrency(escrow.remaining, escrow.currency)}</span>
          </div>
        </div>

        {/* Milestones Escrow Table */}
        <div className="table-container">
          <table className="milestones-escrow-table">
            <thead>
              <tr>
                <th>Milestone</th>
                <th>Target Deliverable</th>
                <th>Allocated Amount</th>
                <th>Escrow Status</th>
              </tr>
            </thead>
            <tbody>
              {escrow.milestones?.map((m) => (
                <tr key={m.milestone_id}>
                  <td className="font-semibold">Milestone {m.milestone_id}</td>
                  <td className="text-secondary">
                    {m.milestone_id === 1 && 'Dataset Preparation & Preprocessing Pipeline'}
                    {m.milestone_id === 2 && 'Model Architecture Development & Training'}
                    {m.milestone_id === 3 && 'Edge Deployment & Quantization Validation'}
                  </td>
                  <td className="font-mono">{formatCurrency(m.amount, escrow.currency)}</td>
                  <td>
                    <StatusBadge status={m.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Two Column Layout for Projects & Applications ── */}
      <div className="dashboard-two-col">
        {/* Left Column (Wider): My Projects */}
        <div className="dashboard-col-left">
          <section className="dashboard-section" aria-labelledby="my-projects-title">
            <div className="dashboard-section-header">
              <div className="dashboard-section-title-group">
                <h2 id="my-projects-title" className="dashboard-section-title">
                  My Projects
                </h2>
                <p className="dashboard-section-subtitle">
                  Track progress, milestones, and deliverables across your active grants
                </p>
              </div>
              <Link to="/projects" className="dashboard-section-action">
                <span>Manage all</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="projects-stack">
              {myProjects && myProjects.length > 0 ? (
                myProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    showMatchScore={false}
                  />
                ))
              ) : (
                <div className="card empty-state">
                  <p>You have not created any projects yet.</p>
                  <Link to="/projects/create" className="btn btn-primary btn-sm mt-3">
                    Create First Project
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (Narrower): Recent Applications */}
        <div className="dashboard-col-right">
          <section className="card" aria-labelledby="recent-applications-title">
            <div className="card-header">
              <div className="dashboard-section-title-group">
                <h3 id="recent-applications-title" className="card-title">
                  Recent Applications
                </h3>
                <p className="text-xs text-secondary">
                  Applicants matched by LINEAGE automated scoring
                </p>
              </div>
              <Link to="/applicants" className="dashboard-section-action text-xs">
                View all ({stats.pending_applications})
              </Link>
            </div>

            <div className="applications-list">
              {applications && applications.length > 0 ? (
                applications.map((applicant, idx) => (
                  <div key={idx} className="application-card-item">
                    <div className="application-applicant-info">
                      <div
                        className="avatar avatar-md"
                        style={{ background: applicant.user?.avatar_color || 'var(--color-primary-600)' }}
                      >
                        {getInitials(applicant.user?.name)}
                      </div>
                      <div className="application-applicant-details">
                        <span className="application-name">{applicant.user?.name}</span>
                        <span className="application-role-meta">
                          {applicant.user?.role} • {applicant.availability}
                        </span>
                        <div className="application-skills-pills">
                          {applicant.skills?.slice(0, 2).map((skill) => (
                            <span key={skill} className="badge badge-neutral text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="badge badge-accent">
                        <Sparkles size={12} />
                        {applicant.match_score}% match
                      </span>
                      <Link to="/applicants" className="btn btn-outline btn-sm mt-1">
                        Review
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-secondary text-center py-4">No pending applications.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
