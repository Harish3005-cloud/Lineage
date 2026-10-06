import { useState } from 'react';
import { MILESTONES, PROJECT, DASHBOARD_RECENT_ACTIVITY, USERS } from '../data/mockData';
import { getInitials } from '../utils/formatters';
import { FolderOpen, FileText, CheckCircle2, ArrowRight, ShieldCheck, Clock, Plus, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WorkspacePage() {
  const navigate = useNavigate();
  const [activeMilestoneId, setActiveMilestoneId] = useState('m-002');
  const activeMilestone = MILESTONES.find(m => m.id === activeMilestoneId) || MILESTONES[1];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Workspace Header */}
      <div className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className="mono-pill text-xs">RESEARCH WORKSPACE</span>
          <h1 className="text-xl font-bold mt-1">{PROJECT.title}</h1>
        </div>
        <button onClick={() => navigate('/contributions')} className="btn btn-primary btn-sm shrink-0">
          <Plus size={14} /> Submit Contribution
        </button>
      </div>

      {/* THREE-COLUMN WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PROJECT NAVIGATION */}
        <div className="lg:col-span-3 surface-elevated p-4 space-y-4">
          <span className="eyebrow">PROJECT MILESTONES</span>

          <div className="space-y-2 text-xs">
            {MILESTONES.map((m) => {
              const isActive = m.id === activeMilestoneId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMilestoneId(m.id)}
                  className={`w-full text-left p-3 rounded transition-all border ${
                    isActive
                      ? 'border-blue-600 bg-blue-500/10 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span>MILESTONE 0{m.order}</span>
                    <span className="mono-pill text-[9px]">{m.credit}</span>
                  </div>
                  <div className="text-xs truncate">{m.title}</div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t text-xs space-y-2">
            <span className="eyebrow">TEAM STAKEHOLDERS</span>
            {[PROJECT.sponsor, USERS.expert, USERS.studentA].map((u, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[9px] font-bold">
                  {getInitials(u.name)}
                </div>
                <span className="text-xs truncate">{u.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN: CURRENT WORK */}
        <div className="lg:col-span-6 surface-elevated p-6 space-y-6">
          <div className="border-b pb-4 flex items-center justify-between">
            <div>
              <span className="mono-pill text-xs">ACTIVE MILESTONE 0{activeMilestone.order}</span>
              <h2 className="text-lg font-bold mt-1">{activeMilestone.title}</h2>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-500/10 text-blue-700 dark:text-blue-300">
              IN PROGRESS
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="surface-inset p-3 rounded space-y-1">
              <span className="eyebrow">OBJECTIVE</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeMilestone.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="surface-inset p-3 rounded">
                <span className="eyebrow">OWNER</span>
                <div className="font-bold text-sm mt-0.5">{activeMilestone.owner.name}</div>
                <div className="text-slate-400">Primary Implementer</div>
              </div>

              <div className="surface-inset p-3 rounded">
                <span className="eyebrow">REQUIRED SKILLS</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeMilestone.skills.map((s) => (
                    <span key={s} className="mono-pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-inset p-3 rounded space-y-1">
              <span className="eyebrow">EXPECTED DELIVERABLE</span>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {activeMilestone.deliverable}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => navigate('/contributions')} className="btn btn-primary btn-sm">
                <Plus size={14} /> Submit Contribution for Milestone
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVIDENCE / ACTIVITY TRAIL */}
        <div className="lg:col-span-3 surface-elevated p-4 space-y-4">
          <span className="eyebrow flex items-center gap-1">
            <Clock size={12} /> EVIDENCE & ACTIVITY
          </span>

          <div className="space-y-3 text-xs">
            {DASHBOARD_RECENT_ACTIVITY.map((act, i) => (
              <div key={i} className="surface-inset p-2.5 rounded space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{act.time}</span>
                  <span className="text-teal-600 font-bold">LOGGED</span>
                </div>
                <div className="font-bold">{act.event}</div>
                <div className="font-mono text-[11px] text-slate-500">{act.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
