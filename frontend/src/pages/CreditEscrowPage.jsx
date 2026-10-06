import { ESCROW, PROJECT } from '../data/mockData';
import { getInitials, formatCurrency } from '../utils/formatters';
import { Wallet, CheckCircle2, Award, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function CreditEscrowPage() {
  const [m1Status, setM1Status] = useState('RELEASED'); // 'Awaiting acceptance' | 'RELEASED'

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="eyebrow">ESCROW & CREDIT ATTRIBUTION</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Simulated Escrow Vault</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Transparent escrow releasing bounties strictly upon accepted milestone deliverables.
        </p>
      </div>

      {/* ESCROW SUMMARY HEADER BOX */}
      <div className="surface-elevated p-6 space-y-4 border-l-4 border-blue-600">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <span className="mono-pill text-xs">SIMULATED ESCROW</span>
            <h2 className="text-lg font-bold flex items-center gap-2 mt-1">
              <Wallet size={18} className="text-blue-600" /> {PROJECT.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 size={14} /> STATUS: ✓ FUNDED INTO ESCROW
            </span>
          </div>
        </div>

        {/* Budget breakdown grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">PROJECT FUNDING</span>
            <div className="text-base font-bold text-slate-800 dark:text-slate-100">{formatCurrency(ESCROW.total)}</div>
          </div>

          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">ESCROW VAULT</span>
            <div className="text-base font-bold text-teal-600 dark:text-teal-400">₹1,00,000 FUNDED</div>
          </div>

          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">RELEASED TO DATE</span>
            <div className="text-base font-bold text-slate-800 dark:text-slate-100">{formatCurrency(ESCROW.released)}</div>
          </div>

          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">REMAINING ESCROW</span>
            <div className="text-base font-bold text-amber-600 dark:text-amber-400">{formatCurrency(ESCROW.remaining)}</div>
          </div>
        </div>
      </div>

      {/* MILESTONE 01 ESCROW RELEASE CARD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="eyebrow">MILESTONE 01 BOUNTY DISTRIBUTION</div>
          <span className="mono-pill text-xs font-bold">BOUNTY: ₹25,000</span>
        </div>

        <div className="surface-elevated p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <h3 className="font-bold text-base">Milestone 01: Dataset Preparation</h3>
              <p className="text-xs text-slate-400">Accepted deliverable: Preprocessing Report</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                m1Status === 'RELEASED' ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300' : 'bg-amber-500/10 text-amber-700'
              }`}>
                {m1Status === 'RELEASED' ? '₹25,000 RELEASED' : 'Awaiting acceptance'}
              </span>
            </div>
          </div>

          {/* Distribution breakdown */}
          <div className="space-y-3 text-xs">
            {ESCROW.milestones[0].distribution.map((dist, idx) => (
              <div key={idx} className="surface-inset p-3.5 rounded flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold">
                    {getInitials(dist.user.name)}
                  </div>
                  <div>
                    <span className="font-bold">{dist.user.name}</span>
                    <span className="text-slate-400"> ({dist.user.role})</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-teal-600 text-sm">{formatCurrency(dist.amount)}</span>
                  <div className="text-[10px] text-slate-400 font-mono">{dist.pct}% of milestone bounty</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
