import { CHARTER, PROJECT } from '../data/mockData';
import { getInitials, formatDate } from '../utils/formatters';
import { ScrollText, CheckCircle2, ShieldCheck, FileCheck, Lock, Award, DollarSign, Scale } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function CharterPage() {
  const { user } = useAuth();
  const [accepted, setAccepted] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="eyebrow">AGREEMENTS & GOVERNANCE</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Project Charter v{CHARTER.version}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Binding agreement defined and accepted by all team members prior to work commencement.
        </p>
      </div>

      {/* Charter Document Container */}
      <div className="surface-elevated p-8 md:p-10 space-y-8 border shadow-sm" style={{ background: 'var(--bg-surface)' }}>
        {/* Document Header */}
        <div className="border-b pb-6 space-y-2" style={{ borderColor: 'var(--border-strong)' }}>
          <div className="flex items-center justify-between">
            <span className="mono-pill text-xs">DOCUMENT REF: LINEAGE-CHARTER-DR-001</span>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center gap-1">
              <CheckCircle2 size={13} /> STATUS: ACTIVE & SIGNED
            </span>
          </div>
          <h2 className="text-xl font-bold">{PROJECT.title}</h2>
          <div className="text-xs text-slate-500 font-mono">
            Sponsor: {PROJECT.sponsor.name} ({PROJECT.sponsor.organization}) · Effective Date: Sep 20, 2026
          </div>
        </div>

        {/* Document Sections */}
        <div className="space-y-6 text-sm">
          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="mono-pill">1.0</span> PROJECT SCOPE & OBJECTIVES
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {CHARTER.sections.scope}
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="mono-pill">2.0</span> MILESTONE STRUCTURE & ACCEPTANCE CRITERIA
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {CHARTER.sections.milestones}
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="mono-pill">3.0</span> AI USAGE & GATEWAY GOVERNANCE
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {CHARTER.sections.ai_usage}
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="mono-pill">4.0</span> CONFIDENTIALITY & WATERMARKING
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {CHARTER.sections.confidentiality}
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="mono-pill">5.0</span> CREDIT ALLOCATION & SURVIVAL CLAUSE
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {CHARTER.sections.credit}
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="mono-pill">6.0</span> ESCROW & PAYMENT TERMS
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {CHARTER.sections.payment}
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="mono-pill">7.0</span> DISPUTE RESOLUTION
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {CHARTER.sections.dispute}
            </p>
          </div>
        </div>

        {/* Signatories Panel */}
        <div className="border-t pt-6 space-y-4" style={{ borderColor: 'var(--border-strong)' }}>
          <div className="eyebrow">CHARTER SIGNATORIES & ACCEPTANCE LOG</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHARTER.accepted_by.map((sig, i) => (
              <div key={i} className="surface-inset p-3 rounded flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold">
                    {getInitials(sig.user.name)}
                  </div>
                  <div>
                    <div className="font-semibold">{sig.user.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{sig.user.role}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-teal-600 font-semibold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 size={12} /> Accepted
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {formatDate(sig.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acceptance Action */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="text-xs text-slate-500">
            Current Authenticated Persona: <strong className="text-slate-800 dark:text-slate-200">{user?.name}</strong>
          </div>

          <button
            onClick={() => setAccepted(true)}
            className={`btn btn-sm ${accepted ? 'btn-secondary' : 'btn-primary'}`}
            disabled={accepted}
          >
            {accepted ? '✓ Charter Accepted & Verified' : 'Accept Charter Terms'}
          </button>
        </div>
      </div>
    </div>
  );
}
