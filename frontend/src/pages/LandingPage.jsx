import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { PROVENANCE_STAGES } from '../data/mockData';
import {
  Layers, ShieldCheck, CheckCircle2, ArrowRight, Sun, Moon,
  Bot, Lock, FileText, Award, Users, Cpu, Key, Compass, LogIn, UserPlus, Info
} from 'lucide-react';
import './LandingPage.css';

const INTERACTIVE_LINEAGE_STAGES = [
  {
    id: 'project',
    title: 'PROJECT',
    label: 'ACCESS',
    question: 'Who could see the information?',
    desc: 'Confidential project details locked until acceptance under watermarked variant tracing.',
    icon: '📋',
  },
  {
    id: 'people',
    title: 'PEOPLE',
    label: 'MATCHING & COI',
    question: 'Who is working on the project?',
    desc: 'Explainable AI matching ranks verified candidates. COI checks filter author conflicts.',
    icon: '👥',
  },
  {
    id: 'contributions',
    title: 'CONTRIBUTIONS',
    label: 'CONTRIBUTION',
    question: 'Who created the work?',
    desc: 'Artifacts hashed with SHA-256 with declared human/AI origin attribution.',
    icon: '💻',
  },
  {
    id: 'evidence',
    title: 'EVIDENCE',
    label: 'AI ACTION & REVIEW',
    question: 'Which AI action was authorized?',
    desc: 'AI receipts AIR-0042 log human-owned AI actions. Similarity flags require peer review.',
    icon: '🛡️',
  },
  {
    id: 'trust',
    title: 'TRUST',
    label: 'LEDGER VERIFICATION',
    question: 'Can the history be verified?',
    desc: 'Tamper-evident hash chain prevents silent history rewrites. Corrections create new records.',
    icon: '⚖️',
  },
];

const PROCESS_STEPS = [
  { step: '01', icon: '🤝', title: 'Collaborate', description: 'Sponsors, experts, students, and AI agents align on project charters and milestones.' },
  { step: '02', icon: '🔍', title: 'Verify', description: 'Submissions undergo automated similarity checks and mandatory expert peer review.' },
  { step: '03', icon: '🧬', title: 'Attribute', description: 'Every artifact is SHA-256 hashed and origin-tracked with credit-by-survival lineage.' },
  { step: '04', icon: '🏆', title: 'Reward', description: 'Transparent escrow smart milestones release fair bounties backed by undeniable evidence.' }
];

