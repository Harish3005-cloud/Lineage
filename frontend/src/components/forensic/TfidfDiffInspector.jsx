import React, { useState } from 'react';
import { ShieldAlert, GitCompare, Code, Copy, Check, Terminal, FileCode } from 'lucide-react';

export default function TfidfDiffInspector({ artifactName = 'mobilenet_int8_quant.py', similarityScore = 87.4 }) {
  const [viewMode, setViewMode] = useState('diff'); // diff | side-by-side | similarity
  const [copied, setCopied] = useState(false);

  const inboundSubmission = `import tensorflow as tf
import numpy as np

def representative_dataset_gen():
    """
    AI-assisted calibration loop (Gemini 3.1 Flash-Lite)
    Human Owner: Arjun Sharma (STUDENT)
    """
    for input_value in tf.data.Dataset.from_tensor_slices(dataset_path).take(100):
        yield [tf.cast(input_value, tf.float32)]

def quantize_mobilenet_int8(model_path):
    converter = tf.lite.TFLiteConverter.from_saved_model(model_path)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.representative_dataset = representative_dataset_gen
    converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
    return converter.convert()`;

  const indexedReference = `# Reference Repository: github.com/tensorflow/models/research/slim/nets/mobilenet
def representative_dataset_gen():
    for input_value in tf.data.Dataset.from_tensor_slices(dataset_path).take(100):
        yield [tf.cast(input_value, tf.float32)]

def quantize_mobilenet_int8(model_path):
    converter = tf.lite.TFLiteConverter.from_saved_model(model_path)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.representative_dataset = representative_dataset_gen
    return converter.convert()`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inboundSubmission);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-surface p-4 space-y-4 font-mono text-xs">
      
      {/* Clinical Telemetry Bar */}
      <div className="p-3 bg-[#0d0f14] border border-[#272b35] rounded-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <ShieldAlert size={16} />
            <span>TF-IDF TELEMETRY:</span>
          </div>
          <span className="text-white font-bold text-sm">Similarity Score: {similarityScore}%</span>
          <span className="badge-amber">POTENTIAL OVERLAP DETECTED</span>
        </div>

        <div className="text-[11px] text-[#9ea3b0]">
          Status: <strong className="text-amber-300">Expert Human Review Required</strong> (Dr. Meera Raman)
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#272b35] pb-2">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-[#3b82f6]" />
          <span className="text-[#e6e8ec] font-bold">{artifactName}</span>
          <span className="text-[#626875]">|</span>
          <span className="text-[#8c93a4]">SHA-256: 8a23d91b...</span>
        </div>

        <div className="flex items-center gap-1 bg-[#090a0f] p-1 rounded border border-[#272b35]">
          <button
            onClick={() => setViewMode('diff')}
            className={`px-2.5 py-1 text-[11px] rounded transition-all font-semibold ${
              viewMode === 'diff' ? 'bg-[#181b22] text-white border border-[#373c4a]' : 'text-[#626875] hover:text-[#9ea3b0]'
            }`}
          >
            Side-by-Side Diff
          </button>
          <button
            onClick={() => setViewMode('similarity')}
            className={`px-2.5 py-1 text-[11px] rounded transition-all font-semibold ${
              viewMode === 'similarity' ? 'bg-amber-950/60 text-amber-300 border border-amber-600/40' : 'text-[#626875] hover:text-[#9ea3b0]'
            }`}
          >
            TF-IDF Highlights
          </button>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 text-[11px] rounded bg-[#181b22] text-[#9ea3b0] hover:text-white border border-[#272b35]"
          >
            {copied ? 'Copied' : 'Copy Inbound'}
          </button>
        </div>
      </div>

      {/* Terminal Code Inspector Area */}
      {viewMode === 'diff' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
          <div className="p-3 bg-[#090a0f] border border-[#272b35] rounded space-y-2">
            <div className="flex items-center justify-between text-[#10b981] font-bold border-b border-[#1c2029] pb-1">
              <span>INBOUND SUBMISSION (Arjun Sharma)</span>
              <span>C-1002</span>
            </div>
            <pre className="text-[#e6e8ec] whitespace-pre-wrap leading-relaxed">{inboundSubmission}</pre>
          </div>

          <div className="p-3 bg-[#090a0f] border border-[#272b35] rounded space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold border-b border-[#1c2029] pb-1">
              <span>INDEXED REPOSITORY REFERENCE</span>
              <span>github.com/tensorflow/models</span>
            </div>
            <pre className="text-amber-200/90 whitespace-pre-wrap leading-relaxed">{indexedReference}</pre>
          </div>
        </div>
      )}

      {viewMode === 'similarity' && (
        <div className="p-3 bg-[#090a0f] border border-[#272b35] rounded space-y-2 text-[11px]">
          <div className="text-amber-300 font-bold border-b border-[#1c2029] pb-1">
            TF-IDF TOKEN ANALYSIS (N-gram similarity 3-5 tokens)
          </div>
          <p className="text-[#8c93a4]">
            Matching lines represent standard TensorFlow Lite MobileNet calibration loop boilerplates. Human expert decision recommended: <strong className="text-[#10b981]">ACCEPT (Standard Framework Code)</strong>.
          </p>
        </div>
      )}

      <div className="text-[10px] text-[#626875] flex items-center justify-between pt-1">
        <span>Scikit-learn TF-IDF Engine v1.4 • Cosine Metric Distance: 0.126</span>
        <span>Explicit Human Verification Authority: DR. MEERA RAMAN</span>
      </div>

    </div>
  );
}
