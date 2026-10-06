import React from 'react';
import { Coins, GitBranch, ArrowUpRight, ShieldCheck, PieChart } from 'lucide-react';

export default function CreditBySurvivalMatrix() {
  const survivalData = [
    {
      contributor: 'Arjun Sharma',
      role: 'STUDENT (Age 17)',
      artifact: 'clahe_preprocessing.py',
      milestone: 'Milestone 1: Dataset Prep',
      submittedTokens: 1420,
      survivingTokens: 1348,
      survivalRatio: '94.9%',
      impactScore: '8.5 / 10',
      escrowShare: '₹25,000 INR',
      status: 'ACCEPTED & PAID',
    },
    {
      contributor: 'Arjun Sharma',
      role: 'STUDENT',
      artifact: 'mobilenet_int8_quant.py',
      milestone: 'Milestone 2: Model Quantization',
      submittedTokens: 2180,
      survivingTokens: 1890,
      survivalRatio: '86.7%',
      impactScore: '7.8 / 10',
      escrowShare: '₹34,680 INR',
      status: 'REVIEW PENDING',
    },
    {
      contributor: 'Dr. Meera Raman',
      role: 'EXPERT',
      artifact: 'edge_quantization_benchmark.cpp',
      milestone: 'Milestone 3: Edge Deployment',
      submittedTokens: 3100,
      survivingTokens: 2980,
      survivalRatio: '96.1%',
      impactScore: '9.2 / 10',
      escrowShare: '₹30,000 INR',
      status: 'ACTIVE',
    },
  ];

  return (
    <div className="terminal-surface p-4 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#272b35] pb-3 font-mono">
        <div className="flex items-center gap-2">
          <Coins size={16} className="text-[#e5a93c]" />
          <span className="font-bold text-xs uppercase tracking-wider text-[#e6e8ec]">
            Credit by Survival Allocation Matrix
          </span>
          <span className="badge-amber font-mono">Simulated Escrow: ₹1,00,000</span>
        </div>

        <div className="text-[11px] text-[#9ea3b0]">
          Principle: Reward surviving accepted tokens in final artifact — not raw commit spam.
        </div>
      </div>

      {/* Dense Data Table */}
      <div className="overflow-x-auto">
        <table className="dense-table font-mono">
          <thead>
            <tr>
              <th>Contributor</th>
              <th>Artifact / Milestone</th>
              <th>Submitted Tokens</th>
              <th>Surviving Tokens</th>
              <th>Survival Ratio %</th>
              <th>Impact Score</th>
              <th>Calculated Escrow Share</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {survivalData.map((row, idx) => (
              <tr key={idx}>
                <td className="font-bold text-[#e6e8ec]">
                  {row.contributor}
                  <span className="text-[10px] text-[#626875] block font-normal">{row.role}</span>
                </td>
                <td>
                  <span className="text-white font-semibold block">{row.artifact}</span>
                  <span className="text-[10px] text-[#8c93a4] block">{row.milestone}</span>
                </td>
                <td className="text-[#8c93a4]">{row.submittedTokens.toLocaleString()} tk</td>
                <td className="text-[#10b981] font-bold">{row.survivingTokens.toLocaleString()} tk</td>
                <td>
                  <span className="badge-emerald">{row.survivalRatio}</span>
                </td>
                <td className="text-[#e5a93c] font-bold">{row.impactScore}</td>
                <td className="text-[#10b981] font-extrabold">{row.escrowShare}</td>
                <td>
                  <span className={
                    row.status.includes('PAID')
                      ? 'badge-emerald'
                      : row.status.includes('PENDING')
                      ? 'badge-amber'
                      : 'badge-slate'
                  }>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Matrix Footer */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#626875] pt-2 border-t border-[#1c2029]">
        <span>Formula: Escrow Share = (Surviving Tokens / Total Accepted Artifact Tokens) × Milestone Escrow Allocation</span>
        <span className="text-[#10b981] font-semibold">✓ Cryptographically Hashed in Ledger #102</span>
      </div>

    </div>
  );
}
