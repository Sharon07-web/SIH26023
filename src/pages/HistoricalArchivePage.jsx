import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Calendar,
  Mountain,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MOCK_MINES } from '../data/mockMines';
import { MOCK_REPORTS } from '../data/mockReports';
import { MOCK_HISTORICAL_COMPARISON } from '../data/mockAIQueries';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function HistoricalArchivePage() {
  const navigate = useNavigate();
  const [selectedMineId, setSelectedMineId] = useState('mine-001');
  const [startYear, setStartYear] = useState(2022);
  const [endYear, setEndYear] = useState(2026);
  const [comparisonActive, setComparisonActive] = useState(true);

  const selectedMine = MOCK_MINES.find((m) => m.id === selectedMineId) || MOCK_MINES[0];

  const timelineYears = [2022, 2023, 2024, 2025, 2026];

  const timelineEvents = [
    {
      year: 2026,
      date: 'Feb 2026',
      title: 'CMPDI-RI-2025-GEO-048 Reserve Re-calibration',
      type: 'Geological Reserve Assessment',
      summary: 'Net addition of 4.2 MT extractable coking coal in Kargali Lower Seam. Stripping ratio recalculated at 1:4.8.',
      doc: 'CMPDI-RI-2025-GEO-048.pdf',
      status: 'Approved'
    },
    {
      year: 2025,
      date: 'Nov 2025',
      title: 'Hydrogeological Ingress Audit & Water Table Study',
      type: 'Environmental / Aquifer Study',
      summary: 'Water table inflow increased by 29.2% due to Damodar river fault terrace fracture opening.',
      doc: 'CCL_RAJ_Hydro_2025.pdf',
      status: 'Published'
    },
    {
      year: 2024,
      date: 'Aug 2024',
      title: 'Geotechnical Highwall Stability Radar Survey',
      type: 'Strata Stability Evaluation',
      summary: 'Factor of Safety (FoS) logged at 1.38; minor tension cracking noted on Bench 4 crest.',
      doc: 'CCL_RAJ_Highwall_2024.pdf',
      status: 'Approved'
    },
    {
      year: 2023,
      date: 'May 2023',
      title: 'Phase II Open Cast Expansion Feasibility Study',
      type: 'Feasibility Report',
      summary: 'Commissioned 24 new infill diamond cored boreholes across Southern fault strike line.',
      doc: 'CMPDI_RAJ_Exp_Feasibility_2023.pdf',
      status: 'Approved'
    },
    {
      year: 2022,
      date: 'Jan 2022',
      title: 'Baseline Stratigraphy & Stripping Ratio Filing',
      type: 'Statutory Annual Report',
      summary: 'Annual production stood at 2.8 MTPA with composite stripping ratio 1:3.9.',
      doc: 'CCL_RAJ_Annual_2022.pdf',
      status: 'Approved'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              CHRONOLOGICAL INTELLIGENCE &amp; AUDIT
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Multi-Year Geological Delta Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Historical Archive &amp; Comparative Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track multi-year stratigraphic evolution, stripping ratio migrations, water table changes, and statutory compliance history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/ai-query')}
          >
            Ask AI to Compare Years
          </Button>
        </div>
      </div>

      {/* 3-Column Layout: Filters (Left), Timeline (Center), Comparison Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Archive Filters */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Archive Parameters
              </h3>
            </div>

            {/* Select Mine */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Target Colliery / Mine
              </label>
              <select
                value={selectedMineId}
                onChange={(e) => setSelectedMineId(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 font-medium"
              >
                {MOCK_MINES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.subsidiaryShort})
                  </option>
                ))}
              </select>
            </div>

            {/* Comparison Year Selectors */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                Comparative Horizon
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Base Year</span>
                  <select
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                  >
                    {timelineYears.map((yr) => (
                      <option key={yr} value={yr} disabled={yr >= endYear}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Compare Year</span>
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                  >
                    {timelineYears.map((yr) => (
                      <option key={yr} value={yr} disabled={yr <= startYear}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => setComparisonActive(true)}
            >
              Recompute Multi-Year Delta
            </Button>
          </div>
        </div>

        {/* Center Column: Chronological Report Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Chronological Timeline ({timelineEvents.length} Events)
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">2022 &rarr; 2026</span>
            </div>

            {/* Timeline Stream */}
            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 transition-transform" />

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold text-blue-600">
                        {evt.date}
                      </span>
                      <Badge variant="emerald" size="sm">
                        {evt.status}
                      </Badge>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {evt.summary}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span>{evt.doc}</span>
                      </span>
                      <button
                        onClick={() => navigate('/reports')}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Inspect &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Analysis Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
            <div className="pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Comparative Delta
                </h3>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {startYear} vs {endYear} ({selectedMine.name})
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                AUDITED
              </span>
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-3">
              {MOCK_HISTORICAL_COMPARISON.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800">{m.metric}</span>
                    <span
                      className={`font-mono font-bold text-[11px] ${
                        m.status === 'positive'
                          ? 'text-emerald-600'
                          : m.status === 'negative'
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {m.delta}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-1.5 py-1 px-2 bg-white rounded border border-slate-100 font-mono text-[11px]">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{startYear}</span>
                      <span className="font-bold text-slate-700">{m.y2022}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">{endYear}</span>
                      <span className="font-bold text-slate-900">{m.y2026}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-snug mt-1">
                    {m.analysis}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={Sparkles}
                onClick={() => navigate('/ai-query')}
              >
                Generate Geological Narrative with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
