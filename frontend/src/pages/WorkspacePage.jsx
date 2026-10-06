import { useState } from 'react';
import { MILESTONES, PROJECT, DASHBOARD_RECENT_ACTIVITY, USERS } from '../data/mockData';
import { getInitials } from '../utils/formatters';
import { FolderOpen, FileText, CheckCircle2, ArrowRight, ShieldCheck, Clock, Plus, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AiGatewayTelemetryDrawer from '../components/forensic/AiGatewayTelemetryDrawer';

export default function WorkspacePage() {
  const navigate = useNavigate();
  const [activeMilestoneId, setActiveMilestoneId] = useState('m-002');
  const activeMilestone = MILESTONES.find(m => m.id === activeMilestoneId) || MILESTONES[1];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Workspace Header */}
      <div className="border-b border-[#272b35] pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className="badge-slate font-mono text-[10px]">RESEARCH WORKSPACE TELEMETRY</span>
          <h1 className="text-lg font-bold text-[#e6e8ec] mt-1">{PROJECT.title}</h1>
        </div>
        <button onClick={() => navigate('/contributions')} className="btn-forensic btn-forensic-amber text-xs shrink-0">
          <Plus size={14} /> Submit Artifact Contribution
        </button>
      </div>

      {/* CORE FORENSIC VIEW: PROJECT AI GATEWAY TELEMETRY DRAWER */}
      <AiGatewayTelemetryDrawer />

      {/* THREE-COLUMN WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: PROJECT NAVIGATION */}
        <div className="lg:col-span-3 terminal-surface p-4 space-y-4 font-mono text-xs">
          <span className="eyebrow">MILESTONE TRACKER</span>

          <div className="space-y-2">
            {MILESTONES.map((m) => {
              const isActive = m.id === activeMilestoneId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMilestoneId(m.id)}
                  className={`w-full text-left p-3 rounded transition-all border ${
                    isActive
                      ? 'border-[#3b82f6] bg-[#181b22] font-bold text-white'
                      : 'border-[#272b35] bg-[#090a0f] text-[#8c93a4] hover:border-[#373c4a]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#626875] mb-1">
                    <span>MILESTONE 0{m.order}</span>
                    <span className="badge-slate text-[9px]">{m.credit}</span>
                  </div>
                  <div className="text-xs truncate">{m.title}</div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#1c2029] space-y-2">
            <span className="eyebrow">HUMAN OPERATORS</span>
            {[PROJECT.sponsor, USERS.expert, USERS.studentA].map((u, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#181b22] text-white flex items-center justify-center text-[9px] font-bold">
                  {getInitials(u.name)}
                </div>
                <span className="text-xs text-slate-300 truncate">{u.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN: CURRENT WORK */}
        <div className="lg:col-span-6 terminal-surface p-5 space-y-5 font-mono text-xs">
          <div className="border-b border-[#272b35] pb-3 flex items-center justify-between">
            <div>
              <span className="badge-slate text-[10px]">ACTIVE MILESTONE 0{activeMilestone.order}</span>
              <h2 className="text-base font-bold text-[#e6e8ec] mt-1">{activeMilestone.title}</h2>
            </div>
            <span className="badge-amber">
              IN PROGRESS
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded space-y-1">
              <span className="eyebrow">OBJECTIVE</span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {activeMilestone.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded">
                <span className="eyebrow">HUMAN IMPLEMENTER</span>
                <div className="font-bold text-xs mt-0.5 text-white">{activeMilestone.owner.name}</div>
                <div className="text-[10px] text-[#626875]">Sole Credit Recipient</div>
              </div>

              <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded">
                <span className="eyebrow">REQUIRED SKILLS</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeMilestone.skills.map((s) => (
                    <span key={s} className="badge-slate text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded space-y-1">
              <span className="eyebrow">EXPECTED ARTIFACT DELIVERABLE</span>
              <div className="font-mono font-bold text-[#10b981]">
                {activeMilestone.deliverable}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => navigate('/contributions')} className="btn-forensic btn-forensic-amber text-xs">
                <Plus size={14} /> Submit Artifact for Milestone
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVIDENCE / ACTIVITY TRAIL */}
        <div className="lg:col-span-3 terminal-surface p-4 space-y-4 font-mono text-xs">
          <span className="eyebrow flex items-center gap-1">
            <Clock size={12} /> TELEMETRY LOG
          </span>

          <div className="space-y-2 text-xs">
            {DASHBOARD_RECENT_ACTIVITY.map((act, i) => (
              <div key={i} className="p-2 bg-[#0d0f14] border border-[#1c2029] rounded space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-[#626875]">
                  <span>{act.time}</span>
                  <span className="text-[#10b981] font-bold">LOGGED</span>
                </div>
                <div className="font-bold text-slate-200 text-[11px]">{act.event}</div>
                <div className="font-mono text-[10px] text-[#626875]">{act.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
