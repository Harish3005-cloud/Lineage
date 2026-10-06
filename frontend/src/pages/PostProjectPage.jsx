import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, Cpu, CheckCircle2, RefreshCw, Edit3, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PostProjectPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Low-cost detection of diabetic retinopathy from fundus images on edge devices');
  const [publicSummary, setPublicSummary] = useState('We are looking for a research team to explore an affordable edge-based approach for detecting diabetic retinopathy from retinal fundus images in rural healthcare settings.');
  const [confidentialBrief, setConfidentialBrief] = useState('Clinical dataset parameters: 15,000 raw anonymized fundus images provided by HealthTech India Foundation. API Keys and Edge Model Quantization targets: TensorFlow Lite on Raspberry Pi 4.');
  const [fundingType, setFundingType] = useState('funded'); // 'funded' | 'non_monetary'
  const [budget, setBudget] = useState('100000');

  // AI Scope Proposal State
  const [aiScopingDone, setAiScopingDone] = useState(false);
  const [milestonesApproved, setMilestonesApproved] = useState(false);
  const [proposedMilestones, setProposedMilestones] = useState([
    {
      order: 1,
      title: 'Dataset Preparation & Quality Metrics',
      goal: 'Prepare and clean the retinal fundus image dataset. Implement augmentation pipeline.',
      skills: ['Python', 'Pandas', 'Computer Vision'],
      budget: '₹25,000',
    },
    {
      order: 2,
      title: 'Lightweight CNN Model Development',
      goal: 'Develop and evaluate classification model targeting >90% accuracy.',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      budget: '₹40,000',
    },
    {
      order: 3,
      title: 'Edge Device Quantization & Deployment',
      goal: 'Optimize model for low-cost Raspberry Pi edge deployment with <2s inference.',
      skills: ['Python', 'Model Optimization', 'Edge AI'],
      budget: '₹35,000',
    },
  ]);

  const handleGenerateAiScope = () => {
    setAiScopingDone(true);
  };

  const handleApproveMilestones = () => {
    setMilestonesApproved(true);
  };

  const handlePublishProject = () => {
    navigate('/project');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="eyebrow">SPONSOR WORKSPACE</div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Post a Research Problem</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Define project scope, configure confidential access controls, and generate AI-assisted milestones.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1: Project Details Form */}
        <div className="surface-elevated p-6 space-y-5">
          <div className="eyebrow">1.0 RESEARCH PROBLEM DEFINITION</div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">PROJECT TITLE</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded text-xs font-medium surface-inset border border-slate-300 dark:border-slate-700 outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold flex items-center gap-1">
                <Eye size={13} className="text-teal-600" /> PUBLIC SUMMARY (Visible to Everyone)
              </label>
              <span className="text-[10px] text-teal-600 font-semibold">PUBLIC ACCESS</span>
            </div>
            <textarea
              rows={3}
              value={publicSummary}
              onChange={(e) => setPublicSummary(e.target.value)}
              className="w-full p-2.5 rounded text-xs surface-inset border border-slate-300 dark:border-slate-700 outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold flex items-center gap-1 text-amber-700 dark:text-amber-400">
                <Lock size={13} /> CONFIDENTIAL BRIEF (Locked to Accepted Members Only)
              </label>
              <span className="mono-pill text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400">
                🔒 ACCESS RESTRICTED
              </span>
            </div>
            <textarea
              rows={3}
              value={confidentialBrief}
              onChange={(e) => setConfidentialBrief(e.target.value)}
              className="w-full p-2.5 rounded text-xs surface-inset border border-slate-300 dark:border-slate-700 outline-none focus:border-teal-500"
            />
            <div className="text-[11px] text-slate-400">
              * Non-accepted users will only see: 🔒 Confidential Brief — Visible only after project acceptance.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">PROJECT TYPE & REWARD STRUCTURE</label>
              <select
                value={fundingType}
                onChange={(e) => setFundingType(e.target.value)}
                className="w-full p-2.5 rounded text-xs surface-inset border border-slate-300 dark:border-slate-700 outline-none"
              >
                <option value="funded">Funded Project (Escrow Payouts)</option>
                <option value="non_monetary">Non-Monetary Project (Academic Credentials)</option>
              </select>
            </div>

            {fundingType === 'funded' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold">TOTAL ESCROW BUDGET (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2.5 rounded text-xs font-mono surface-inset border border-slate-300 dark:border-slate-700 outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Step 2: AI-Assisted Milestone Scoping */}
        <div className="surface-elevated p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="eyebrow flex items-center gap-1.5">
              <Cpu size={14} className="text-teal-600" /> 2.0 AI-ASSISTED PROJECT SCOPING
            </div>
            {!aiScopingDone && (
              <button onClick={handleGenerateAiScope} className="btn btn-secondary btn-sm">
                <Cpu size={14} /> Propose Milestones via AI Agent
              </button>
            )}
          </div>

          {!aiScopingDone ? (
            <div className="surface-inset p-6 text-center space-y-2 text-xs">
              <div className="text-slate-500">
                Click "Propose Milestones via AI Agent" to automatically decompose the research problem into structured milestones.
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                Principle: AI proposes plan → Human Sponsor retains final approval authority.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded surface-inset border border-teal-500/20 flex items-center justify-between text-xs">
                <span className="font-semibold text-teal-800 dark:text-teal-300 flex items-center gap-1">
                  <CheckCircle2 size={14} /> AI GENERATED PROPOSAL
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAiScopingDone(true)} className="btn btn-ghost btn-sm text-xs">
                    <RefreshCw size={12} /> Regenerate
                  </button>
                  <button onClick={handleApproveMilestones} className={`btn btn-sm ${milestonesApproved ? 'btn-secondary' : 'btn-primary'}`}>
                    {milestonesApproved ? '✓ Milestones Approved by Sponsor' : 'Approve Milestones'}
                  </button>
                </div>
              </div>

              {/* Proposed Milestones List */}
              <div className="space-y-3">
                {proposedMilestones.map((m) => (
                  <div key={m.order} className="surface-inset p-4 rounded text-xs space-y-2 border">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm">
                        Milestone {m.order}: {m.title}
                      </div>
                      <span className="mono-pill text-teal-600 font-bold">{m.budget}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>{m.goal}</p>
                    <div className="flex flex-wrap gap-1">
                      {m.skills.map((s) => (
                        <span key={s} className="mono-pill">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Publish Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button
            onClick={handlePublishProject}
            className="btn btn-primary btn-sm"
          >
            Publish Project & Open Charter <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
