import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, GitCommit, Link2, CheckCircle2, UserCheck, Terminal, ArrowDown } from 'lucide-react';

export default function CryptographicProvenanceDAG() {
  const [isTampered, setIsTampered] = useState(false);
  const [inspectedBlock, setInspectedBlock] = useState(null);

  const dagNodes = [
    {
      index: 101,
      shortHash: '91af73e4',
      fullHash: '91af73e4b52c0199d3e810a7b4f51e2894101c52d87e3f192a009bf872e41103',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      artifact: 'clahe_preprocessing.py',
      contributor: 'Arjun Sharma',
      role: 'STUDENT (Age 17)',
      timestamp: '2026-10-03T16:25:00Z',
      status: 'VALID',
      stage: 'PREPROCESSING',
    },
    {
      index: 102,
      shortHash: isTampered ? '77fd99aa' : '8a23d91b',
      fullHash: isTampered
        ? '77fd99aa77fd99aa77fd99aa77fd99aa77fd99aa77fd99aa77fd99aa77fd99aa'
        : '8a23d91bf4c5021a884e9021c4b780f2c99a01bf2304918e7723901bcf882190',
      prevHash: '91af73e4b52c0199d3e810a7b4f51e2894101c52d87e3f192a009bf872e41103',
      artifact: 'mobilenet_int8_quant.py',
      contributor: 'Arjun Sharma',
      role: 'STUDENT',
      timestamp: '2026-10-05T09:30:00Z',
      status: isTampered ? 'BROKEN' : 'VALID',
      stage: 'QUANTIZATION',
    },
    {
      index: 103,
      shortHash: 'c4e5f6a7',
      fullHash: 'c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
      prevHash: isTampered ? 'INVALID_EXPECTED_8a23d91b' : '8a23d91bf4c5021a884e9021c4b780f2c99a01bf2304918e7723901bcf882190',
      artifact: 'edge_quantization_benchmark.cpp',
      contributor: 'Dr. Meera Raman',
      role: 'EXPERT',
      timestamp: '2026-10-06T11:00:00Z',
      status: isTampered ? 'BROKEN' : 'VALID',
      stage: 'BENCHMARK',
    },
  ];

  return (
    <div className="terminal-surface p-4 space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#272b35] pb-3">
        <div className="flex items-center gap-2">
          <GitCommit size={16} className="text-[#e5a93c]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#e6e8ec]">
            Cryptographic Provenance DAG
          </span>
          <span className="badge-slate font-mono">v1.2 Protocol</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTampered(!isTampered)}
            className={`btn-forensic ${isTampered ? 'btn-forensic-amber' : 'btn-forensic-crimson'}`}
          >
            <AlertTriangle size={13} />
            <span>{isTampered ? 'Restore Valid Chain' : 'Simulate Ledger Tamper'}</span>
          </button>
        </div>
      </div>

      {/* CHAIN BROKEN Alert State */}
      {isTampered && (
        <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-md space-y-2 text-xs font-mono text-red-200 animate-slide-up">
          <div className="flex items-center justify-between text-red-400 font-bold">
            <span className="flex items-center gap-2">
              <AlertTriangle size={15} /> ⚠ CRYPTOGRAPHIC LEDGER INTEGRITY FAILURE: HISTORY MODIFIED
            </span>
            <span className="badge-crimson">CHAIN BROKEN</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div>Expected Node #102 Hash: <code className="text-emerald-400">8a23d91b...</code></div>
            <div>Calculated Hash: <code className="text-red-400 font-bold">77fd99aa... (TAMPERED)</code></div>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-red-900/60">
            "Corrections cannot silently overwrite past DAG state. A new append-only entry must be logged."
          </div>
        </div>
      )}

      {/* Vertical DAG Node List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#272b35]">
        {dagNodes.map((node, idx) => {
          const isNodeBroken = node.status === 'BROKEN';
          return (
            <div key={node.index} className="relative group">
              {/* DAG Node Bullet Point */}
              <div className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 ${
                isNodeBroken ? 'bg-red-500 border-red-400 animate-pulse' : 'bg-[#090a0f] border-[#10b981]'
              }`} />

              {/* Node Card */}
              <div className={`terminal-card p-3 space-y-2 transition-all ${
                isNodeBroken ? 'border-red-500/60 bg-red-950/20' : 'hover:border-[#373c4a]'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1c2029] pb-2 text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[#e5a93c] font-bold">BLOCK #{node.index}</span>
                    <span className="text-[#626875]">|</span>
                    <span className="text-[#9ea3b0] font-bold">{node.artifact}</span>
                    <span className="badge-slate uppercase text-[10px]">{node.stage}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="badge-slate font-mono text-[10px]">
                      <UserCheck size={11} className="text-[#10b981]" /> {node.contributor} ({node.role})
                    </span>
                    {isNodeBroken ? (
                      <span className="badge-crimson">INVALID HASH</span>
                    ) : (
                      <span className="badge-emerald">CHAIN VALID</span>
                    )}
                  </div>
                </div>

                {/* Hashes & Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-[#626875] text-[10px] uppercase block">Previous Block Hash</span>
                    <code className="text-[#8c93a4] truncate block">{node.prevHash}</code>
                  </div>
                  <div>
                    <span className="text-[#626875] text-[10px] uppercase block">SHA-256 Current Digest</span>
                    <code className={isNodeBroken ? 'text-red-400 font-bold block truncate' : 'text-[#10b981] block truncate'}>
                      {node.fullHash}
                    </code>
                  </div>
                </div>

                {/* Node Inspector Trigger */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setInspectedBlock(node)}
                    className="text-[11px] font-mono text-[#9ea3b0] hover:text-[#e5a93c] flex items-center gap-1"
                  >
                    <Terminal size={12} /> Inspect Payload JSON & Logs
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline Inspector Modal */}
      {inspectedBlock && (
        <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded-md font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[#e5a93c] font-bold border-b border-[#272b35] pb-1">
            <span>INSPECTING BLOCK #{inspectedBlock.index} — {inspectedBlock.artifact}</span>
            <button onClick={() => setInspectedBlock(null)} className="text-[#626875] hover:text-white">✕</button>
          </div>
          <pre className="text-[11px] text-[#9ea3b0] overflow-x-auto p-2 bg-[#090a0f] rounded border border-[#1c2029]">
{JSON.stringify({
  blockIndex: inspectedBlock.index,
  artifact: inspectedBlock.artifact,
  contributor: inspectedBlock.contributor,
  timestamp: inspectedBlock.timestamp,
  sha256Digest: inspectedBlock.fullHash,
  verification: inspectedBlock.status,
}, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
