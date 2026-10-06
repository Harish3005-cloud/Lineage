import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USERS } from '../data/mockData';
import { Layers, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedEmail, setSelectedEmail] = useState('student@lineage.dev');

  const handleLogin = (e) => {
    e?.preventDefault();
    login(selectedEmail);
    navigate('/dashboard');
  };

  const handleQuickLogin = (email) => {
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-app)' }}>
      <div className="max-w-md w-full surface-elevated p-8 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-teal-600 flex items-center justify-center mx-auto text-white">
            <Layers size={26} />
          </div>
          <h1 className="text-xl font-bold tracking-wider">LINEAGE</h1>
          <p className="eyebrow" style={{ color: 'var(--text-tertiary)' }}>
            Every contribution has a lineage. Every reward has evidence.
          </p>
        </div>

        {/* Demo Role Selector */}
        <div className="space-y-3 pt-2">
          <div className="eyebrow flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <UserCheck size={13} /> Select Demo Persona
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[
              { label: 'Sponsor (Vikram Patel)', email: 'sponsor@lineage.dev', role: 'Sponsor', desc: 'HealthTech Foundation' },
              { label: 'Expert (Dr. Priya Menon)', email: 'expert@lineage.dev', role: 'Expert', desc: 'Medical Imaging Specialist' },
              { label: 'Student A (Arjun Sharma)', email: 'student@lineage.dev', role: 'Student (Under 18)', desc: 'ML & Computer Vision' },
              { label: 'Student B (Kavitha Rajan)', email: 'studentb@lineage.dev', role: 'Student', desc: 'Edge AI & Data Science' },
              { label: 'Admin (Neha Gupta)', email: 'admin@lineage.dev', role: 'Admin', desc: 'Platform Governance' },
            ].map((p) => (
              <button
                key={p.email}
                type="button"
                onClick={() => handleQuickLogin(p.email)}
                className={`flex items-center justify-between p-3 rounded text-left transition-all border ${
                  selectedEmail === p.email ? 'border-teal-500 bg-teal-500/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold">{p.label}</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{p.desc}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="mono-pill">{p.role}</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="p-3 rounded surface-inset flex items-start gap-2.5 text-xs">
          <ShieldCheck size={16} className="text-teal-600 shrink-0 mt-0.5" />
          <div style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold text-slate-800 dark:text-slate-200">24-Hour Proof-of-Concept:</span> Click any persona above to inspect role-based access, evidence trails, and ledger tampering.
          </div>
        </div>
      </div>
    </div>
  );
}
