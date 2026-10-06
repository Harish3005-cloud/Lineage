import React from 'react';
import { TRUST_OVERVIEW, WATERMARK_DATA, COI_CHECKS } from '../data/mockData';
import { getInitials } from '../utils/formatters';
import { Shield, ShieldAlert, CheckCircle2, AlertTriangle, Lock, Search, FileText, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import CryptographicProvenanceDAG from '../components/forensic/CryptographicProvenanceDAG';
import TfidfDiffInspector from '../components/forensic/TfidfDiffInspector';
import CreditBySurvivalMatrix from '../components/forensic/CreditBySurvivalMatrix';

export default function IntegrityPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div>
        <div className="eyebrow">FORENSIC AUDIT CONTROL CENTER</div>
        <h1 className="text-xl font-bold tracking-tight mt-0.5 text-[#e6e8ec]">Trust & Integrity Control Matrix</h1>
        <p className="text-xs mt-1 text-[#9ea3b0] font-mono">
          Clinical telemetry, TF-IDF vectorizer analysis, and SHA-256 cryptographic provenance verification.
        </p>
      </div>

      {/* CORE FORENSIC VIEW 1: TF-IDF DIFFERENTIAL INSPECTOR */}
      <TfidfDiffInspector artifactName="mobilenet_int8_quant.py" similarityScore={87.4} />

      {/* CORE FORENSIC VIEW 2: CRYPTOGRAPHIC PROVENANCE DAG */}
      <CryptographicProvenanceDAG />

      {/* CORE FORENSIC VIEW 3: CREDIT BY SURVIVAL MATRIX */}
      <CreditBySurvivalMatrix />

      {/* 5 Distinct Editorial Control Sections */}
      <div className="space-y-4">
        {/* SECTION 01: ACCESS CONTROL */}
        <div className="terminal-surface p-4 border-l-4 border-emerald-500 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="badge-emerald font-mono">01</span>
              <div>
                <h3 className="font-bold text-sm text-[#e6e8ec]">ACCESS CONTROL & BOUNDARIES</h3>
                <p className="text-xs text-[#9ea3b0]">Backend authorization scope check</p>
              </div>
            </div>
            <span className="badge-emerald">
              <CheckCircle2 size={13} /> VERIFIED
            </span>
          </div>

          <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded text-xs space-y-1 font-mono">
            <div className="font-semibold text-slate-200">
              {TRUST_OVERVIEW.access_control.label}
            </div>
            <div className="text-[#626875]">
              {TRUST_OVERVIEW.access_control.last_event}
            </div>
          </div>
        </div>

        {/* SECTION 02: WATERMARKING & LEAK TRACE */}
        <div className="terminal-surface p-4 border-l-4 border-amber-500 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="badge-amber font-mono">02</span>
              <div>
                <h3 className="font-bold text-sm text-[#e6e8ec]">WATERMARKING & LEAK TRACE</h3>
                <p className="text-xs text-[#9ea3b0]">Which document variant did each member receive?</p>
              </div>
            </div>
            <span className="badge-amber">
              <AlertTriangle size={13} /> SUSPECTED LEAK
            </span>
          </div>

          {/* Watermark Variants Table */}
          <div className="space-y-2">
            <div className="eyebrow">DOCUMENT RECIPIENT VARIANTS</div>
            <div className="space-y-1.5 font-mono">
              {WATERMARK_DATA.recipients.map((r, i) => (
                <div key={i} className="p-2.5 bg-[#0d0f14] border border-[#272b35] rounded flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-slate-800 text-white flex items-center justify-center text-[9px] font-bold">
                      {getInitials(r.user.name)}
                    </div>
                    <span className="font-medium text-[#e6e8ec]">{r.user.name}</span>
                    <span className="badge-slate text-[10px]">{r.variant}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#626875]">{r.markers} markers</span>
                    {r.status === 'suspected_leak' ? (
                      <span className="text-amber-400 font-bold">⚠ Matched 3 markers</span>
                    ) : (
                      <span className="text-[#10b981] font-semibold">✓ Intact</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Suspected Leak Investigation Box */}
            <div className="p-3 rounded bg-amber-950/30 border border-amber-500/40 space-y-1 text-xs font-mono">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldAlert size={14} /> SUSPECTED LEAK DETECTED
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-slate-300">
                <div>Matched Markers: <strong className="text-amber-300">3 / 7 markers</strong></div>
                <div>Possible Source: <strong className="text-white">{WATERMARK_DATA.suspected_leak.possible_source}</strong></div>
                <div>Confidence: <span className="text-amber-400 font-bold">{WATERMARK_DATA.suspected_leak.confidence}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
