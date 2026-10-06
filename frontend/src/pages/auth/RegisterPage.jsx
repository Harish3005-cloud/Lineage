import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  Building2,
  Mail,
  Lock,
  User,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  X,
  ShieldAlert,
  Plus,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './RegisterPage.css';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('student');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [availability, setAvailability] = useState('part-time');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Role options (Student, Expert, Sponsor - Admin is NOT public)
  const roleOptions = [
    {
      id: 'student',
      title: 'Student',
      description: 'Contribute to research projects and learn by doing',
      icon: GraduationCap,
    },
    {
      id: 'expert',
      title: 'Expert',
      description: 'Guide research and share your domain expertise',
      icon: Award,
    },
    {
      id: 'sponsor',
      title: 'Sponsor',
      description: 'Fund research projects and track progress',
      icon: Building2,
    },
  ];

  // Check if user is minor (< 18)
  const numericAge = age !== '' ? Number(age) : null;
  const isMinor = numericAge !== null && !isNaN(numericAge) && numericAge < 18;

  // Skills input handlers
  const addSkill = (newSkillText) => {
    if (!newSkillText) return;
    const candidates = newSkillText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated = [...skills];
    candidates.forEach((cand) => {
      if (!updated.some((item) => item.toLowerCase() === cand.toLowerCase())) {
        updated.push(cand);
      }
    });

    setSkills(updated);
    setSkillInput('');
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    if (value.includes(',')) {
      addSkill(value);
    } else {
      setSkillInput(value);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Form submission & validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation: Required fields
    if (!fullName.trim()) {
      setError('Full Name is required.');
      return;
    }

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    // Validation: Password min length 8
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Validation: Passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    // Validation: Age >= 13
    if (age === '' || isNaN(numericAge)) {
      setError('Please provide a valid age.');
      return;
    }

    if (numericAge < 13) {
      setError('You must be at least 13 years old to join LINEAGE.');
      return;
    }

    if (!role) {
      setError('Please select a platform role.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        age: numericAge,
        role,
        skills,
        availability,
        guardian_consent: isMinor ? 'pending' : 'not_required',
      };

      const result = await register(payload, () => {});
      
      // Navigate to dashboard or role dashboard on success
      const destination = result?.redirectPath || '/dashboard';
      navigate(destination);
    } catch (err) {
      setError(
        err?.message || 'Registration failed. An account with this email may already exist.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        {/* Brand Header */}
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <span className="auth-brand-icon">L</span>
          </div>
          <span className="auth-brand-title">LINEAGE</span>
        </div>

        {/* Title & Subtitle */}
        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join the LINEAGE research ecosystem</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="auth-error-alert" role="alert">
            <AlertCircle className="auth-error-icon" size={18} />
            <div className="auth-error-text">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
              Full Name <span className="required-star">*</span>
            </label>
            <div className="auth-input-wrapper">
              <User className="auth-input-icon" size={18} />
              <input
                id="reg-name"
                type="text"
                className="form-input auth-input"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="name"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email <span className="required-star">*</span>
            </label>
            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" size={18} />
              <input
                id="reg-email"
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

          {/* Password & Confirm Password Row */}
          <div className="register-grid-2">
            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">
                Password <span className="required-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input auth-input"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  autoComplete="new-password"
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
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm-password" className="form-label">
                Confirm Password <span className="required-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input auth-input"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError('');
                  }}
                  autoComplete="new-password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Age & Availability Row */}
          <div className="register-grid-2">
            <div className="form-group">
              <label htmlFor="reg-age" className="form-label">
                Age <span className="required-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Calendar className="auth-input-icon" size={18} />
                <input
                  id="reg-age"
                  type="number"
                  min="13"
                  max="120"
                  className="form-input auth-input"
                  placeholder="e.g. 18"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    if (error) setError('');
                  }}
                  required
                  disabled={loading}
                />
              </div>
              <span className="form-hint">Must be 13 or older</span>
            </div>

            <div className="form-group">
              <label htmlFor="reg-availability" className="form-label">
                Availability
              </label>
              <div className="auth-input-wrapper">
                <Clock className="auth-input-icon" size={18} />
                <select
                  id="reg-availability"
                  className="form-input auth-input auth-select"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  disabled={loading}
                >
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time</option>
                  <option value="advisory">Advisory</option>
                </select>
              </div>
              <span className="form-hint">Weekly time commitment</span>
            </div>
          </div>

          {/* Guardian Consent Notice if Age < 18 */}
          {isMinor && (
            <div className="guardian-consent-notice" role="note">
              <div className="guardian-consent-top">
                <ShieldAlert className="guardian-consent-icon" size={18} />
                <span className="badge badge-warning guardian-consent-badge">
                  Guardian Consent: Pending
                </span>
              </div>
              <p className="guardian-consent-text">
                You are under 18. For paid workspace access, guardian consent will be required.
              </p>
            </div>
          )}

          {/* Role Selection: 3 Clickable Role Cards */}
          <div className="form-group">
            <label className="form-label">
              Role Selection <span className="required-star">*</span>
            </label>
            <div className="role-cards-grid" role="radiogroup" aria-label="Select your platform role">
              {roleOptions.map((opt) => {
                const isSelected = role === opt.id;
                const IconComponent = opt.icon;
                return (
                  <div
                    key={opt.id}
                    className={`role-card ${isSelected ? 'role-card-selected' : ''}`}
                    onClick={() => setRole(opt.id)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setRole(opt.id);
                      }
                    }}
                  >
                    <div className="role-card-header">
                      <div className={`role-card-icon-wrap ${isSelected ? 'role-card-icon-active' : ''}`}>
                        <IconComponent size={20} />
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={16} className="role-card-check" />
                      )}
                    </div>
                    <div className="role-card-title">{opt.title}</div>
                    <div className="role-card-description">{opt.description}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills Input with Removable Chips */}
          <div className="form-group">
            <label htmlFor="reg-skills" className="form-label">
              Skills
            </label>
            <div className="skills-input-row">
              <input
                id="reg-skills"
                type="text"
                className="form-input"
                placeholder="Type a skill and press Enter or comma"
                value={skillInput}
                onChange={handleSkillInputChange}
                onKeyDown={handleSkillKeyDown}
                disabled={loading}
              />
              <button
                type="button"
                className="btn btn-outline skills-add-btn"
                onClick={() => addSkill(skillInput)}
                disabled={!skillInput.trim() || loading}
                title="Add skill"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
            <span className="form-hint">
              Examples: Python, Machine Learning, Data Analysis, PyTorch
            </span>

            {/* Removable chips display */}
            {skills.length > 0 && (
              <div className="skills-chips-wrapper" aria-label="Selected skills">
                {skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    <span className="skill-chip-label">{skill}</span>
                    <button
                      type="button"
                      className="skill-chip-remove"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove skill ${skill}`}
                      title={`Remove ${skill}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="auth-spinner" size={20} />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Link back to login */}
        <div className="auth-footer-prompt">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
