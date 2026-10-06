import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import StatusBadge from '../../components/common/StatusBadge';
import {
  formatCurrency,
  formatDate,
  truncateHash,
  getInitials,
  getMatchScoreColor,
} from '../../utils/formatters';
import {
  MOCK_PROJECTS,
  MOCK_MILESTONES,
  MOCK_CHARTER,
  MOCK_CONTRIBUTIONS,
  MOCK_TRUST_OVERVIEW,
  MOCK_MATCHING,
} from '../../utils/mockData';
import {
  Lock,
  CheckCircle2,
  AlertTriangle,
  Check,
  Calendar,
  Users,
  Target,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Award,
  Layers,
  FileCheck,
  Cpu,
  Building2,
  FolderKanban,
  ExternalLink,
  ShieldAlert,
  Coins,
  Clock,
  Sparkle,
} from 'lucide-react';
import './ProjectDetailsPage.css';

/**
 * Trust overview checklist items definition
 */
const TRUST_ITEM_KEYS = [
  { key: 'charter', label: 'Charter', description: 'Project charter ratified with team roles and intellectual property terms.' },
  { key: 'team', label: 'Team', description: 'Participating members verified with signed agreements and role assignments.' },
  { key: 'ai_activity', label: 'AI Activity', description: 'Audit log of model usage, code generations, and transparency disclosures.' },
  { key: 'contributions', label: 'Contributions', description: 'Code and research artifact provenance captured with cryptographic hashes.' },
  { key: 'integrity', label: 'Integrity', description: 'Automated novelty and similarity analysis conducted against public repositories.' },
  { key: 'ledger', label: 'Ledger', description: 'Immutable hash chain linking all milestone submissions and review verdicts.' },
  { key: 'escrow', label: 'Escrow', description: 'Milestone funds deposited and secured for performance-based distribution.' },
];

/**
 * ProjectDetailsPage Component
 * Displays comprehensive project details with tabbed navigation:
 * Overview | Charter | Milestones | Team | Contributions | Integrity | Rewards
 */
