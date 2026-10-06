import { PROJECT, MILESTONES, CHARTER } from '../data/mockData';
import { getInitials, formatDate } from '../utils/formatters';
import { ShieldCheck, CheckCircle2, CircleDot, Clock, ArrowRight, UserCheck, Lock, Eye, ScrollText, Cpu, FileCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProjectPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAcceptedMember, setIsAcceptedMember] = useState(true);
  const [showConfidentialBrief, setShowConfidentialBrief] = useState(false);
  const [charterAccepted, setCharterAccepted] = useState(true);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="eyebrow">PROJECT DOCUMENT & WORKSPACE</div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight max-w-3xl">
            {PROJECT.title}
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 flex items-center gap-1.5">
              <ShieldCheck size={14} /> STATUS: ACTIVE
            </span>
          </div>
        </div>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 px-4 surface rounded text-xs">
          <div>
            <span className="text-slate-400">Sponsor: </span>
            <strong className="font-semibold">{PROJECT.sponsor.name}</strong>
          </div>
          <div className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-slate-400">Budget: </span>
            <strong className="font-semibold text-teal-600 dark:text-teal-400">₹{PROJECT.budget.toLocaleString()}</strong>
          </div>
          <div className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-slate-400">Integrity: </span>
            <span className="mono-pill text-teal-600 font-bold">VERIFIED ✓</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs md:text-sm font-medium overflow-x-auto">
        {['overview', 'charter', 'milestones', 'team', 'evidence', 'ledger'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 border-b-2 capitalize transition-colors whitespace-nowrap ${
              activeTab === tab ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6 text-sm">
          {/* Public Summary */}
          <div className="surface-elevated p-6 space-y-2">
            <div className="eyebrow flex items-center gap-1">
              <Eye size={13} className="text-teal-600" /> PUBLIC SUMMARY
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {PROJECT.public_summary}
            </p>
          </div>

          {/* Confidential Brief Access Control Box */}
          <div className="surface-elevated p-6 space-y-3 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div className="eyebrow flex items-center gap-1 text-amber-700 dark:text-amber-400">
                <Lock size={13} /> CONFIDENTIAL BRIEF
              </div>
              <span className="mono-pill text-[10px] bg-amber-500/10 text-amber-700">🔒 RESTRICTED INFORMATION</span>
            </div>

            {!isAcceptedMember ? (
              <div className="space-y-3">
                <p className="text-slate-500 text-xs">
                  Available only to accepted project members under watermarked variant tracing.
                </p>
                <button onClick={() => setIsAcceptedMember(true)} className="btn btn-primary btn-sm">
                  Request Access & Accept Charter
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {!showConfidentialBrief ? (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">You are an accepted project member. Click to view confidential clinical dataset parameters.</span>
                    <button onClick={() => setShowConfidentialBrief(true)} className="btn btn-secondary btn-sm">
                      View Confidential Brief
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded surface-inset border border-amber-500/30 space-y-1 animate-fade-in">
                    <div className="font-bold text-amber-800 dark:text-amber-300">CONFIDENTIAL BRIEF DETAILS (Watermark Variant 04):</div>
                    <p className="text-slate-700 dark:text-slate-300 font-mono">
                      {PROJECT.confidential_brief}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHARTER TAB */}
      {activeTab === 'charter' && (
        <div className="surface-elevated p-8 space-y-6 text-sm border shadow-sm">
          <div className="border-b pb-4 flex items-center justify-between">
            <div>
              <span className="mono-pill text-xs">PROJECT CHARTER v1.0</span>
              <h2 className="text-lg font-bold mt-1">Project Charter & Binding Terms</h2>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300">
              STATUS: PUBLISHED — APPLICATIONS OPEN
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="eyebrow">1.0 PROJECT SCOPE</h3>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{CHARTER.sections.scope}</p>
            </div>

            <div>
              <h3 className="eyebrow">2.0 MILESTONE STRUCTURE</h3>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{CHARTER.sections.milestones}</p>
            </div>

            <div>
              <h3 className="eyebrow">3.0 AI POLICY & USAGE</h3>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{CHARTER.sections.ai_usage}</p>
            </div>

            <div>
              <h3 className="eyebrow">4.0 CONFIDENTIALITY & WATERMARKING</h3>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{CHARTER.sections.confidentiality}</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="eyebrow">ACCEPTANCE LOG & SIGNATURES</div>
            <div className="space-y-1.5 text-xs">
              {CHARTER.accepted_by.map((s, i) => (
                <div key={i} className="flex items-center justify-between surface-inset p-2 rounded">
                  <span className="font-semibold">{s.user.name} ({s.user.role})</span>
                  <span className="text-teal-600 font-mono font-bold">✓ Accepted Charter v1.0 · {formatDate(s.date)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex items-center justify-between border-t">
              <span className="text-xs text-slate-500">I agree to the terms defined in Charter v1.0.</span>
              <button
                onClick={() => setCharterAccepted(true)}
                className={`btn btn-sm ${charterAccepted ? 'btn-secondary' : 'btn-primary'}`}
                disabled={charterAccepted}
              >
                {charterAccepted ? '✓ Accepted by Aarav · 06 October 2026' : 'Accept Charter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MILESTONES TAB */}
      {activeTab === 'milestones' && (
        <div className="space-y-4 text-xs">
          {MILESTONES.map((m) => (
            <div key={m.id} className="surface-elevated p-6 space-y-3">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="font-bold text-sm">Milestone 0{m.order}: {m.title}</div>
                <span className="mono-pill text-teal-600 font-bold">{m.credit}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{m.description}</p>
              <div className="flex items-center justify-between text-slate-500">
                <span>Owner: {m.owner.name}</span>
                <span>Deliverable: {m.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TEAM / EVIDENCE / LEDGER TABS */}
      {activeTab === 'team' && (
        <div className="surface-elevated p-6 space-y-3 text-xs">
          <span className="eyebrow">PROJECT RESEARCH TEAM</span>
          <div className="space-y-2">
            {[PROJECT.sponsor, USERS.expert, USERS.studentA, USERS.studentC].map((u, i) => (
              <div key={i} className="flex items-center justify-between surface-inset p-3 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-[10px]">
                    {getInitials(u.name)}
                  </div>
                  <span className="font-bold">{u.name}</span>
                </div>
                <span className="mono-pill uppercase">{u.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'evidence' && (
        <div className="surface-elevated p-6 space-y-3 text-xs">
          <span className="eyebrow">RESEARCH EVIDENCE & ARTIFACT PROVENANCE</span>
          <p className="text-slate-500">Click below to open the dedicated Evidence & Contribution workspace.</p>
          <button onClick={() => navigate('/contributions')} className="btn btn-primary btn-sm">
            Open Contribution Workspace <ArrowRight size={14} />
          </button>
        </div>
      )}

      {activeTab === 'ledger' && (
        <div className="surface-elevated p-6 space-y-3 text-xs">
          <span className="eyebrow">CRYPTOGRAPHIC LEDGER TRAIL</span>
          <p className="text-slate-500">Immutable hash-chained audit log for this project.</p>
          <button onClick={() => navigate('/ledger')} className="btn btn-primary btn-sm">
            Open Cryptographic Ledger <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
