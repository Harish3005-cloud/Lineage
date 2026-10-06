import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, Award, Building2, Mail, Lock, User,
  Calendar, Clock, Eye, EyeOff, Loader2, AlertCircle, X,
  ShieldAlert, Plus, ArrowRight, CheckCircle2, Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './RegisterPage.css';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('student');
  const [skills, setSkills] = useState(['Python', 'Machine Learning']);
  const [skillInput, setSkillInput] = useState('');
  const [availability, setAvailability] = useState('part-time');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    {
      id: 'student',
      title: 'Student',
      description: 'Contribute code and research to real projects and build a verifiable portfolio.',
      icon: GraduationCap,
    },
    {
      id: 'expert',
      title: 'Expert',
      description: 'Guide scientific direction, review work, and provide domain expertise.',
      icon: Award,
    },
    {
      id: 'sponsor',
      title: 'Sponsor',
      description: 'Fund research projects, set milestones, and track verifiable deliverables.',
      icon: Building2,
    },
  ];

  const numericAge = age !== '' ? Number(age) : null;
  const isMinor = numericAge !== null && !isNaN(numericAge) && numericAge < 18;

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

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!age || Number(age) < 13) {
      setError('You must be at least 13 years old to register');
      return;
    }

    setLoading(true);
    try {
      register({
        fullName,
        email,
        password,
        age: Number(age),
        role,
        skills,
        availability,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        {/* Brand & Header */}
        <div className="register-header">
          <Link to="/" className="register-logo">
            <div className="register-logo-icon">
              <Layers size={22} className="text-blue-600" />
            </div>
            <span className="register-logo-text">LINEAGE</span>
          </Link>
          <h1 className="register-title">Create your account</h1>
          <p className="register-subtitle">
            Join the LINEAGE trusted research ecosystem
          </p>
        </div>

        {/* Form Error Alert */}
        {error && (
          <div className="register-error-alert">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Full Name */}
          <div className="reg-field-group">
            <label className="reg-label">Full Name <span className="text-red-500">*</span></label>
            <div className="reg-input-wrapper">
              <User size={16} className="reg-input-icon" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="reg-input"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="reg-field-group">
            <label className="reg-label">Email Address <span className="text-red-500">*</span></label>
            <div className="reg-input-wrapper">
              <Mail size={16} className="reg-input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="reg-input"
                required
              />
            </div>
          </div>

          {/* Passwords 2-col */}
          <div className="reg-grid-2">
            <div className="reg-field-group">
              <label className="reg-label">Password <span className="text-red-500">*</span></label>
              <div className="reg-input-wrapper">
                <Lock size={16} className="reg-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="reg-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="reg-toggle-pwd"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="reg-field-group">
              <label className="reg-label">Confirm Password <span className="text-red-500">*</span></label>
              <div className="reg-input-wrapper">
                <Lock size={16} className="reg-input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="reg-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="reg-toggle-pwd"
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          {/* Age & Availability 2-col */}
          <div className="reg-grid-2">
            <div className="reg-field-group">
              <label className="reg-label">Age <span className="text-red-500">*</span></label>
              <div className="reg-input-wrapper">
                <Calendar size={16} className="reg-input-icon" />
                <input
                  type="number"
                  min="13"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 19"
                  className="reg-input"
                  required
                />
              </div>
            </div>

            <div className="reg-field-group">
              <label className="reg-label">Availability</label>
              <div className="reg-input-wrapper">
                <Clock size={16} className="reg-input-icon" />
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="reg-input reg-select"
                >
                  <option value="full-time">Full-time (25+ hrs/wk)</option>
                  <option value="part-time">Part-time (10-20 hrs/wk)</option>
                  <option value="advisory">Advisory (Ad-hoc)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Minor Guardian Notice */}
          {isMinor && (
            <div className="reg-minor-notice">
              <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-900 dark:text-amber-200">Guardian Consent Required</div>
                <div className="text-amber-800 dark:text-amber-300 text-xs">
                  You are under 18. For paid workspace access, guardian approval will be recorded on the audit ledger.
                </div>
              </div>
            </div>
          )}

          {/* Role Selection */}
          <div className="reg-field-group">
            <label className="reg-label">Role Selection <span className="text-red-500">*</span></label>
            <div className="reg-role-grid">
              {roleOptions.map((opt) => {
                const IconComp = opt.icon;
                const isSelected = role === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={`reg-role-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="reg-role-icon">
                        <IconComp size={18} />
                      </div>
                      {isSelected && <CheckCircle2 size={16} className="text-blue-600" />}
                    </div>
                    <div className="reg-role-title">{opt.title}</div>
                    <div className="reg-role-desc">{opt.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Chip Input */}
          <div className="reg-field-group">
            <label className="reg-label">Skills & Expertise</label>
            <div className="reg-skills-container">
              <div className="reg-skills-chips">
                {skills.map((s) => (
                  <span key={s} className="reg-skill-chip">
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="reg-skill-remove"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="reg-skills-input-row">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter or comma..."
                  className="reg-skill-input"
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="reg-add-skill-btn"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
            <div className="reg-hint">
              Examples: Python, Machine Learning, Computer Vision, Data Analysis, Edge AI
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="reg-submit-btn"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account <ArrowRight size={16} />
              </span>
            )}
          </button>

          {/* Sign in footer link */}
          <div className="reg-footer-link">
            <span>Already have an account? </span>
            <Link to="/login" className="reg-login-link">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
