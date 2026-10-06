import { TRUST_OVERVIEW, WATERMARK_DATA, CONTRIBUTIONS, COI_CHECKS } from '../data/mockData';
import { getInitials } from '../utils/formatters';
import { Shield, ShieldAlert, CheckCircle2, AlertTriangle, Lock, Search, FileText, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IntegrityPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Signature Header */}
      <div>
        <div className="eyebrow">SIGNATURE CONTROL CENTER</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Trust & Integrity</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Every trust claim should have evidence behind it.
        </p>
      </div>

      {/* 5 Distinct Editorial Control Sections */}
      <div className="space-y-6">
        {/* SECTION 01: ACCESS CONTROL */}
        <div className="surface-elevated p-6 space-y-4 border-l-4 border-teal-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="mono-pill text-xs font-bold bg-teal-500/10 text-teal-700 dark:text-teal-400">01</span>
              <div>
                <h3 className="font-bold text-base">ACCESS CONTROL</h3>
                <p className="text-xs text-slate-500">Who could see the information?</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center gap-1">
              <CheckCircle2 size={13} /> VERIFIED
            </span>
          </div>

          <div className="surface-inset p-3 rounded text-xs space-y-1">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              {TRUST_OVERVIEW.access_control.label}
            </div>
            <div className="text-slate-400 font-mono">
              {TRUST_OVERVIEW.access_control.last_event}
            </div>
          </div>
        </div>

        {/* SECTION 02: WATERMARKING & LEAK TRACE */}
        <div className="surface-elevated p-6 space-y-4 border-l-4 border-amber-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="mono-pill text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400">02</span>
              <div>
                <h3 className="font-bold text-base">WATERMARKING & LEAK TRACE</h3>
                <p className="text-xs text-slate-500">Which version did each person receive?</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <AlertTriangle size={13} /> SUSPECTED LEAK
            </span>
          </div>

          {/* Watermark Variants Table */}
          <div className="space-y-3">
            <div className="eyebrow">DOCUMENT RECIPIENT VARIANTS</div>
            <div className="space-y-2">
              {WATERMARK_DATA.recipients.map((r, i) => (
                <div key={i} className="surface-inset p-3 rounded flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[9px] font-bold">
                      {getInitials(r.user.name)}
                    </div>
                    <span className="font-medium">{r.user.name}</span>
                    <span className="mono-pill">{r.variant}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono">{r.markers} markers embedded</span>
                    {r.status === 'suspected_leak' ? (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">⚠ Matched 3 markers</span>
                    ) : (
                      <span className="text-teal-600 font-medium">✓ Intact</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Suspected Leak Investigation Box */}
            <div className="p-4 rounded surface-inset border border-amber-500/30 space-y-2 text-xs">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <ShieldAlert size={15} /> SUSPECTED LEAK DETECTED
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-slate-700 dark:text-slate-300">
                <div>Matched Markers: <strong className="font-mono">3 / 7 markers</strong></div>
                <div>Possible Source: <strong className="font-semibold">{WATERMARK_DATA.suspected_leak.possible_source}</strong></div>
                <div>Confidence: <span className="font-semibold text-amber-700 dark:text-amber-400">{WATERMARK_DATA.suspected_leak.confidence}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 03: SIMILARITY CHECK */}
        <div className="surface-elevated p-6 space-y-4 border-l-4 border-amber-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="mono-pill text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400">03</span>
              <div>
                <h3 className="font-bold text-base">SIMILARITY CHECK (TF-IDF + COSINE SIMILARITY)</h3>
                <p className="text-xs text-slate-500">Does submitted work suspiciously overlap with existing material?</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <AlertTriangle size={13} /> HUMAN REVIEW REQUIRED
            </span>
          </div>

          <div className="p-4 surface-inset rounded space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 border-slate-200 dark:border-slate-700">
              <div>
                <div className="font-bold text-sm">FLAGGED CONTRIBUTION: model_v1.py</div>
                <div className="text-slate-400">Submitted by Arjun Sharma (Student A) · Oct 02, 2026</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-amber-600">78% Similarity</div>
                <div className="text-[10px] text-slate-400">Potential Overlap</div>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)' }}>
              "Potential similarity detected with existing published architecture. High similarity score requires human expert review before acceptance."
            </p>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button onClick={() => navigate('/reviews')} className="btn btn-primary btn-sm">
                Review Evidence in Queue <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 04: CONFLICT OF INTEREST */}
        <div className="surface-elevated p-6 space-y-4 border-l-4 border-amber-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="mono-pill text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400">04</span>
              <div>
                <h3 className="font-bold text-base">CONFLICT OF INTEREST EVALUATION</h3>
                <p className="text-xs text-slate-500">Could a reviewer have a relationship that affects impartiality?</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400">
              FLAGGED
            </span>
          </div>

          <div className="surface-inset p-4 rounded text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">Reviewer: Dr. Rajeev Nair</span>
                <span className="text-slate-400"> ↔ </span>
                <span className="font-semibold">Subject: Arjun Sharma</span>
              </div>
              <span className="mono-pill">COI FLAGGED</span>
            </div>

            <p className="text-amber-800 dark:text-amber-300">
              Relationship: Previous co-authorship history detected (2 joint publications in 2025).
            </p>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button onClick={() => navigate('/reviews')} className="btn btn-secondary btn-sm">
                Assign Different Reviewer
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 05: TAMPER-EVIDENT LEDGER */}
        <div className="surface-elevated p-6 space-y-4 border-l-4 border-teal-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="mono-pill text-xs font-bold bg-teal-500/10 text-teal-700 dark:text-teal-400">05</span>
              <div>
                <h3 className="font-bold text-base">TAMPER-EVIDENT LEDGER</h3>
                <p className="text-xs text-slate-500">Has the recorded history changed?</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center gap-1">
              <CheckCircle2 size={13} /> CHAIN VALID
            </span>
          </div>

          <div className="surface-inset p-4 rounded text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Cryptographic Hash Chain Valid
              </div>
              <div className="text-slate-400 font-mono">
                4 entries verified · Previous hashes linked cleanly
              </div>
            </div>

            <button onClick={() => navigate('/ledger')} className="btn btn-primary btn-sm shrink-0">
              Open Cryptographic Ledger <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
