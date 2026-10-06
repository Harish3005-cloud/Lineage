import { Inbox } from 'lucide-react';

/**
 * Empty state component for when there's no data to display.
 */
export default function EmptyState({
  icon,
  title = 'No data found',
  message = 'There is nothing to display at the moment.',
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {icon || <Inbox size={64} />}
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action && <div style={{ marginTop: 'var(--space-4)' }}>{action}</div>}
    </div>
  );
}
