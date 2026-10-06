import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout-left">
        <div className="auth-brand">
          <h1 className="auth-brand-name">LINEAGE</h1>
          <p className="auth-brand-tagline">
            Every contribution has a lineage.
            <br />
            Every reward has evidence.
          </p>
          <div className="auth-brand-features">
            <div className="auth-feature">
              <span className="auth-feature-icon">🔬</span>
              <span>Collaborative Research</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">🤖</span>
              <span>AI-Assisted Discovery</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">🛡️</span>
              <span>Integrity Verification</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">💰</span>
              <span>Fair Rewards</span>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-layout-right">
        <Outlet />
      </div>
    </div>
  );
}
