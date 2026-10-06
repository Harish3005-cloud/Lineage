import { LEDGER_ENTRIES } from '../data/mockData';
import { getInitials, truncateHash } from '../utils/formatters';
import { Layers, ShieldCheck, AlertOctagon, RefreshCw, AlertTriangle, X, CheckCircle2, ArrowDown } from 'lucide-react';
import { useState } from 'react';

export default function LedgerPage() {
  const [isTampered, setIsTampered] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const entries = isTampered
    ? LEDGER_ENTRIES.map(e => e.entry === 104 ? {
        ...e,
        curr_hash: '77FD99AA77FD99AA77FD99AA77FD99AA77FD99AA',
        action: 'Contribution Deleted (UNAUTHORIZED MODIFICATION)',
        status: 'BROKEN',
      } : e)
    : LEDGER_ENTRIES;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="eyebrow">TAMPER-EVIDENT RECORD</div>
          <h1 className="text-2xl font-bold tracking-tight mt-1">Cryptographic Audit Ledger</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Immutable SHA-256 chain recording all project state changes, contributions, and review decisions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsTampered(false)}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={14} /> Verify Ledger Chain
          </button>
          <button
            onClick={() => setIsTampered(true)}
            className={`btn btn-sm ${isTampered ? 'btn-danger' : 'btn-primary bg-amber-600 border-amber-600 hover:bg-amber-700'}`}
          >
            <AlertTriangle size={14} /> Simulate Tampering
          </button>
        </div>
      </div>

      {/* VERIFICATION FAILURE / SUCCESS BANNER */}
      {isTampered ? (
        <div className="p-5 rounded surface-elevated border-2 border-red-600 bg-red-500/10 text-red-900 dark:text-red-200 space-y-3 animate-slide-up">
          <div className="font-bold text-sm flex items-center gap-2 text-red-700 dark:text-red-400 text-base">
            <AlertOctagon size={20} /> LEDGER VERIFICATION FAILED — ⚠ HISTORY MODIFIED
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
            <div>Expected hash: <span className="font-bold text-teal-600">19AC4D7E8F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C</span></div>
            <div>Current hash: <span className="font-bold text-red-600">77FD99AA77FD99AA77FD99AA77FD99AA77FD99AA</span></div>
          </div>
          <div className="p-3 rounded surface-inset text-xs font-semibold text-slate-800 dark:text-slate-200">
            "Corrections cannot silently overwrite history. A new event must be recorded."
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded surface-inset border border-teal-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold text-teal-700 dark:text-teal-400">
            <ShieldCheck size={16} /> LEDGER VERIFIED ✓ — Cryptographic SHA-256 chain intact across all entries
          </div>
          <span className="mono-pill text-[10px] text-teal-600 font-bold">PROVENANCE INTACT</span>
        </div>
      )}

      {/* VISUALLY CONNECTED CHAIN ENTRIES */}
      <div className="space-y-4">
        {entries.map((e, idx) => {
          const isBroken = isTampered && e.entry === 104;
          return (
            <div key={e.entry} className="space-y-3">
              <div
                onClick={() => setSelectedEntry(e)}
                className={`surface-elevated p-6 cursor-pointer transition-all border-2 ${
                  isBroken
                    ? 'border-red-600 bg-red-500/10'
                    : 'hover:border-blue-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <span className="mono-pill font-bold text-sm bg-slate-800 text-white">ENTRY {e.entry}</span>
                    <h3 className="font-bold text-base">{e.action}</h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-mono">Actor: {e.actor.name}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400 font-mono">{e.timestamp}</span>
                    {isBroken ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                        ⚠ BROKEN
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-500/10 text-teal-600">
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px]">PREVIOUS HASH:</span>
                    <div className="hash-display truncate">{e.prev_hash}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">CURRENT HASH:</span>
                    <div className={`hash-display truncate ${isBroken ? 'text-red-600 font-bold' : ''}`}>
                      {e.curr_hash}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chain connector arrow */}
              {idx < entries.length - 1 && (
                <div className="flex justify-center my-1 text-slate-400">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
