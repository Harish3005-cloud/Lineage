import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Protects routes from unauthenticated access.
 * Optionally restricts by role(s).
 */
export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner spinner-lg"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return (
      <div className="loading-screen" style={{ minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-error)', marginBottom: 'var(--space-4)' }}>
            403 — Access Denied
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            You do not have permission to access this page.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 'var(--space-6)' }}
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
}
