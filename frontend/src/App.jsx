import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './layouts/AppLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import WorkspacePage from './pages/WorkspacePage';
import PostProjectPage from './pages/PostProjectPage';
import NonMonetaryProjectPage from './pages/NonMonetaryProjectPage';
import MatchingPage from './pages/MatchingPage';
import ContributionsPage from './pages/ContributionsPage';
import AiActivityPage from './pages/AiActivityPage';
import IntegrityPage from './pages/IntegrityPage';
import LedgerPage from './pages/LedgerPage';
import CharterPage from './pages/CharterPage';
import CreditEscrowPage from './pages/CreditEscrowPage';
import ReviewQueuePage from './pages/ReviewQueuePage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public landing & auth routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Workspace & Governance Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="/workspace" element={<WorkspacePage />} />
              <Route path="/post-project" element={<PostProjectPage />} />
              <Route path="/non-monetary" element={<NonMonetaryProjectPage />} />
              <Route path="/matching" element={<MatchingPage />} />
              <Route path="/contributions" element={<ContributionsPage />} />
              <Route path="/ai-activity" element={<AiActivityPage />} />
              <Route path="/integrity" element={<IntegrityPage />} />
              <Route path="/ledger" element={<LedgerPage />} />
              <Route path="/charter" element={<CharterPage />} />
              <Route path="/credit" element={<CreditEscrowPage />} />
              <Route path="/reviews" element={<ReviewQueuePage />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
