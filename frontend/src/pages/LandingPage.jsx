import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Lock, 
  FileText, 
  Users, 
  AlertTriangle, 
  Sparkles,
  GitCommit,
  Coins,
  Shield,
  Clock,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─────────────────────────────────────────────────────────────
   ANIMATED NEURAL MESH CANVAS COMPONENT
   Floating nodes: Students, Domain Experts, Sponsors, AI Agents
   Electrical data pulses traveling along connection vectors
   ───────────────────────────────────────────────────────────── */
const NeuralMeshCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Node definitions with positions & labels
    const nodeLabels = [
      { name: 'Sponsors', type: 'sponsor', color: '#3b82f6' },
      { name: 'Domain Experts', type: 'expert', color: '#10b981' },
      { name: 'Students', type: 'student', color: '#06b6d4' },
      { name: 'AI Agents', type: 'agent', color: '#8b5cf6' },
      { name: 'SHA-256 Ledger', type: 'ledger', color: '#f59e0b' },
      { name: 'Escrow Vault', type: 'escrow', color: '#10b981' },
    ];

    const nodes = nodeLabels.map((lbl, i) => {
      const angle = (i / nodeLabels.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.32;
      return {
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        label: lbl.name,
        color: lbl.color,
        radius: 6,
      };
    });

    // Create edge connections between nodes
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        connections.push({
          from: nodes[i],
          to: nodes[j],
          pulses: [
            { progress: Math.random(), speed: 0.003 + Math.random() * 0.004, size: 3 },
            { progress: Math.random(), speed: 0.002 + Math.random() * 0.003, size: 2.5 },
          ],
        });
      }
    }

    // Render animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update node positions gently
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > height - 50) node.vy *= -1;
      });

      // Draw connection lines
      connections.forEach((conn) => {
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)'; // Soft slate connection line
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw electrical signal pulses along the line
        conn.pulses.forEach((pulse) => {
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) pulse.progress = 0;

          const px = conn.from.x + (conn.to.x - conn.from.x) * pulse.progress;
          const py = conn.from.y + (conn.to.y - conn.from.y) * pulse.progress;

          // Pulse glow gradient
          const grad = ctx.createRadialGradient(px, py, 0, px, py, pulse.size * 3);
          grad.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
          grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.6)');
          grad.addColorStop(1, 'rgba(59, 130, 246, 0)');

          ctx.beginPath();
          ctx.arc(px, py, pulse.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
          ctx.fillStyle = '#2563eb';
          ctx.fill();
        });
      });

      // Draw nodes & labels
      nodes.forEach((node) => {
        // Node outer halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}15`;
        ctx.fill();

        // Node center core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node label pill box
        ctx.font = '500 11px Inter, sans-serif';
        const textWidth = ctx.measureText(node.label).width;
        const padX = 8;
        const padY = 4;
        const rectX = node.x - textWidth / 2 - padX;
        const rectY = node.y + 12;

        // Label background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(rectX, rectY, textWidth + padX * 2, 20, 6);
        ctx.fill();
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label text
        ctx.fillStyle = '#0f172a';
        ctx.fillText(node.label, node.x - textWidth / 2, rectY + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN LIGHT ANTIGRAVITY LANDING PAGE COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 font-sans relative selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* Background Animated Neural Mesh */}
      <NeuralMeshCanvas />

      {/* Top Tagline Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 text-center font-mono border-b border-slate-800 relative z-20 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span>"Every contribution has a lineage. Every reward has evidence."</span>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="hidden sm:inline text-emerald-400 font-semibold">Evidence-First Provenance Engine</span>
      </div>

      {/* Top Glassmorphic Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-all">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-slate-900">
                  LINEAGE
                </span>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight hidden sm:inline">
                  Collaborative Research Ecosystem
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <a href="#provenance" className="hover:text-blue-600 transition-colors">Provenance DAG</a>
              <a href="#matrix" className="hover:text-blue-600 transition-colors">Survival Matrix</a>
              <a href="#gateway" className="hover:text-blue-600 transition-colors">AI Gateway</a>
              <a href="#escrow" className="hover:text-blue-600 transition-colors">Escrow</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggle}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Toggle Theme Mode"
              >
                {dark ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-all flex items-center gap-1.5"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>CRYPTOGRAPHIC PROVENANCE PLATFORM</span>
            </div>

            {/* Massive Confident Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              The Trusted Collaborative <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">Research Ecosystem</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              A cryptographic provenance platform that proves who actually contributed to the final work, backed by Evidence-First Attribution and Simulated Escrow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/ledger')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold backdrop-blur-xl bg-white/80 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <span>Explore Provenance Ledger</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Micro Feature Bullet Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-600 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>SHA-256 Hash DAG</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>TF-IDF 87% Review Flag</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Simulated Escrow</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Overlapping 3D Spatial Floating Glassmorphic Cards */}
          <div className="lg:col-span-5 relative min-h-[460px] flex items-center justify-center">
            
            {/* Card 1: Trust & Integrity Provenance (SHA-256 Ledger Flow) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 5, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 4, rotateY: -6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6, rotateX: 0, rotateY: 0 }}
              className="absolute top-0 right-4 w-full max-w-sm backdrop-blur-xl bg-white/80 p-5 rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-300/40 text-xs font-mono space-y-3 z-30"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <GitCommit className="w-4 h-4 text-blue-600" />
                  <span>SHA-256 Provenance Flow</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  CHAIN VALID
                </span>
              </div>

              {/* Hash Node Tree Flow */}
              <div className="space-y-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Block #101 (Preprocessing)</span>
                  <code className="text-blue-600 font-bold">91af73e4...</code>
                </div>
                <div className="text-center text-slate-400">↓</div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Block #102 (Quantization)</span>
                  <code className="text-blue-600 font-bold">8a23d91b...</code>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Credit by Survival Matrix Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -5, rotateY: 8 }}
              animate={{ opacity: 1, y: 40, rotateX: -4, rotateY: 6 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ y: 30, rotateX: 0, rotateY: 0 }}
              className="absolute top-28 left-0 w-full max-w-sm backdrop-blur-xl bg-white/90 p-5 rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-300/50 text-xs space-y-3 z-20"
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="font-bold text-slate-900 font-mono text-[11px] uppercase">
                  Credit by Survival Leaderboard
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold font-mono">
                  ₹1,00,000 Escrow
                </span>
              </div>

              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                      AS
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Arjun Sharma</span>
                      <span className="text-[10px] text-slate-400">Student (Age 17)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ✓ Verified 94.9%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      OC
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">O. Chen</span>
                      <span className="text-[10px] text-slate-400">Domain Expert</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ✓ Verified 96.1%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Intersecting Expert Review Alert Toast */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 120 }}
              animate={{ opacity: 1, x: 0, y: 180 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="absolute top-44 right-2 w-full max-w-xs backdrop-blur-2xl bg-amber-500/10 border border-amber-500/40 p-3.5 rounded-xl shadow-xl shadow-amber-900/10 text-xs space-y-1.5 z-40"
            >
              <div className="flex items-center justify-between text-amber-800 font-bold">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Expert Human Review Required
                </span>
                <span className="text-[10px] font-mono text-amber-700">87.4% Match</span>
              </div>
              <p className="text-[11px] text-slate-700 font-mono leading-tight">
                TF-IDF similarity flag detected on <code className="text-amber-900 font-bold">mobilenet_int8_quant.py</code>. Assigned to Dr. Meera Raman.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Feature Pillar Grid Section */}
      <section id="provenance" className="py-20 backdrop-blur-xl bg-white/60 border-t border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
              PLATFORM PROVENANCE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Complete Research Attribution
            </h2>
            <p className="text-slate-600 text-sm">
              Answers the fundamental question: <em>"Who actually contributed to the final work, and can we prove it?"</em>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-4 hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                <GitCommit className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">SHA-256 Audit Ledger</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                Cryptographically hash-chained contribution DAG. Past modifications break downstream hashes, alerting sponsors and admins to unauthorized changes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-4 hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">TF-IDF Similarity Signal</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                Automated similarity vectorizer detects overlapping submissions and flags them for mandatory Expert Human Review instead of automatic rejection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-4 hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Auditable AI Gateway</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                External AI models (Gemini / Nemotron) operate behind an auditable gateway with redacted keys. Credit remains strictly with human operators.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200/80 text-center text-xs text-slate-500 font-mono relative z-10 bg-white">
        <p>LINEAGE Collaborative Research Ecosystem © 2026 — Evidence-First Provenance</p>
      </footer>

    </div>
  );
}
