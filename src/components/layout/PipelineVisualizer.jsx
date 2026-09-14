import React, { useState } from 'react';
import {
  FileUp,
  Filter,
  CheckCircle2,
  Database,
  Search,
  Sparkles,
  FileText,
  ShieldAlert,
  ChevronRight,
  Info
} from 'lucide-react';

export default function PipelineVisualizer() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'intake',
      label: 'Raw Intake',
      subtitle: 'PDF, DOCX, Core Scans',
      icon: FileUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      details: 'Ingests multi-source exploration reports, scanned borehole drill logs, daily extraction spreadsheets, and statutory safety filings across all 8 CIL subsidiaries.'
    },
    {
      id: 'cleaning',
      label: 'Cleaning & OCR',
      subtitle: 'Table & OCR Cleanup',
      icon: Filter,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      details: 'Performs layout-aware optical character recognition, tabular parsing, lithology code normalization, and eliminates scan distortions or noise.'
    },
    {
      id: 'validation',
      label: 'Validation',
      subtitle: 'CMPDI Geology Rules',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      details: 'Automated statutory checks: verifies seam thickness continuity, lithological strata consistency, stripping ratio bounds, and flags contradictory records.'
    },
    {
      id: 'structured',
      label: 'Structured DB',
      subtitle: 'Postgres & Spatial GIS',
      icon: Database,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      details: 'Relational storage in PostgreSQL with PostGIS coordinates for boreholes, mine boundaries, leasehold lines, and coal seam depth horizons.'
    },
    {
      id: 'knowledge',
      label: 'Semantic Index',
      subtitle: 'pgvector Embeddings',
      icon: Search,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      details: 'Generates chunked semantic vector embeddings for fast geological concept retrieval, strata similarity matching, and historical report indexing.'
    },
    {
      id: 'rag',
      label: 'AI Query (RAG)',
      subtitle: 'Grounded Geological AI',
      icon: Sparkles,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      details: 'Evidence-backed natural language query engine that retrieves citations directly from certified exploration reports, avoiding hallucinations.'
    },
    {
      id: 'reports',
      label: 'Report Studio',
      subtitle: 'Human-in-Loop Review',
      icon: FileText,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      details: 'Automates statutory compliance drafts, reserve re-estimations, and environmental surveys with mandatory Chief Geologist review & digital signing.'
    },
    {
      id: 'risk',
      label: 'Risk Screening',
      subtitle: 'Decision Support',
      icon: ShieldAlert,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      details: 'Screens for water ingress anomalies, highwall dump creep, gas ventilation discrepancies, and data gaps to empower executive mining decisions.'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            End-to-End Geological Data Intelligence Pipeline
          </h3>
        </div>
        <span className="text-[11px] text-slate-500">
          Click any phase to inspect data transformations
        </span>
      </div>

      {/* Horizontal Pipeline Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === idx;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`relative flex flex-col items-center text-center p-2.5 rounded-lg border transition-all text-left group ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                  stage.bg
                } ${stage.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-semibold text-slate-800 leading-tight">
                {stage.label}
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5 truncate w-full">
                {stage.subtitle}
              </div>
              {idx < stages.length - 1 && (
                <ChevronRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none z-10" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detail Drawer for Selected Phase */}
      <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-semibold text-slate-900 mr-1.5">
            Phase {activeStage + 1}: {stages[activeStage].label}
          </span>
          <span className="text-slate-600">{stages[activeStage].details}</span>
        </div>
      </div>
    </div>
  );
}
