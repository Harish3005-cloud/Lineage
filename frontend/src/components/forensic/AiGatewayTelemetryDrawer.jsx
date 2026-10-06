import React, { useState } from 'react';
import { Terminal, Shield, Lock, Bot, UserCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AiGatewayTelemetryDrawer() {
  const [open, setOpen] = useState(true);

  const telemetryData = {
    gatewayId: 'GW-LINEAGE-V1.0',
    modelEngine: 'Gemini 3.1 Flash-Lite (Google DeepMind)',
    humanOperator: 'Arjun Sharma',
    humanRole: 'STUDENT (Age 17)',
    projectSnapshot: 'v19.4',
    promptTokenCount: 382,
    responseTokenCount: 640,
    scrubbedSecretsCount: 2,
    redactedFields: ['BIOHEALTH_PRIVATE_API_KEY', 'DATABASE_PASSWORD'],
    aiAction: 'Generated MobileNet INT8 calibration loop helper function',
    humanSignature: 'SIG-ARJUN-2026-10-05-91AF',
    humanReviewStatus: 'REVIEWED & SIGNED BY OPERATOR',
  };

  return (
    <div className="terminal-surface p-4 space-y-3 font-mono text-xs">
      
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer border-b border-[#272b35] pb-2 text-[#e6e8ec]"
      >
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-[#3b82f6]" />
          <span className="font-bold uppercase tracking-wider text-xs">
            Project AI Gateway Telemetry Drawer
          </span>
          <span className="badge-slate font-mono">Gateway Active</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-emerald font-mono">REDACTION ACTIVE</span>
          <span className="text-[#626875] text-[11px]">{open ? '▲ Collapse' : '▼ Expand Telemetry'}</span>
        </div>
      </div>

      {/* Telemetry Details */}
      {open && (
        <div className="space-y-3 pt-1">
          {/* Top Audit Status Bar */}
          <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded-md space-y-2">
            <div className="flex flex-wrap items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <Bot size={14} className="text-[#3b82f6]" />
                <span className="text-[#e6e8ec] font-bold">Model Engine: {telemetryData.modelEngine}</span>
              </div>
              <div className="flex items-center gap-2 text-[#10b981] font-bold">
                <UserCheck size={14} />
                <span>Signed by Operator: {telemetryData.humanOperator} ({telemetryData.humanRole})</span>
              </div>
            </div>

            <div className="p-2 bg-[#090a0f] border border-[#1c2029] rounded text-[10px] text-[#9ea3b0]">
              <strong className="text-white">Attribution Guarantee:</strong> External AI receives zero financial credit or authorship claims. All contribution credits flow exclusively to human operator <strong className="text-[#10b981]">{telemetryData.humanOperator}</strong>.
            </div>
          </div>

          {/* Grid of Monospace Telemetry Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2.5 bg-[#090a0f] border border-[#272b35] rounded space-y-1">
              <span className="text-[#626875] text-[10px] uppercase block">Gateway Session ID</span>
              <code className="text-[#e5a93c] font-bold">{telemetryData.gatewayId}</code>
            </div>

            <div className="p-2.5 bg-[#090a0f] border border-[#272b35] rounded space-y-1">
              <span className="text-[#626875] text-[10px] uppercase block">Context Snapshot</span>
              <code className="text-white font-bold">{telemetryData.projectSnapshot}</code>
            </div>

            <div className="p-2.5 bg-[#090a0f] border border-[#272b35] rounded space-y-1">
              <span className="text-[#626875] text-[10px] uppercase block">Token Footprint</span>
              <code className="text-[#8c93a4]">{telemetryData.promptTokenCount} in / {telemetryData.responseTokenCount} out</code>
            </div>

            <div className="p-2.5 bg-[#090a0f] border border-red-900/40 rounded space-y-1">
              <span className="text-[#626875] text-[10px] uppercase block">Secrets Redacted</span>
              <code className="text-red-400 font-bold">{telemetryData.scrubbedSecretsCount} Keys Masked</code>
            </div>
          </div>

          {/* Redacted Keys Panel */}
          <div className="p-2.5 bg-[#090a0f] border border-[#272b35] rounded text-[11px] space-y-1">
            <span className="text-[#626875] text-[10px] uppercase font-bold block flex items-center gap-1">
              <Lock size={12} className="text-amber-400" /> Masked Confidential Tokens:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {telemetryData.redactedFields.map((field, idx) => (
                <span key={idx} className="badge-crimson font-mono text-[10px]">
                  [REDACTED: {field}]
                </span>
              ))}
            </div>
          </div>

          {/* Human Signature */}
          <div className="flex items-center justify-between text-[11px] text-[#626875] pt-1">
            <span>Operator Signature Hash: <code className="text-[#10b981]">{telemetryData.humanSignature}</code></span>
            <span className="text-[#10b981] font-bold">✓ {telemetryData.humanReviewStatus}</span>
          </div>
        </div>
      )}

    </div>
  );
}
