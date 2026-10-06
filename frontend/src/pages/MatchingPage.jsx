import { MATCHING } from '../data/mockData';
import { getInitials } from '../utils/formatters';
import { UserCheck, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, ThumbsUp, XCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function MatchingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(MATCHING[0]);
  const [decisions, setDecisions] = useState({});

  const handleDecision = (userId, status) => {
    setDecisions(prev => ({ ...prev, [userId]: status }));
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header */}
      <div>
        <div className="eyebrow">TEAM FORMATION & MATCHING</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Research Team Matching Workspace</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Structured candidate evaluation with explainable AI reasoning and conflict checks.
        </p>
      </div>

      {/* Principle Banner */}
      <div className="surface p-4 border-l-4 border-blue-600 flex items-start gap-3 text-xs">
        <UserCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold text-slate-800 dark:text-slate-200">
            AI RECOMMENDATION — HUMAN APPROVAL REQUIRED
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Every recommendation explains why a candidate was ranked. Click any row to inspect match reasoning and conflict checks in the side panel.
          </div>
        </div>
      </div>

      {/* STRUCTURED COMPARISON TABLE */}
      <div className="surface-elevated overflow-hidden border">
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <span className="eyebrow">MATCH RESULTS & CANDIDATES</span>
          <span className="text-xs text-slate-400">Click row to open details side panel</span>
        </div>

        <div className="overflow-x-auto">
          <table className="evidence-table">
            <thead>
              <tr>
                <th>CANDIDATE</th>
                <th>MATCH</th>
                <th>SKILLS</th>
                <th>PROJECT FIT</th>
                <th>COI</th>
                <th>WHY RECOMMENDED</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {MATCHING.map((c) => {
                const isSelected = selectedCandidate?.user.id === c.user.id;
                const decision = decisions[c.user.id];
                return (
                  <tr
                    key={c.user.id}
                    onClick={() => setSelectedCandidate(c)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-500/10 font-medium' : ''
                    }`}
                  >
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-[10px]"
                          style={{ background: c.user.avatar_color || '#1c2b4b' }}
                        >
                          {getInitials(c.user.name)}
                        </div>
                        <div>
                          <div className="font-bold text-xs">{c.user.name}</div>
                          <div className="text-[10px] text-slate-400 capitalize">{c.user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-bold text-teal-600 dark:text-teal-400 text-xs">{c.match_score}%</span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {c.skills_matched.slice(0, 2).map((s) => (
                          <span key={s} className="mono-pill text-[10px]">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="font-semibold text-xs">{c.fit}</td>
                    <td>
                      {c.coi_status === 'clear' ? (
                        <span className="text-teal-600 text-xs font-semibold">✓ Clear</span>
                      ) : (
                        <span className="text-amber-600 text-xs font-semibold">⚠ Review</span>
                      )}
                    </td>
                    <td className="text-xs text-slate-600 dark:text-slate-400 max-w-xs truncate">
                      {c.reason}
                    </td>
                    <td>
                      {decision === 'approved' && <span className="mono-pill text-teal-600 font-bold">APPROVED</span>}
                      {decision === 'rejected' && <span className="mono-pill text-red-600 font-bold">REJECTED</span>}
                      {!decision && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDecision(c.user.id, 'approved'); }}
                          className="btn btn-primary btn-sm text-[11px] py-1 px-2"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CANDIDATE DETAIL SIDE PANEL DRAWER */}
      {selectedCandidate && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-6 space-y-6 overflow-y-auto animate-slide-up">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="eyebrow">CANDIDATE DETAIL PANEL</span>
              <h3 className="text-lg font-bold">{selectedCandidate.user.name}</h3>
            </div>
            <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>

          {/* PROFILE SECTION */}
          <div className="space-y-3 text-xs">
            <span className="eyebrow">1. PROFILE & EXPERIENCE</span>
            <div className="surface-inset p-3 rounded space-y-2">
              <div>
                <span className="text-slate-400">Role: </span>
                <strong className="capitalize">{selectedCandidate.user.role}</strong>
              </div>
              <div>
                <span className="text-slate-400">Experience: </span>
                <span>{selectedCandidate.experience}</span>
              </div>
              <div>
                <span className="text-slate-400">Availability: </span>
                <span>{selectedCandidate.availability}</span>
              </div>
              <div>
                <span className="text-slate-400">Skills: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCandidate.skills_matched.map((s) => (
                    <span key={s} className="mono-pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MATCH REASONING SECTION */}
          <div className="space-y-3 text-xs">
            <span className="eyebrow">2. MATCH REASONING (WHY LINEAGE RECOMMENDED THIS PERSON)</span>
            <div className="surface-inset p-3 rounded border-l-4 border-blue-600 space-y-1">
              <div className="font-bold text-sm text-blue-700 dark:text-blue-400">
                {selectedCandidate.match_score}% Skill & Scope Alignment
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                "{selectedCandidate.reason}"
              </p>
            </div>
          </div>

          {/* CONFLICT CHECK SECTION */}
          <div className="space-y-3 text-xs">
            <span className="eyebrow">3. CONFLICT OF INTEREST CHECK</span>
            <div className="surface-inset p-3 rounded space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {selectedCandidate.coi_detail}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-4 border-t flex items-center justify-end gap-2">
            <button
              onClick={() => handleDecision(selectedCandidate.user.id, 'rejected')}
              className="btn btn-ghost btn-sm text-red-600"
            >
              Reject
            </button>
            <button
              onClick={() => handleDecision(selectedCandidate.user.id, 'approved')}
              className="btn btn-primary btn-sm"
            >
              Approve Candidate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
