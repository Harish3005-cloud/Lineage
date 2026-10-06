import { NON_MONETARY_CREDENTIAL, USERS } from '../data/mockData';
import { getInitials, formatDate } from '../utils/formatters';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, FileCheck, Layers } from 'lucide-react';

export default function NonMonetaryProjectPage() {
  const cred = NON_MONETARY_CREDENTIAL;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="eyebrow">ACADEMIC CREDENTIAL ISSUANCE</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">
          Non-Monetary Research Credential
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Formal academic credit issued for accepted contributions on open-source research initiatives.
        </p>
      </div>

      {/* FORMAL ACADEMIC CREDENTIAL CARD */}
      <div className="surface-elevated p-8 md:p-10 space-y-6 border-2 border-blue-600/40 relative shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-strong)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <Award size={26} />
            </div>
            <div>
              <span className="mono-pill text-xs font-bold">CREDENTIAL ID: {cred.id}</span>
              <h2 className="text-lg font-bold uppercase tracking-wide mt-0.5">{cred.title}</h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 self-start sm:self-center">
            ✓ FORMAL CREDENTIAL ISSUED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="surface-inset p-4 rounded space-y-1">
            <span className="eyebrow">RECIPIENT</span>
            <div className="flex items-center gap-2 font-bold text-base text-slate-800 dark:text-slate-100">
              <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">
                {getInitials(cred.recipient.name)}
              </div>
              <span>{cred.recipient.name}</span>
            </div>
            <div className="text-slate-400 capitalize">{cred.recipient.role}</div>
          </div>

          <div className="surface-inset p-4 rounded space-y-1">
            <span className="eyebrow">COMPLETED MILESTONE</span>
            <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{cred.completed_milestone}</div>
            <div className="text-slate-400">Project: {cred.project_title}</div>
          </div>
        </div>

        <div className="surface-inset p-4 rounded space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow">ISSUING AUTHORITY</span>
            <span className="font-bold text-blue-600">{cred.issued_by} PLATFORM</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <div>Issued Date: Oct 06, 2026</div>
            <div>Verification: SHA-256 Provenance Proof</div>
          </div>
          <div className="pt-2 text-[10px] text-slate-400 font-mono select-all">
            Cryptographic Hash: {cred.hash}
          </div>
        </div>
      </div>
    </div>
  );
}
