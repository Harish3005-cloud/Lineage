import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './LoginPage.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const demoAccounts = [
    { role: 'Student', email: 'student@lineage.dev' },
    { role: 'Expert', email: 'expert@lineage.dev' },
    { role: 'Sponsor', email: 'sponsor@lineage.dev' },
    { role: 'Admin', email: 'admin@lineage.dev' },
  ];

  const handleQuickFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo1234');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      // Pass a custom no-op navigator to prevent AuthContext from reloading window.location
      const result = await login(email.trim(), password, () => {});
      
      const userRole = result?.user?.role;
      
      // Navigate based on role:
      // student/expert/sponsor -> '/dashboard'
      // admin -> '/dashboard'
      switch (userRole) {
        case 'student':
        case 'expert':
        case 'sponsor':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
          break;
      }
    } catch (err) {
      setError(
        err?.message || 'Invalid email or password. Please verify your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <span className="auth-brand-icon">L</span>
          </div>
          <span className="auth-brand-title">LINEAGE</span>
        </div>

        {/* Title & Subtitle */}
        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your LINEAGE account</p>
        </div>

        {/* Error message above form */}
        {error && (
          <div className="auth-error-alert" role="alert">
            <AlertCircle className="auth-error-icon" size={18} />
            <div className="auth-error-text">{error}</div>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email
            </label>
            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" size={18} />
              <input
                id="login-email"
                type="email"
                className="form-input auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="auth-label-row">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
            </div>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={18} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="current-password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="auth-spinner" size={20} />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Registration Link */}
        <div className="auth-footer-prompt">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </div>

        {/* Subtle Demo Credentials Info Box */}
        <div className="auth-demo-box">
          <div className="auth-demo-header">
            <ShieldCheck size={16} className="auth-demo-icon" />
            <span className="auth-demo-headline">Quick Demo Access</span>
          </div>
          <p className="auth-demo-text">
            Demo accounts: student@lineage.dev, expert@lineage.dev, sponsor@lineage.dev, admin@lineage.dev (any password)
          </p>
          <div className="auth-demo-pills">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                className="auth-demo-pill"
                onClick={() => handleQuickFill(account.email)}
                title={`Auto-fill ${account.role} credentials`}
              >
                {account.role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
