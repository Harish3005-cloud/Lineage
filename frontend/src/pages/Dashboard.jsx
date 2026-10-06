import { useAuth } from '../context/AuthContext';
import { PROJECT, MILESTONES, DASHBOARD_RECENT_ACTIVITY } from '../data/mockData';
import { getInitials } from '../utils/formatters';
import { ShieldCheck, CheckCircle2, ArrowRight, Clock, CircleDot, FileText, Cpu, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="eyebrow">RESEARCH WORKSPACE</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">
          Good morning, {user?.name || 'Aarav'}.
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Your research activity and trust status across active commitments.
        </p>
      </div>

      {/* CURRENT PROJECT SECTION */}
      <div className="space-y-3">
        <div className="eyebrow">CURRENT PROJECT</div>

        <div className="surface-elevated p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <span className="mono-pill">{PROJECT.category}</span>
              <h2 className="text-lg font-bold">{PROJECT.title}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>Sponsor: <strong className="text-slate-800 dark:text-slate-200">{PROJECT.sponsor.name}</strong></span>
                <span>Budget: <strong className="text-slate-800 dark:text-slate-200">₹{PROJECT.budget.toLocaleString()}</strong></span>
                <span>Status: <strong className="text-teal-600 dark:text-teal-400">{PROJECT.status}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center gap-1">
                <ShieldCheck size={14} /> INTEGRITY VERIFIED
              </span>
              <button onClick={() => navigate('/project')} className="btn btn-primary btn-sm">
                Open Workspace <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Milestone 1 Progress Card */}
          <div className="surface-inset p-4 rounded space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="font-semibold">
                Milestone {MILESTONES[0].order}: {MILESTONES[0].title}
              </div>
              <span className="mono-pill text-teal-600 font-bold">{MILESTONES[0].progress}% COMPLETE</span>
            </div>

            {/* Custom 80% Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${MILESTONES[0].progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Owner: {MILESTONES[0].owner.name}</span>
              <span>Deliverable: {MILESTONES[0].deliverable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN GRID: RECENT ACTIVITY & TRUST STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RECENT ACTIVITY TIMELINE */}
        <div className="lg:col-span-7 space-y-3">
          <div className="eyebrow flex items-center gap-1.5">
            <Clock size={13} /> RECENT RESEARCH ACTIVITY
          </div>

          <div className="surface-elevated p-5 space-y-4">
            {DASHBOARD_RECENT_ACTIVITY.map((act, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="font-mono text-xs text-slate-400 w-16 shrink-0 pt-0.5">{act.time}</span>
                <div className="flex-1 space-y-0.5 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">{act.event}</div>
                  <div className="font-mono text-slate-600 dark:text-slate-400">{act.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST STATUS PANEL */}
        <div className="lg:col-span-5 space-y-3">
          <div className="eyebrow flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-teal-600" /> TRUST STATUS VERIFICATION
          </div>

          <div className="surface-elevated p-5 space-y-3 text-xs">
            {[
              { label: 'Charter accepted', status: 'VERIFIED', date: 'Oct 06, 2026' },
              { label: 'Project access verified', status: 'VERIFIED', detail: 'Watermarked Variant 04' },
              { label: 'AI actions logged', status: 'VERIFIED', detail: 'Receipt AIR-0042' },
              { label: 'Contribution verified', status: 'VERIFIED', detail: 'SHA-256 Provenance' },
            ].map((t, idx) => (
              <div key={idx} className="surface-inset p-3 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{t.label}</span>
                </div>
                <span className="mono-pill text-[10px] text-teal-600 font-bold">{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
