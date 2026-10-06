import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatCurrency, truncateText, getMatchScoreColor, getCompletionPercentage } from '../../utils/formatters';
import './ProjectCard.css';

/**
 * Project card for listings and dashboards.
 */
export default function ProjectCard({ project, showMatchScore = false }) {
  const navigate = useNavigate();
  const completionPct = getCompletionPercentage(project.milestones_completed, project.milestones_total);

  return (
    <div
      className="project-card card"
      onClick={() => navigate(`/projects/${project.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="project-card-header">
        <div className="project-card-category">
          <StatusBadge status={project.status} />
          <span className="badge badge-neutral">{project.category}</span>
        </div>
        {showMatchScore && project.match_score && (
          <div
            className="project-card-match"
            style={{ color: getMatchScoreColor(project.match_score) }}
          >
            <span className="project-card-match-score">{project.match_score}%</span>
            <span className="project-card-match-label">match</span>
          </div>
        )}
      </div>

      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-summary">{truncateText(project.public_summary, 120)}</p>

      <div className="project-card-skills">
        {project.skills_required?.slice(0, 4).map((skill) => (
          <span key={skill} className="badge badge-primary">{skill}</span>
        ))}
        {project.skills_required?.length > 4 && (
          <span className="badge badge-neutral">+{project.skills_required.length - 4}</span>
        )}
      </div>

      {showMatchScore && project.match_reasons && (
        <div className="project-card-reasons">
          {project.match_reasons.slice(0, 2).map((reason, i) => (
            <div key={i} className="project-card-reason">
              <span className="project-card-reason-check">✓</span>
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}

      <div className="project-card-footer">
        <div className="project-card-meta">
          <span className="project-card-budget">
            {formatCurrency(project.budget, project.currency)}
          </span>
          <span className="project-card-sponsor">
            by {project.sponsor?.name}
          </span>
        </div>
        {project.milestones_total > 0 && (
          <div className="project-card-progress">
            <div className="progress-bar" style={{ width: '80px' }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <span className="text-xs text-secondary">
              {project.milestones_completed}/{project.milestones_total}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
