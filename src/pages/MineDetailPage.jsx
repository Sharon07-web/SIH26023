import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Mountain,
  MapPin,
  Calendar,
  Layers,
  FileText,
  ShieldAlert,
  Sparkles,
  Map,
  ArrowLeft,
  Activity,
  TrendingUp,
  Download,
  AlertTriangle,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { MOCK_MINES } from '../data/mockMines';
import { MOCK_REPORTS } from '../data/mockReports';
import { MOCK_RISKS } from '../data/mockRisks';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import StatusIndicator from '../components/common/StatusIndicator';
import Tabs from '../components/common/Tabs';

export default function MineDetailPage() {
  const { mineId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const mine = MOCK_MINES.find((m) => m.id === mineId) || MOCK_MINES[0];
  const relatedReports = MOCK_REPORTS.filter((r) => r.mineId === mine.id);
  const relatedRisks = MOCK_RISKS.filter((rk) => rk.mineId === mine.id);

  const tabs = [
    { id: 'overview', label: 'Overview & Parameters', icon: Mountain },
    { id: 'geology', label: 'Geology & Boreholes', icon: Layers, count: mine.boreholesCount },
    { id: 'production', label: 'Production & Stripping', icon: TrendingUp },
    { id: 'reports', label: 'Archived Reports', icon: FileText, count: relatedReports.length },
    { id: 'risks', label: 'Risk Screenings', icon: ShieldAlert, count: relatedRisks.length }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/mines')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mines Registry</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/ai-query')}
          >
            Ask AI About This Mine
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Map}
            onClick={() => navigate('/coalfield-map')}
          >
            View on GIS Map
          </Button>
        </div>
      </div>

      {/* Master Entity Header Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-navy-900 text-white flex items-center justify-center shrink-0 shadow-md">
              <Mountain className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {mine.code}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {mine.subsidiary}
                </span>
                <StatusIndicator status={mine.status} pulse />
                <Badge
                  variant={mine.riskLevel === 'High' ? 'rose' : mine.riskLevel === 'Moderate' ? 'amber' : 'emerald'}
                  size="sm"
                  dot
                >
                  {mine.riskLevel} Risk
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {mine.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{mine.coalfield} Coalfield • {mine.district}, {mine.state}</span>
                <span>•</span>
                <span className="font-mono">Lat: {mine.coordinates[0].toFixed(4)}, Long: {mine.coordinates[1].toFixed(4)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end lg:self-auto pt-2 lg:pt-0">
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={() => alert(`Downloading Geological Profile dossier for ${mine.name}...`)}
            >
              Export Dossier (PDF)
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={FileText}
              onClick={() => navigate('/reports')}
            >
              Generate Mine Report
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 pt-1">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Key Parameters & Strata */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Core Operational &amp; Geological Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Mining Method</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{mine.type}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Primary Seams</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{mine.primarySeam}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Seam Thickness</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{mine.seamThicknessM}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Annual Output</span>
                  <span className="font-bold text-slate-900 mt-0.5 block font-mono">{mine.annualProductionMTPA} MTPA</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Stripping Ratio</span>
                  <span className="font-bold text-slate-900 mt-0.5 block font-mono">{mine.strippingRatio}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Gas Classification</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{mine.gasCategory}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Water Inflow Rate</span>
                  <span className="font-bold text-slate-900 mt-0.5 block font-mono">{mine.waterIngressM3Hr} m³/hr</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Factor of Safety (FoS)</span>
                  <span className="font-bold text-slate-900 mt-0.5 block font-mono">{mine.slopeStabilityFoS}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase">Commissioned</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{mine.startYear}</span>
                </div>
              </div>
            </div>

            {/* Description & Geological Context */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Geological Setting &amp; Hydrogeology
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {mine.description}
              </p>
              <div className="mt-4 p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>AI Stratigraphy Summary: </strong>
                  Barakar formation sandstones exhibit high compressive strength (42-56 MPa). Groundwater ingress primarily controlled by cross-cutting tectonic joint systems.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Map & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* GIS Location Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
              <h3 className="text-xs font-semibold text-slate-800 mb-3 flex items-center justify-between">
                <span>Geospatial Coordinates</span>
                <button
                  onClick={() => navigate('/coalfield-map')}
                  className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                >
                  Full Map &rarr;
                </button>
              </h3>
              <div className="h-44 rounded-lg bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-navy-900/60" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center mx-auto mb-2 text-white animate-pulse">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-xs font-bold text-white">{mine.name}</div>
                  <div className="text-[11px] font-mono text-cyan-300 mt-0.5">
                    {mine.coordinates[0].toFixed(4)}°N, {mine.coordinates[1].toFixed(4)}°E
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  icon={Map}
                  onClick={() => navigate('/coalfield-map')}
                >
                  Inspect in Coalfield GIS
                </Button>
              </div>
            </div>

            {/* Entity Actions */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
              <h3 className="text-xs font-semibold text-slate-800 mb-3 uppercase tracking-wider text-[11px]">
                Connected Intelligence Workflows
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/historical-archive')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs text-left transition-colors"
                >
                  <span className="font-semibold text-slate-800">Historical Comparison (2022-2026)</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => navigate('/risk-intelligence')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-xs text-left transition-colors"
                >
                  <span className="font-semibold text-rose-700">Screen Active Risks ({relatedRisks.length})</span>
                  <ChevronRight className="w-4 h-4 text-rose-400" />
                </button>
                <button
                  onClick={() => navigate('/ai-query')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-blue-50 text-xs text-left transition-colors"
                >
                  <span className="font-semibold text-blue-700">RAG Geological Q&amp;A</span>
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Geology & Boreholes Tab */}
      {activeTab === 'geology' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Drill Boreholes &amp; Lithological Logs
              </h3>
              <p className="text-xs text-slate-500">
                {mine.boreholesCount} validated exploratory boreholes indexed in CMPDI registry
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={() => alert('Exporting LAS / CSV borehole lithologs...')}
            >
              Export Lithologs (CSV)
            </Button>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Borehole ID</th>
                  <th className="p-3">Easting / Northing</th>
                  <th className="p-3">Total Depth (m)</th>
                  <th className="p-3">Intersected Seams</th>
                  <th className="p-3">Core Recovery %</th>
                  <th className="p-3">RQD Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr>
                  <td className="p-3 font-bold text-blue-600">BH-RAJ-84</td>
                  <td className="p-3 font-sans">85.718°E, 23.635°N</td>
                  <td className="p-3 font-bold">142.5m</td>
                  <td className="p-3 font-sans">Kargali Top (11.2m), Bermo (6.4m)</td>
                  <td className="p-3 text-emerald-600 font-bold">94.5%</td>
                  <td className="p-3 text-slate-800 font-sans">Good (78%)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-600">BH-RAJ-85</td>
                  <td className="p-3 font-sans">85.722°E, 23.638°N</td>
                  <td className="p-3 font-bold">188.0m</td>
                  <td className="p-3 font-sans">Kargali Lower (14.1m)</td>
                  <td className="p-3 text-emerald-600 font-bold">96.0%</td>
                  <td className="p-3 text-slate-800 font-sans">Excellent (84%)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-600">BH-RAJ-86</td>
                  <td className="p-3 font-sans">85.712°E, 23.631°N</td>
                  <td className="p-3 font-bold">115.2m</td>
                  <td className="p-3 font-sans">Karo Seams (8.8m)</td>
                  <td className="p-3 text-amber-600 font-bold">89.2%</td>
                  <td className="p-3 text-slate-800 font-sans">Fair (64%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Production Tab */}
      {activeTab === 'production' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Historical &amp; Current Production Run Rate
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">FY 2025-26 Output</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
                {mine.annualProductionMTPA} MTPA
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">+6.4% YoY</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Overburden Excavation</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
                {mine.overburdenRemovalMm3} Mm³
              </span>
              <span className="text-[11px] text-slate-500">Stripping Ratio: {mine.strippingRatio}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Dispatch Realization</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
                98.2%
              </span>
              <span className="text-[11px] text-slate-500">Direct Merry-Go-Round &amp; Rail</span>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Certified Statutory &amp; Geological Reports for {mine.name}
          </h3>
          {relatedReports.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {relatedReports.map((rep) => (
                <div key={rep.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-900">{rep.title}</div>
                    <div className="text-[11px] text-slate-500">
                      {rep.reportNumber} • {rep.period} • {rep.pagesCount} Pages ({rep.fileFormat})
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/reports')}>
                    View Report
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">No reports directly tagged with this mine code.</p>
          )}
        </div>
      )}

      {/* Risks Tab */}
      {activeTab === 'risks' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Active Risk Screenings &amp; Surveillance
          </h3>
          {relatedRisks.length > 0 ? (
            <div className="space-y-3">
              {relatedRisks.map((rk) => (
                <div key={rk.id} className="p-4 rounded-lg border border-rose-200 bg-rose-50/40">
                  <div className="flex items-center justify-between">
                    <Badge variant="rose" size="sm" dot>
                      {rk.severity} Severity
                    </Badge>
                    <span className="text-[11px] text-slate-500">{rk.detectedDate}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-2">{rk.indicator}</h4>
                  <p className="text-xs text-slate-600 mt-1">{rk.reason}</p>
                  <div className="mt-2 text-[11px] text-slate-500">
                    <strong>Recommended Action: </strong>
                    {rk.recommendedAction}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero critical risk screenings currently flagged for this project.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
