import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Error state component for failed data loads.
 */
export default function ErrorState({
  title = 'Something went wrong',
  message = 'Unable to load data. Please try again.',
  onRetry,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <AlertCircle size={64} style={{ color: 'var(--color-error)' }} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry} style={{ marginTop: 'var(--space-4)' }}>
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}
