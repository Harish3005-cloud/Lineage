import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/layout/Header';
import StudentDashboard from './StudentDashboard';
import ExpertDashboard from './ExpertDashboard';
import SponsorDashboard from './SponsorDashboard';
import AdminDashboard from './AdminDashboard';
import './DashboardPage.css';

/**
 * DashboardPage
 * Main role-based dashboard router for LINEAGE.
 * Determines the authenticated user's role and renders the corresponding view
 * with a contextual header and actions.
 */
export default function DashboardPage({ roleOverride }) {
  const { user, isLoading } = useAuth();

  // Resolved role: prop override takes precedence, then user profile, defaulting to 'student'
  const role = roleOverride || user?.role || 'student';

  // Role metadata mapping for header
  const getRoleHeaderInfo = (currentRole) => {
    switch (currentRole) {
      case 'expert':
        return {
          title: 'Expert Dashboard',
          subtitle: 'Peer review submissions, guide student cohorts, and verify research integrity',
        };
      case 'sponsor':
        return {
          title: 'Sponsor Dashboard',
          subtitle: 'Manage research charters, monitor milestone escrow, and review candidate applications',
        };
      case 'admin':
        return {
          title: 'Admin Dashboard',
          subtitle: 'Platform governance, ledger integrity audits, and dispute resolution',
        };
      case 'student':
      default:
        return {
          title: 'Student Dashboard',
          subtitle: 'Discover AI-matched projects, track milestone progress, and build verifiable lineage',
        };
    }
  };

  const { title, subtitle } = getRoleHeaderInfo(role);

  // Render role dashboard component
  const renderDashboardComponent = () => {
    switch (role) {
      case 'expert':
        return <ExpertDashboard />;
      case 'sponsor':
        return <SponsorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'student':
      default:
        return <StudentDashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <Header title="Dashboard" subtitle="Loading your workspace..." />
        <main className="dashboard-main-container">
          <div className="dashboard-content">
            <div className="loading-screen">
              <div className="spinner spinner-lg"></div>
              <p>Authenticating and loading dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Header
        title={title}
        subtitle={subtitle}
      />
      <main className="dashboard-main-container">
        {renderDashboardComponent()}
      </main>
    </div>
  );
}
