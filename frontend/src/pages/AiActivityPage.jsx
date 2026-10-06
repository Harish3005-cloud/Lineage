import { AI_AGENT, AI_TIMELINE_EVENTS, PROJECT, USERS } from '../data/mockData';
import { getInitials } from '../utils/formatters';
import { Bot, ShieldCheck, Lock, FileText, CheckCircle2, ChevronDown, ChevronUp, Cpu, Key, ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

export default function AiActivityPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [actionDone, setActionDone] = useState(false);

  const handleRunAgent = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setActionDone(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="eyebrow">AUDIT & GOVERNANCE</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">AI Activity & Trust Gateway</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Controlled, auditable AI participation with explicit human owner attribution.
        </p>
      </div>

      {/* RESEARCH ASSISTANT AI AGENT PANEL */}
      <div className="surface-elevated p-6 space-y-5 border-l-4 border-blue-600">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
              <Bot size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{AI_AGENT.name}</h2>
                <span className="mono-pill text-xs bg-teal-500/10 text-teal-600 font-bold">STATUS: {AI_AGENT.status}</span>
              </div>
              <p className="text-xs text-slate-500">{AI_AGENT.purpose}</p>
            </div>
          </div>

          <button
            onClick={handleRunAgent}
            disabled={isRunning}
            className="btn btn-primary btn-sm shrink-0"
          >
            {isRunning ? (
              <span className="flex items-center gap-1.5"><Cpu size={14} className="animate-spin" /> Gateway Processing...</span>
            ) : (
              <span className="flex items-center gap-1.5"><Play size={14} /> Run Agent</span>
            )}
          </button>
        </div>

        {/* AGENT PARAMETERS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">HUMAN OWNER</span>
            <div className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-0.5">{AI_AGENT.human_owner.name}</div>
            <div className="text-slate-400">Accountable Owner</div>
          </div>

          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">PROJECT SCOPE</span>
            <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 truncate">{PROJECT.title}</div>
          </div>

          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">ALLOWED DATA SCOPE</span>
            <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">{AI_AGENT.access}</div>
          </div>

          <div className="surface-inset p-3 rounded">
            <span className="eyebrow">SENSITIVE DATA</span>
            <div className="font-semibold text-teal-600 dark:text-teal-400 mt-0.5">{AI_AGENT.sensitive_data} ✓</div>
          </div>
        </div>

        {/* AI TRUST GATEWAY VERIFICATION PIPELINE */}
        <div className="surface-inset p-4 rounded space-y-3">
          <span className="eyebrow">AI TRUST GATEWAY ENFORCEMENT</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-white dark:bg-slate-800 border border-teal-500/30 flex items-center justify-between">
              <span>Permission</span> <span className="text-teal-600 font-bold">✓</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-800 border border-teal-500/30 flex items-center justify-between">
              <span>Project scope</span> <span className="text-teal-600 font-bold">✓</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-800 border border-teal-500/30 flex items-center justify-between">
              <span>Data scope</span> <span className="text-teal-600 font-bold">✓</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-800 border border-teal-500/30 flex items-center justify-between">
              <span>Human owner</span> <span className="text-teal-600 font-bold">✓</span>
            </div>
          </div>

          {actionDone && (
            <div className="p-3 rounded bg-teal-500/10 border border-teal-500/30 text-xs flex items-center justify-between animate-fade-in">
              <span className="font-bold text-teal-800 dark:text-teal-300">✓ AI ACTION COMPLETE — AIR-0042 RECEIPT GENERATED</span>
              <span className="mono-pill text-[10px] text-teal-700">Audit Receipt AIR-0042</span>
            </div>
          )}
        </div>
      </div>

      {/* VERTICAL EVIDENCE TIMELINE */}
      <div className="space-y-4">
        <div className="eyebrow">VERTICAL EVIDENCE TIMELINE (AIR-0042)</div>

        <div className="surface-elevated p-6 space-y-6">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-500/30">
            {AI_TIMELINE_EVENTS.map((ev, i) => (
              <div key={i} className="relative flex items-start gap-4 text-xs animate-slide-up">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900" />
                <div className="font-mono text-slate-400 w-16 shrink-0">{ev.time}</div>
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800 dark:text-slate-200">{ev.title}</div>
                  <div className="font-mono text-slate-500">{ev.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