export default function ProjectDetailsPage({
  projectId: propProjectId,
  initialProject,
  initialMilestones,
  initialCharter,
  initialContributions,
  initialTrustOverview,
  initialTeam,
}) {
  const { id: paramId } = useParams();
  const effectiveId = propProjectId || paramId;

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Interactive Charter acceptance state
  const [charterAccepted, setCharterAccepted] = useState(false);
  const [charterAcceptedMessage, setCharterAcceptedMessage] = useState('');

  // Find project data
  const project = initialProject || MOCK_PROJECTS.find((p) => String(p.id) === String(effectiveId));

  // If project not found, render empty state
  if (!project) {
    return (
      <div className="project-details-page">
        <Header
          title="Project Details"
          subtitle="Project not found"
          actions={
            <Link to="/projects" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          }
        />
        <div className="dashboard-content">
          <div className="empty-state card">
            <FolderKanban className="empty-state-icon" />
            <h2 className="empty-state-title">Project not found</h2>
            <p className="empty-state-desc">
              The project with identifier <strong>#{effectiveId || 'unknown'}</strong> does not exist or has been removed.
            </p>
            <Link to="/projects" className="btn btn-primary mt-4">
              <ArrowLeft size={16} /> Return to Projects Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Related data (scoped or mock fallbacks)
  const milestones = initialMilestones || (
    MOCK_MILESTONES.filter((m) => String(m.project_id) === String(project.id)).length > 0
      ? MOCK_MILESTONES.filter((m) => String(m.project_id) === String(project.id))
      : MOCK_MILESTONES
  );

  const charter = initialCharter || MOCK_CHARTER;
  const contributions = initialContributions || MOCK_CONTRIBUTIONS;
  const trustOverview = initialTrustOverview || MOCK_TRUST_OVERVIEW;
  const teamMembers = initialTeam || MOCK_MATCHING;

  // Handle Charter acceptance action
  const handleAcceptCharter = () => {
    setCharterAccepted(true);
    setCharterAcceptedMessage('You have successfully accepted the Project Charter terms.');
  };

  // Tabs list
  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'charter', label: 'Charter' },
    { id: 'milestones', label: 'Milestones', count: milestones.length },
    { id: 'team', label: 'Team', count: teamMembers.length },
    { id: 'contributions', label: 'Contributions', count: contributions.length },
    { id: 'integrity', label: 'Integrity' },
    { id: 'rewards', label: 'Rewards' },
  ];

  return (
    <div className="project-details-page">
      {/* Top Header */}
      <Header
        title={project.title}
        subtitle={`${project.category} • ${project.domain}`}
        actions={
          <div className="project-header-actions">
            <StatusBadge status={project.status} />
          </div>
        }
      />

      {/* Main Content Area */}
      <div className="dashboard-content">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="project-navigation-bar">
          <Link to="/projects" className="project-back-link">
            <ArrowLeft size={16} />
            <span>All Projects</span>
          </Link>
          <div className="project-id-tag">Project ID: #{project.id}</div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-container">
          <div className="tabs" role="tablist" aria-label="Project Sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="tab-count-badge">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="tab-content">
          {/* ========================================================
              TAB: OVERVIEW
              ======================================================== */}
          {activeTab === 'overview' && (
            <div className="overview-tab-content">
              {/* Quick Stats Grid */}
              <div className="stats-grid">
                <div className="card stat-card">
                  <div className="stat-card-icon">
                    <Users size={20} />
                  </div>
                  <div className="stat-value">{project.team_size || 0}</div>
                  <div className="stat-label">Team Size</div>
                </div>

                <div className="card stat-card">
                  <div className="stat-card-icon">
                    <Target size={20} />
                  </div>
                  <div className="stat-value">{project.milestones_total || 0}</div>
                  <div className="stat-label">Milestones Total</div>
                </div>

                <div className="card stat-card">
                  <div className="stat-card-icon">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="stat-value">{project.milestones_completed || 0}</div>
                  <div className="stat-label">Milestones Completed</div>
                </div>

                <div className="card stat-card">
                  <div className="stat-card-icon">
                    <Coins size={20} />
                  </div>
                  <div className="stat-value">{formatCurrency(project.budget, project.currency)}</div>
                  <div className="stat-label">Total Escrow Budget</div>
                </div>
              </div>

              {/* Primary Project Information Card */}
              <div className="card project-info-card">
                <div className="project-info-header">
                  <div>
                    <span className="project-category-badge">{project.category}</span>
                    <h2 className="project-info-title">{project.title}</h2>
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                {/* Key Metadata Row */}
                <div className="project-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Domain</span>
                    <span className="meta-value">{project.domain || 'Not specified'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Sponsor</span>
                    <span className="meta-value sponsor-value">
                      <Building2 size={16} />
                      {project.sponsor?.name}
                      {project.sponsor?.organization ? ` (${project.sponsor.organization})` : ''}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Allocated Budget</span>
                    <span className="meta-value font-semibold">
                      {formatCurrency(project.budget, project.currency)}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Created Date</span>
                    <span className="meta-value">{formatDate(project.created_at)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Last Updated</span>
                    <span className="meta-value">{formatDate(project.updated_at)}</span>
                  </div>
                </div>

                {/* Public Summary */}
                <div className="project-section-block">
                  <h3 className="section-subtitle">Public Summary</h3>
                  <p className="project-summary-text">{project.public_summary}</p>
                </div>

                {/* Skills Required */}
                <div className="project-section-block">
                  <h3 className="section-subtitle">Skills Required</h3>
                  <div className="skills-badge-list">
                    {project.skills_required && project.skills_required.length > 0 ? (
                      project.skills_required.map((skill) => (
                        <span key={skill} className="badge badge-neutral skill-badge">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-secondary text-sm">No specific skills listed.</span>
                    )}
                  </div>
                </div>

                {/* Confidential Brief Notice */}
                <div className="confidential-brief-box">
                  <div className="confidential-lock-icon" aria-hidden="true">
                    🔒
                  </div>
                  <div className="confidential-text-content">
                    <h4 className="confidential-heading">Confidential Brief</h4>
                    <p className="confidential-message">
                      Confidential project information is available after project acceptance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: CHARTER
              ======================================================== */}
          {activeTab === 'charter' && (
            <div className="charter-tab-content">
              <div className="card charter-card">
                {/* Charter Header */}
                <div className="charter-header">
                  <div className="charter-title-group">
                    <h2 className="card-title">Project Charter v{charter.version}</h2>
                    <p className="text-secondary text-sm">
                      Formal collaboration agreement establishing project scope, governance, and IP terms.
                    </p>
                  </div>
                  <div className="charter-status-group">
                    <StatusBadge status={charter.status} />
                  </div>
                </div>

                {/* Scope */}
                <div className="charter-block">
                  <h3 className="charter-block-title">Scope of Work</h3>
                  <div className="charter-text-box">
                    <p>{charter.scope}</p>
                  </div>
                </div>

                {/* Roles & Responsibilities Table */}
                <div className="charter-block">
                  <h3 className="charter-block-title">Governance & Roles</h3>
                  <div className="table-container">
                    <table className="charter-roles-table">
                      <thead>
                        <tr>
                          <th style={{ width: '220px' }}>Role</th>
                          <th>Responsibilities</th>
                        </tr>
                      </thead>
                      <tbody>
                        {charter.roles && charter.roles.length > 0 ? (
                          charter.roles.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                <span className="font-semibold text-primary">{item.role}</span>
                              </td>
                              <td className="text-secondary">{item.responsibilities}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="text-center text-secondary">
                              No role definitions configured.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reward Terms */}
                <div className="charter-block">
                  <h3 className="charter-block-title">Reward Distribution Terms</h3>
                  <div className="charter-text-box">
                    <p>{charter.reward_terms}</p>
                  </div>
                </div>

                {/* Acceptance Criteria */}
                <div className="charter-block">
                  <h3 className="charter-block-title">Acceptance Criteria</h3>
                  <div className="charter-text-box">
                    <p>{charter.acceptance_criteria}</p>
                  </div>
                </div>

                {/* IP Terms */}
                <div className="charter-block">
                  <h3 className="charter-block-title">Intellectual Property & Licensing</h3>
                  <div className="charter-text-box">
                    <p>{charter.ip_terms}</p>
                  </div>
                </div>

                {/* Accepted By */}
                <div className="charter-block">
                  <h3 className="charter-block-title">Signatories & Acceptance Log</h3>
                  <div className="accepted-signatories-list">
                    {charter.accepted_by && charter.accepted_by.length > 0 ? (
                      charter.accepted_by.map((signatory) => (
                        <div key={signatory.user_id} className="signatory-card">
                          <div
                            className="avatar avatar-sm"
                            style={{ background: 'var(--color-primary-600)' }}
                          >
                            {getInitials(signatory.name)}
                          </div>
                          <div className="signatory-details">
                            <span className="signatory-name">{signatory.name}</span>
                            <span className="signatory-date">
                              Signed on {formatDate(signatory.accepted_at)}
                            </span>
                          </div>
                          <span className="badge badge-primary">{signatory.role}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-secondary text-sm">No signatories recorded yet.</p>
                    )}

                    {charterAccepted && (
                      <div className="signatory-card signatory-card-new">
                        <div
                          className="avatar avatar-sm"
                          style={{ background: 'var(--color-success-dark)' }}
                        >
                          ✓
                        </div>
                        <div className="signatory-details">
                          <span className="signatory-name">You (Current User)</span>
                          <span className="signatory-date">Signed just now</span>
                        </div>
                        <span className="badge badge-success">Accepted</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Charter Action Area */}
                <div className="charter-action-footer">
                  {charterAcceptedMessage && (
                    <div className="charter-success-alert">
                      <CheckCircle2 size={18} />
                      <span>{charterAcceptedMessage}</span>
                    </div>
                  )}

                  <div className="charter-action-button-row">
                    <button
                      type="button"
                      className={`btn ${charterAccepted ? 'btn-outline' : 'btn-primary'}`}
                      onClick={handleAcceptCharter}
                      disabled={charterAccepted}
                    >
                      {charterAccepted ? (
                        <>
                          <Check size={16} /> Charter Accepted
                        </>
                      ) : (
                        'Accept Charter'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: MILESTONES
              ======================================================== */}
          {activeTab === 'milestones' && (
            <div className="milestones-tab-content">
              {milestones.length === 0 ? (
                <div className="card empty-state">
                  <Target className="empty-state-icon" />
                  <h3 className="card-title">No Milestones Defined</h3>
                  <p className="text-secondary">
                    There are no milestones registered for this project yet.
                  </p>
                </div>
              ) : (
                <div className="milestones-vertical-list">
                  {milestones.map((m) => (
                    <div key={m.id} className="card milestone-item-card">
                      {/* Milestone Header */}
                      <div className="milestone-card-top">
                        <div className="milestone-order-circle">
                          {m.order || m.id}
                        </div>
                        <div className="milestone-title-wrapper">
                          <div className="milestone-badge-row">
                            <StatusBadge status={m.status} />
                            {m.ai_generated && (
                              <span className="badge badge-accent">
                                <Sparkles size={12} /> AI Generated
                              </span>
                            )}
                          </div>
                          <h3 className="milestone-title">{m.title}</h3>
                        </div>
                        <div className="milestone-reward-pill">
                          <span className="reward-label">Reward</span>
                          <span className="reward-value">
                            {formatCurrency(m.reward_amount, project.currency)}
                          </span>
                        </div>
                      </div>

                      {/* Milestone Description */}
                      <p className="milestone-description">{m.description}</p>

                      {/* Skills Required */}
                      {m.skills_required && m.skills_required.length > 0 && (
                        <div className="milestone-skills-group">
                          <span className="milestone-subheading">Skills Required:</span>
                          <div className="milestone-skills-badges">
                            {m.skills_required.map((skill) => (
                              <span key={skill} className="badge badge-neutral">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Acceptance Criteria Checklist */}
                      {m.acceptance_criteria && m.acceptance_criteria.length > 0 && (
                        <div className="milestone-criteria-group">
                          <span className="milestone-subheading">Acceptance Criteria:</span>
                          <ul className="criteria-checklist">
                            {m.acceptance_criteria.map((criteria, cIdx) => (
                              <li key={cIdx} className="criteria-checklist-item">
                                <span className="criteria-check-icon">
                                  <Check size={14} />
                                </span>
                                <span className="criteria-text">{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB: TEAM
              ======================================================== */}
          {activeTab === 'team' && (
            <div className="team-tab-content">
              <div className="team-grid">
                {teamMembers.map((member, idx) => (
                  <div key={member.user?.id || idx} className="card team-member-card">
                    <div className="team-card-header">
                      <div
                        className="avatar avatar-md"
                        style={{
                          background: member.user?.avatar_color || 'var(--color-primary-600)',
                        }}
                      >
                        {getInitials(member.user?.name)}
                      </div>
                      <div className="team-user-meta">
                        <h4 className="team-member-name">{member.user?.name}</h4>
                        <span className="badge badge-neutral team-role-badge">
                          {member.user?.role}
                        </span>
                      </div>
                      <div
                        className="team-match-score"
                        style={{ color: getMatchScoreColor(member.match_score) }}
                      >
                        {member.match_score}%
                        <span className="match-label">Match</span>
                      </div>
                    </div>

                    <div className="team-skills-section">
                      <span className="team-skills-title">Skills & Strengths</span>
                      <div className="team-skills-list">
                        {member.skills && member.skills.map((skill) => (
                          <span key={skill} className="badge badge-neutral">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {member.reasons && member.reasons.length > 0 && (
                      <div className="team-reasons-section">
                        <span className="team-reasons-title">Matching Rationale</span>
                        <ul className="team-reasons-list">
                          {member.reasons.slice(0, 2).map((reason, rIdx) => (
                            <li key={rIdx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: CONTRIBUTIONS
              ======================================================== */}
          {activeTab === 'contributions' && (
            <div className="contributions-tab-content">
              <div className="card contributions-card">
                <div className="card-header">
                  <div>
                    <h2 className="card-title">Project Contributions</h2>
                    <p className="text-secondary text-sm">
                      Immutable record of submitted artifacts, verification states, and lineage signatures.
                    </p>
                  </div>
                  <span className="badge badge-info">{contributions.length} Recorded</span>
                </div>

                <div className="table-container">
                  <table className="contributions-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Contributor</th>
                        <th>Artifact</th>
                        <th>Milestone</th>
                        <th>Origin</th>
                        <th>Status</th>
                        <th>Hash</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contributions && contributions.length > 0 ? (
                        contributions.map((c) => (
                          <tr key={c.id}>
                            <td className="font-mono font-medium text-accent">{c.id}</td>
                            <td>
                              <div className="contributor-cell">
                                <span className="font-medium text-primary">
                                  {c.contributor?.name}
                                </span>
                                <span className="text-xs text-secondary">
                                  {c.contributor?.role}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="artifact-pill font-mono">{c.artifact}</span>
                            </td>
                            <td>
                              <span className="text-sm text-secondary">
                                {c.milestone?.title || `Milestone #${c.milestone?.id || '—'}`}
                              </span>
                            </td>
                            <td>
                              <div className="origin-badge-cell">
                                <span className="origin-text">{c.origin}</span>
                                {c.ai_assisted && (
                                  <span className="badge badge-accent">AI-assisted</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <StatusBadge status={c.status} />
                            </td>
                            <td>
                              <span
                                className="font-mono hash-display"
                                title={c.hash}
                              >
                                {truncateHash(c.hash)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center text-secondary">
                            No contributions recorded for this project yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: INTEGRITY (Project Trust Overview)
              ======================================================== */}
          {activeTab === 'integrity' && (
            <div className="integrity-tab-content">
              <div className="card trust-overview-card">
                {/* Header Banner */}
                <div className="trust-card-header">
                  <div className="trust-header-info">
                    <div className="trust-badge-row">
                      <span className="badge badge-accent">
                        <ShieldCheck size={14} /> Cryptographic Proof
                      </span>
                      <span className="trust-live-tag">LIVE VERIFICATION</span>
                    </div>
                    <h2 className="trust-card-title">Project Trust Overview</h2>
                    <p className="trust-card-description">
                      Continuous real-time verification of team governance, tamper-proof audit trails,
                      and escrow-backed accountability.
                    </p>
                  </div>
                  <div className="trust-seal-box">
                    <ShieldCheck size={36} className="trust-seal-icon" />
                    <span className="trust-seal-text">VERIFIED LINEAGE</span>
                  </div>
                </div>

                {/* Checklist of Trust Items */}
                <div className="trust-checklist">
                  {TRUST_ITEM_KEYS.map((item) => {
                    const data = trustOverview ? trustOverview[item.key] : null;
                    if (!data) return null;

                    const isWarning =
                      data.status === 'review_required' ||
                      data.status === 'flagged' ||
                      data.status === 'warning';

                    return (
                      <div
                        key={item.key}
                        className={`trust-checklist-item ${
                          isWarning ? 'trust-item-warning' : 'trust-item-valid'
                        }`}
                      >
                        {/* Status Icon */}
                        <div className="trust-item-icon-wrapper">
                          {isWarning ? (
                            <span className="trust-icon trust-icon-warning" title="Human Review Required">
                              <span className="trust-icon-symbol">⚠</span>
                              <AlertTriangle size={18} />
                            </span>
                          ) : (
                            <span className="trust-icon trust-icon-success" title="Verified">
                              <span className="trust-icon-symbol">✓</span>
                              <CheckCircle2 size={18} />
                            </span>
                          )}
                        </div>

                        {/* Label & Description */}
                        <div className="trust-item-content">
                          <div className="trust-item-title-row">
                            <h4 className="trust-item-name">{item.label}</h4>
                            <StatusBadge status={data.status} />
                          </div>
                          <p className="trust-item-status-label">{data.label}</p>
                          <p className="trust-item-description">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: REWARDS (Placeholder)
              ======================================================== */}
          {activeTab === 'rewards' && (
            <div className="rewards-tab-content">
              <div className="card rewards-placeholder-card">
                <div className="rewards-icon-wrap">
                  <Award size={48} className="rewards-icon" />
                </div>
                <h3 className="rewards-title">Milestone Rewards</h3>
                <p className="rewards-message">
                  Rewards will be displayed here after milestone completion.
                </p>
                <div className="rewards-summary-box">
                  <div className="rewards-summary-item">
                    <span className="summary-label">Total Allocated Budget</span>
                    <span className="summary-value">
                      {formatCurrency(project.budget, project.currency)}
                    </span>
                  </div>
                  <div className="rewards-summary-item">
                    <span className="summary-label">Milestones Completed</span>
                    <span className="summary-value">
                      {project.milestones_completed} / {project.milestones_total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