const FEATURES = [
  {
    title: 'Trusted Collaboration',
    description: "Work together with clear roles, charters, and milestones. Every team member's contribution is tracked.",
    icon: '🤝',
    tag: 'Governance'
  },
  {
    title: 'AI-Assisted Research',
    description: 'Leverage AI agents for research, experimentation, and code generation — all logged and attributed to human owners.',
    icon: '🤖',
    tag: 'AI Oversight'
  },
  {
    title: 'Contribution Proof',
    description: 'Every artifact is hashed with SHA-256. Every contribution has origin tracking — human, AI-assisted, or imported.',
    icon: '🔒',
    tag: 'Provenance'
  },
  {
    title: 'Integrity Verification',
    description: 'Automated similarity checks using TF-IDF and cosine similarity. Flagged submissions require human review, never automated judgment.',
    icon: '⚖️',
    tag: 'Verification'
  },
  {
    title: 'Fair Rewards',
    description: 'Credit by survival — reward what survives into the final accepted artifact. Transparent escrow and milestone-based payouts.',
    icon: '💎',
    tag: 'Escrow & Payouts'
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStageId, setActiveStageId] = useState('project');

  const activeStage = INTERACTIVE_LINEAGE_STAGES.find(s => s.id === activeStageId) || INTERACTIVE_LINEAGE_STAGES[0];

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="lp-navbar-wrapper">
        <div className="lp-navbar">
          <Link to="/" className="lp-logo-link">
            <div className="lp-logo-symbol">
              <Layers size={22} className="text-blue-500" />
            </div>
            <span className="lp-logo-text">LINEAGE</span>
          </Link>

          {/* Nav links */}
          <nav className="lp-nav-links">
            <a href="#provenance" className="lp-nav-link">Provenance Flow</a>
            <a href="#process" className="lp-nav-link">Process</a>
            <a href="#features" className="lp-nav-link">Capabilities</a>
            <a href="#roles" className="lp-nav-link">Ecosystem</a>
          </nav>

          {/* Nav actions */}
          <div className="lp-nav-actions">
            <button
              onClick={toggle}
              title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="lp-theme-toggle-btn"
            >
              {dark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-300" />}
            </button>
            <Link to="/login" className="lp-btn lp-btn-ghost">
              <LogIn size={14} /> Sign In
            </Link>
            <Link to="/register" className="lp-btn lp-btn-primary">
              <UserPlus size={14} /> Get Started
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lp-mobile-menu-btn"
          >
            <div className={`lp-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
            <div className={`lp-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
            <div className={`lp-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lp-mobile-dropdown">
            <a href="#provenance" onClick={() => setMobileMenuOpen(false)} className="lp-mobile-nav-link">Provenance Flow</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="lp-mobile-nav-link">Process</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="lp-mobile-nav-link">Capabilities</a>
            <a href="#roles" onClick={() => setMobileMenuOpen(false)} className="lp-mobile-nav-link">Ecosystem</a>
            <div className="lp-mobile-nav-actions">
              <Link to="/login" className="lp-btn lp-btn-ghost w-full">Sign In</Link>
              <Link to="/register" className="lp-btn lp-btn-primary w-full">Get Started</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="lp-hero-section">
        <div className="lp-hero-bg-glow" />
        <div className="lp-hero-container">
          <div className="lp-hero-badge">
            <span className="lp-pulse-dot" />
            <span>TRUST & INTEGRITY PLATFORM FOR COLLABORATIVE RESEARCH</span>
          </div>

          <h1 className="lp-hero-title">LINEAGE</h1>

          <p className="lp-hero-subheading">
            Where research collaboration becomes verifiable.
          </p>

          <p className="lp-hero-description">
            Connect sponsors, experts and students while keeping access, AI actions, contributions and agreements traceable.
          </p>

          <div className="lp-hero-actions">
            <Link to="/dashboard" className="lp-btn lp-btn-primary lp-btn-lg">
              Explore Projects <ArrowRight size={16} />
            </Link>
            <a href="#provenance" className="lp-btn lp-btn-outline-white lp-btn-lg">
              How LINEAGE Works
            </a>
          </div>

          <div className="lp-hero-stats">
            <div className="lp-stat-pill">
              <span className="lp-stat-icon">🛡️</span>
              <span className="lp-stat-label">SHA-256 Provenance Proofs</span>
            </div>
            <div className="lp-stat-pill">
              <span className="lp-stat-icon">⚖️</span>
              <span className="lp-stat-label">Credit by Survival Attribution</span>
            </div>
            <div className="lp-stat-pill">
              <span className="lp-stat-icon">🔒</span>
              <span className="lp-stat-label">Milestone-Locked Escrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PROVENANCE VISUALIZATION SECTION */}
      <section id="provenance" className="lp-section">
        <div className="lp-section-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">INTERACTIVE PROVENANCE ENGINE</span>
            <h2 className="lp-section-title">Interactive Lineage Trail</h2>
            <p className="lp-section-subtitle">
              Hover or click each stage below to inspect how trust and evidence flow across every research action.
            </p>
          </div>

          {/* Interactive Flow Bar */}
          <div className="lp-interactive-flow-bar">
            {INTERACTIVE_LINEAGE_STAGES.map((s, idx) => (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setActiveStageId(s.id)}
                  onMouseEnter={() => setActiveStageId(s.id)}
                  className={`lp-flow-stage-btn ${activeStageId === s.id ? 'active' : ''}`}
                >
                  <span className="lp-flow-stage-icon">{s.icon}</span>
                  <span className="lp-flow-stage-title">{s.title}</span>
                  <span className="lp-flow-stage-label">{s.label}</span>
                </button>
                {idx < INTERACTIVE_LINEAGE_STAGES.length - 1 && (
                  <span className="lp-flow-connector">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Stage Explanation Inspector Card */}
          <div className="lp-stage-inspector-card">
            <div className="lp-inspector-header">
              <div className="flex items-center gap-2">
                <span className="lp-inspector-badge">{activeStage.title} STAGE EVIDENCE</span>
                <span className="lp-inspector-question">"{activeStage.question}"</span>
              </div>
              <span className="mono-pill text-xs">PROVENANCE VERIFIED</span>
            </div>
            <p className="lp-inspector-desc">{activeStage.desc}</p>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section id="process" className="lp-section lp-section-alt">
        <div className="lp-section-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">CORE ARCHITECTURE</span>
            <h2 className="lp-section-title">The LINEAGE Flow</h2>
            <p className="lp-section-subtitle">
              How transparent science moves from ideation to undeniable rewards.
            </p>
          </div>

          <div className="lp-process-flow">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="lp-process-card">
                <span className="lp-process-step-number">{step.step}</span>
                <div className="lp-process-icon">{step.icon}</div>
                <h3 className="lp-process-title">{step.title}</h3>
                <p className="lp-process-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="lp-section">
        <div className="lp-section-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">PLATFORM CAPABILITIES</span>
            <h2 className="lp-section-title">Engineered for Academic Trust</h2>
            <p className="lp-section-subtitle">
              Built on mathematical integrity, cryptographic hashing, and human peer oversight.
            </p>
          </div>

          <div className="lp-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="lp-feature-card">
                <div className="lp-feature-top">
                  <span className="lp-feature-icon">{f.icon}</span>
                  <span className="lp-feature-tag">{f.tag}</span>
                </div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-description">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-cta-section">
        <div className="lp-cta-glow" />
        <div className="lp-cta-container">
          <h2 className="lp-cta-title">Ready to start your research journey?</h2>
          <p className="lp-cta-subtitle">
            Whether you are funding groundbreaking initiatives, mentoring the next generation, or contributing code and papers — LINEAGE provides the trust infrastructure you need.
          </p>
          <div className="lp-cta-buttons">
            <Link to="/register" className="lp-btn lp-btn-primary lp-btn-lg">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="lp-btn lp-btn-outline-white lp-btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-container">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <div className="lp-logo-link">
                <Layers size={22} className="text-blue-500" />
                <span className="lp-logo-text">LINEAGE</span>
              </div>
              <p className="lp-footer-tagline">
                Trust every contribution. Trace every decision.
              </p>
            </div>

            <div className="lp-footer-column">
              <h4>PLATFORM</h4>
              <ul>
                <li><a href="#provenance">Provenance Trail</a></li>
                <li><a href="#process">Core Process</a></li>
                <li><a href="#features">Capabilities</a></li>
              </ul>
            </div>

            <div className="lp-footer-column">
              <h4>TRUST & VERIFICATION</h4>
              <ul>
                <li><Link to="/ledger">SHA-256 Provenance</Link></li>
                <li><Link to="/credit">Credit by Survival</Link></li>
                <li><Link to="/reviews">Cosine Similarity Check</Link></li>
              </ul>
            </div>

            <div className="lp-footer-column">
              <h4>GET STARTED</h4>
              <ul>
                <li><Link to="/register">Create Account</Link></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/dashboard">Explore Projects</Link></li>
              </ul>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">© 2026 LINEAGE. All rights reserved.</span>
            <span className="lp-footer-meta">Trust every contribution. Trace every decision.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
