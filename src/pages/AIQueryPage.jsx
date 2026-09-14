import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  ArrowRight,
  Clock,
  ShieldCheck,
  Send,
  Info
} from 'lucide-react';
import { MOCK_AI_QUERIES } from '../data/mockAIQueries';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export default function AIQueryPage() {
  const navigate = useNavigate();
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState(null);

  const currentQueryData = MOCK_AI_QUERIES[activeQueryIndex] || MOCK_AI_QUERIES[0];

  const handleRunQuery = (customPrompt) => {
    const q = customPrompt || inputQuery;
    if (!q) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // If query matches one of our presets, select it
      const matchIdx = MOCK_AI_QUERIES.findIndex((item) =>
        q.toLowerCase().includes(item.category.toLowerCase().split(' ')[0])
      );
      if (matchIdx !== -1) {
        setActiveQueryIndex(matchIdx);
      } else {
        setActiveQueryIndex(0);
      }
    }, 600);
  };

  const presetQueries = [
    "What changes are visible in Moonidih deep seam water table and sandstone permeability between 2022 and 2026?",
    "Summarize geotechnical highwall slope stability warnings across Gevra and Dipka opencast mines.",
    "Are there unmapped fault displacements or missing borehole records in Rajrappa expansion sector?"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-mono tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                EVIDENCE-GROUNDED RAG KNOWLEDGE SYSTEM
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">pgvector &amp; Certified CMPDI Corpus</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              AI Geological &amp; Strata Query Engine
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Industrial natural language search grounded strictly in statutory filings, core lithologs, and certified exploration reports. Zero speculation.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Hallucination Guard: Active</span>
          </div>
        </div>
      </div>

      {/* Query Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card space-y-3">
        <div className="relative">
          <textarea
            rows={2}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a technical question (e.g., 'What changes are visible in Moonidih deep seam water table between 2022 and 2026?')..."
            className="w-full p-3.5 pr-28 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-none transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 bottom-3">
            <Button
              variant="primary"
              size="sm"
              icon={isGenerating ? undefined : Send}
              loading={isGenerating}
              onClick={() => handleRunQuery()}
            >
              {isGenerating ? 'Synthesizing...' : 'Run Query'}
            </Button>
          </div>
        </div>

        {/* Suggested Queries Chips */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Preset Geological Queries (Ground Truth Verified):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {presetQueries.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputQuery(preset);
                  handleRunQuery(preset);
                }}
                className="text-left text-xs bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-lg transition-all line-clamp-1 max-w-xl"
              >
                &ldquo;{preset}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2-Column Answer & Evidence Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main AI Response & Findings */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-5">
            {/* Header / Confidence Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Evidence-Grounded Technical Synthesis
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Derived from {currentQueryData.sources.length} certified CMPDI exploration sources
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="emerald" size="sm" dot>
                  Confidence: {currentQueryData.confidenceScore}
                </Badge>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentQueryData.timestamp}
                </span>
              </div>
            </div>

            {/* AI Response Text */}
            <div className="text-xs text-slate-700 leading-relaxed space-y-2 whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100 font-sans">
              {currentQueryData.answer}
            </div>

            {/* Key Findings Callout */}
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Key Strata &amp; Operational Takeaways</span>
              </div>
              <ul className="space-y-1.5 pl-5 list-disc text-xs text-blue-950 font-medium">
                {currentQueryData.keyFindings.map((finding, idx) => (
                  <li key={idx} className="leading-snug">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decision Support & Risk Guidance */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Statutory Advisory: </strong>
                All AI retrievals must be corroborated by a certified CMPDI Mining Geologist prior to statutory submission under Coal Mines Regulations (CMR) 2017.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Citations & Evidence Drawer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col h-full">
            <div className="pb-3 border-b border-slate-100 mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Primary Source Citations
                </h3>
                <p className="text-[11px] text-slate-500">
                  Click any document snippet to inspect page
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentQueryData.sources.length} verified
              </span>
            </div>

            {/* Citations List */}
            <div className="space-y-3 overflow-y-auto max-h-[480px]">
              {currentQueryData.sources.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCitation(src)}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-blue-600 truncate">
                      {src.documentName}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      {src.page}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-800 leading-snug">
                    {src.section}
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-3 bg-white p-2 rounded border border-slate-100 font-mono text-[10px] leading-relaxed">
                    &ldquo;{src.snippet}&rdquo;
                  </p>

                  <div className="mt-2 text-right">
                    <span className="text-[11px] text-blue-600 font-medium group-hover:underline inline-flex items-center gap-0.5">
                      Open in Document Viewer <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cross-link Actions */}
            <div className="mt-auto pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={FileText}
                onClick={() => navigate('/reports')}
              >
                Compile into Certified Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Citation Evidence Modal */}
      <Modal
        isOpen={Boolean(selectedCitation)}
        onClose={() => setSelectedCitation(null)}
        title={selectedCitation ? `Source Document: ${selectedCitation.documentName}` : ''}
        subtitle="CMPDI Ground Truth Verification Audit"
        footer={
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-slate-500">Hash: SHA-256 Verified Certified Filing</span>
            <Button variant="primary" size="sm" onClick={() => setSelectedCitation(null)}>
              Done
            </Button>
          </div>
        }
      >
        {selectedCitation && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase">Title</span>
              <span className="font-bold text-slate-900">{selectedCitation.documentTitle}</span>
              <div className="flex gap-4 mt-2 text-slate-600">
                <span>Location: <strong>{selectedCitation.page}</strong></span>
                <span>Section: <strong>{selectedCitation.section}</strong></span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block mb-1">
                Extracted Evidence Paragraph:
              </span>
              <blockquote className="p-3 bg-blue-50 border-l-4 border-blue-600 rounded text-slate-800 font-mono text-[11px] leading-relaxed">
                {selectedCitation.snippet}
              </blockquote>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Verified against CMPDI Regional Institute digitized archive index.
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
