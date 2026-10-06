import { REVIEW_QUEUE } from '../data/mockData';
import { ClipboardList, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, ThumbsUp, XCircle, Search, FileText } from 'lucide-react';
import { useState } from 'react';

export default function ReviewQueuePage() {
  const [selectedId, setSelectedId] = useState('rq-001');
  const [decisions, setDecisions] = useState({});

  const activeItem = REVIEW_QUEUE.find(q => q.id === selectedId) || REVIEW_QUEUE[0];
  const activeDecision = decisions[activeItem.id];

  const handleDecision = (status) => {
    setDecisions(prev => ({ ...prev, [activeItem.id]: status }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="eyebrow">ADMINISTRATIVE GOVERNANCE</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Review Queue & Investigation Workspace</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Inspect empirical evidence, similarity flags, conflict issues, and ledger verification alerts.
        </p>
      </div>

      {/* Investigator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left queue panel */}
        <div className="lg:col-span-4 surface-elevated p-4 space-y-3">
          <div className="eyebrow">REVIEW QUEUE ({REVIEW_QUEUE.length})</div>

          <div className="space-y-2">
            {[
              { id: 'rq-001', type: 'similarity', title: 'Similarity Flag', subtitle: 'Project: DR Detection · Aarav (78%)', status: 'Pending' },
              { id: 'rq-002', type: 'coi', title: 'COI Flag', subtitle: 'Expert: Dr. Meera · Co-authorship check', status: 'Review Required' },
              { id: 'rq-003', type: 'ledger', title: 'Ledger Alert', subtitle: 'Entry #104 · Verification Failed', status: 'Verification Failed' },
              { id: 'rq-004', type: 'dispute', title: 'Charter Dispute', subtitle: 'Credit allocation dispute — Milestone 1', status: 'Pending' },
            ].map((item) => {
              const isSelected = item.id === selectedId;
              const hasDecision = decisions[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-3 rounded transition-all border ${
                    isSelected
                      ? 'border-blue-600 bg-blue-500/10 shadow-sm font-semibold'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="mono-pill text-[10px] uppercase font-bold text-amber-600">{item.type}</span>
                    {hasDecision ? (
                      <span className="text-[10px] text-teal-600 font-bold">✓ DECIDED</span>
                    ) : (
                      <span className="text-[10px] text-amber-600 font-semibold">{item.status}</span>
                    )}
                  </div>
                  <div className="font-bold text-xs mt-1">{item.title}</div>
                  <div className="text-[11px] text-slate-500 truncate">{item.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right workspace detail view */}
        <div className="lg:col-span-8 surface-elevated p-6 space-y-6">
          <div className="border-b pb-3 flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <span className="mono-pill text-xs">CASE REF: {activeItem.id}</span>
              <h2 className="text-lg font-bold mt-1">{activeItem.title}</h2>
            </div>
            {activeDecision && (
              <span className="px-3 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300">
                DECISION: {activeDecision.toUpperCase()}
              </span>
            )}
          </div>

          {/* CLAIM → EVIDENCE → CONTEXT → DECISION Flow */}
          <div className="space-y-6 text-xs">
            {/* 1. CLAIM */}
            <div className="space-y-1 surface-inset p-3 rounded">
              <span className="eyebrow">1. CLAIM SUMMARY</span>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                {activeItem.subtitle}
              </p>
            </div>

            {/* 2. EVIDENCE */}
            <div className="space-y-2 surface-inset p-4 rounded border-l-4 border-amber-500">
              <span className="eyebrow">2. EMPIRICAL EVIDENCE</span>
              {activeItem.type === 'similarity' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-amber-800 dark:text-amber-300">
                    TF-IDF + Cosine Similarity Match: 78% Overlap
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">
                    "Line 42–118 in Preprocessing Report contains 78% structural overlap with reference paper."
                  </p>
                </div>
              )}
              {activeItem.type === 'coi' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-amber-800 dark:text-amber-300">
                    Academic Co-Authorship Record Match
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">
                    "Dr. Meera & Aarav co-authored 2 papers in 2025."
                  </p>
                </div>
              )}
              {activeItem.type === 'ledger' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-red-600">
                    Cryptographic Hash Mismatch Alert
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">
                    "Block #104 hash does not match previous link #105. ⚠ History modified."
                  </p>
                </div>
              )}
              {activeItem.type === 'dispute' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Charter Credit Disagreement
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">
                    "Dispute regarding credit split on Milestone 1 artifact."
                  </p>
                </div>
              )}
            </div>

            {/* 3. CONTEXT */}
            <div className="space-y-1 surface-inset p-3 rounded">
              <span className="eyebrow">3. CONTEXT & CONTRIBUTOR STATEMENT</span>
              <p className="text-slate-700 dark:text-slate-300">
                Aarav states that preprocessing code is standard computer vision pipeline adapted for diabetic retinopathy fundus datasets.
              </p>
            </div>

            {/* 4. DECISION */}
            <div className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="eyebrow">4. ADMIN DECISION</span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleDecision('accepted')}
                  className={`btn btn-sm ${activeDecision === 'accepted' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <ThumbsUp size={14} /> Accept Work (Dismiss Flag)
                </button>
                <button
                  onClick={() => handleDecision('rejected')}
                  className={`btn btn-sm ${activeDecision === 'rejected' ? 'btn-danger' : 'btn-ghost'}`}
                >
                  <XCircle size={14} /> Reject Contribution
                </button>
                <button
                  onClick={() => handleDecision('reassigned')}
                  className="btn btn-secondary btn-sm"
                >
                  Reassign Reviewer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
