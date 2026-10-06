import { getStatusVariant, getStatusLabel } from '../../utils/formatters';

/**
 * Status badge component with semantic coloring.
 * @param {string} status - Status key (e.g., 'active', 'flagged', 'accepted')
 * @param {string} [variant] - Override variant (primary, accent, success, warning, error, info, neutral)
 * @param {string} [label] - Override display label
 * @param {React.ReactNode} [icon] - Optional icon before label
 */
export default function StatusBadge({ status, variant, label, icon, className = '' }) {
  const resolvedVariant = variant || getStatusVariant(status);
  const resolvedLabel = label || getStatusLabel(status);

  return (
    <span className={`badge badge-${resolvedVariant} ${className}`}>
      {icon && icon}
      {resolvedLabel}
    </span>
  );
}
