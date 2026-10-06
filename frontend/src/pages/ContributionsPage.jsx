import { CONTRIBUTIONS, MILESTONES, USERS } from '../data/mockData';
import { getInitials, truncateHash } from '../utils/formatters';
import { FileText, ShieldCheck, AlertTriangle, CheckCircle2, Bot, Plus, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

export default function ContributionsPage() {
  const [contributions, setContributions] = useState(CONTRIBUTIONS);
  const [selectedContribution, setSelectedContribution] = useState(CONTRIBUTIONS[0]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [artifactName, setArtifactName] = useState('Preprocessing Report');
  const [milestoneId, setMilestoneId] = useState('m-001');
  const [aiAssisted, setAiAssisted] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContrib = {
      id: 'C-104',
      contributor: USERS.studentA,
      artifact: artifactName,
      file_name: `${artifactName.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      milestone: MILESTONES.find(m => m.id === milestoneId) || MILESTONES[0],
      submitted_at: new Date().toISOString(),
      ai_assisted: aiAssisted,
      ai_receipt_id: aiAssisted ? 'AIR-0042' : null,
      hash: '19AC4D7E8F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C',
      status: 'flagged',
      similarity_score: 78,
      similarity_detail: 'Potential overlap detected with existing published architecture. Human review required.',
      reviewed_by: USERS.expert,
    };

    setContributions([newContrib, ...contributions]);
    setSelectedContribution(newContrib);
    setShowModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="eyebrow">WORK EVIDENCE & PROVENANCE</div>
          <h1 className="text-2xl font-bold tracking-tight mt-1">Contribution Workspace</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Artifact submissions, similarity verification, and impact attribution.
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="btn btn-primary btn-sm shrink-0">
          <Plus size={15} /> Submit Contribution
        </button>
      </div>

      {/* SELECTED CONTRIBUTION & INTEGRITY CHECK PANEL */}
      {selectedContribution && (
        <div className="surface-elevated p-6 space-y-6 border-l-4 border-amber-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <div className="flex items-center gap-2">
                <span className="mono-pill font-bold text-sm">CONTRIBUTION #{selectedContribution.id}</span>
                {selectedContribution.status === 'flagged' ? (
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400">
                    ⚠ INTEGRITY FLAG
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300">
                    ACCEPTED
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold font-mono mt-1">{selectedContribution.artifact}</h2>
            </div>

            <div className="text-right text-xs">
              <div className="text-slate-400">SHA-256 Hash</div>
              <div className="hash-display">{truncateHash(selectedContribution.hash, 16)}</div>
            </div>
          </div>

          {/* INTEGRITY CHECK RESULT BOX */}
          <div className="p-4 rounded surface-inset border border-amber-500/30 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 text-sm">
                <AlertTriangle size={16} /> INTEGRITY CHECK RESULT: {selectedContribution.similarity_score}% SIMILARITY
              </div>
              <span className="mono-pill text-amber-600 font-bold">⚠ POTENTIAL OVERLAP DETECTED</span>
            </div>

            <p style={{ color: 'var(--text-secondary)' }}>
              "Potential overlap detected with existing published material. Mandatory human review required before milestone acceptance."
            </p>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button className="btn btn-secondary btn-sm">
                View Evidence Detail
              </button>
              <button className="btn btn-primary btn-sm">
                Request Expert Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT CONTRIBUTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="surface-elevated max-w-md w-full p-6 space-y-4 relative border shadow-xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>

            <div className="space-y-1">
              <span className="eyebrow">WORK SUBMISSION</span>
              <h3 className="text-lg font-bold">Submit Contribution</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold">MILESTONE</label>
                <select
                  value={milestoneId}
                  onChange={(e) => setMilestoneId(e.target.value)}
                  className="w-full p-2.5 rounded surface-inset border border-slate-300 dark:border-slate-700 outline-none"
                >
                  {MILESTONES.map(m => (
                    <option key={m.id} value={m.id}>Milestone 0{m.order}: {m.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold">ARTIFACT NAME</label>
                <input
                  type="text"
                  value={artifactName}
                  onChange={(e) => setArtifactName(e.target.value)}
                  className="w-full p-2.5 rounded surface-inset border border-slate-300 dark:border-slate-700 outline-none font-mono"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="aiAssisted"
                  checked={aiAssisted}
                  onChange={(e) => setAiAssisted(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="aiAssisted" className="font-semibold cursor-pointer">
                  AI assistance used (Links AI Receipt AIR-0042)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Submit Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
