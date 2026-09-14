import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  MapPin,
  Sparkles
} from 'lucide-react';
import { MOCK_RISKS } from '../data/mockRisks';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Tabs from '../components/common/Tabs';
import Modal from '../components/common/Modal';
import KPICard from '../components/dashboard/KPICard';

export default function RiskIntelligencePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('indicators');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const highRisks = MOCK_RISKS.filter((r) => r.severity === 'High');
  const mediumRisks = MOCK_RISKS.filter((r) => r.severity === 'Medium');
  const lowRisks = MOCK_RISKS.filter((r) => r.severity === 'Low');

  const tabs = [
    { id: 'indicators', label: 'Active Risk Indicators', count: MOCK_RISKS.length },
    { id: 'trends', label: 'Geological & Strata Trends' },
    { id: 'methodology', label: 'Screening Methodology (Explainability)' }
  ];

  const filteredRisks = MOCK_RISKS.filter(
    (r) => filterSeverity === 'ALL' || r.severity === filterSeverity
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-mono tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                DECISION SUPPORT &amp; SURVEILLANCE
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                Explainable Risk Screening (Not Disaster Prediction)
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Geological &amp; Mining Risk Intelligence
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Deterministic, rule-backed anomaly detection identifying aquifer surges, highwall slope creep, methane spikes, and exploration data gaps.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              icon={Sparkles}
              onClick={() => navigate('/ai-query')}
            >
              Ask AI to Evaluate Risks
            </Button>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Screened Risks"
          value={MOCK_RISKS.length.toString()}
          trend="Continuous"
          timeframe="automated rule scans"
          icon={ShieldAlert}
          colorScheme="blue"
        />
        <KPICard
          title="High Severity Anomaly"
          value={highRisks.length.toString()}
          trend="Immediate"
          trendDirection="down"
          timeframe="action required"
          icon={AlertTriangle}
          colorScheme="rose"
        />
        <KPICard
          title="Medium Severity"
          value={mediumRisks.length.toString()}
          trend="Surveillance"
          timeframe="scheduled surveys"
          icon={Info}
          colorScheme="amber"
        />
        <KPICard
          title="Low Severity / Monitored"
          value={lowRisks.length.toString()}
          trend="Stable"
          trendDirection="up"
          timeframe="within statutory limits"
          icon={CheckCircle2}
          colorScheme="emerald"
        />
      </div>

      {/* Tabs & Severity Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Severity:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 font-medium"
          >
            <option value="ALL">All Severities</option>
            <option value="High">High Severity Only</option>
            <option value="Medium">Medium Severity Only</option>
            <option value="Low">Low Severity Only</option>
          </select>
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'indicators' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3">Risk Anomaly &amp; Category</th>
                  <th className="px-4 py-3">Mine / Coalfield</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Ground Truth Evidence</th>
                  <th className="px-4 py-3">Detected Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRisks.map((risk) => (
                  <tr key={risk.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            risk.severity === 'High'
                              ? 'bg-rose-600 animate-pulse'
                              : risk.severity === 'Medium'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        <span className="font-bold">{risk.indicator}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 pl-4">
                        {risk.category}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-slate-800">{risk.mineName}</div>
                      <div className="text-[11px] text-slate-400">
                        {risk.subsidiary} • {risk.coalfield}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <Badge
                        variant={
                          risk.severity === 'High'
                            ? 'rose'
                            : risk.severity === 'Medium'
                            ? 'amber'
                            : 'emerald'
                        }
                        size="sm"
                        dot
                      >
                        {risk.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="line-clamp-2 text-[11px] text-slate-600 leading-snug">
                        {risk.reason}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                      {risk.detectedDate}
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedRisk(risk)}
                        className="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                      >
                        Inspect Proof &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Strata Trends Tab */}
      {activeTab === 'trends' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Multi-Year Strata Anomaly Trends Across Coal Basins
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-800 block mb-1">
                Aquifer Hydrostatic Head (Jharia Basin)
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Piezometric logs reveal +32% inflow acceleration into deep coking shaft workings due to Barakar sandstone fracture opening.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-800 block mb-1">
                Overburden Highwall Dump Creep (Korba Basin)
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Radar telemetry detected 4.2 mm/week horizontal displacement along dump crest following basal soft shale saturation.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-800 block mb-1">
                Subsurface Fire Migration (Jharia Block-II)
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Thermal drone thermography logged 280°C underground hotspot within 22m depth of unsealed outcrop crack.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Methodology Tab */}
      {activeTab === 'methodology' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-3 text-xs text-slate-700 leading-relaxed">
          <h3 className="text-sm font-semibold text-slate-900">
            Explainable Decision Support Philosophy
          </h3>
          <p>
            SIH26023 strictly avoids opaque or speculative 'black box' disaster predictions. All generated risk flags are derived from deterministic geological engineering thresholds:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-800">
            <li><strong>Hydraulic Inflow Screening: </strong>Triggers when continuous sump discharge exceeds historical 3-year moving median by &gt;25%.</li>
            <li><strong>Slope Stability (FoS): </strong>Triggers when calculated Factor of Safety drops below statutory 1.30 standard under DGMS Tech Circulars.</li>
            <li><strong>Strata Gas Dynamics: </strong>Flags momentary CH4 concentrations exceeding 0.75% statutory limit in return airways.</li>
            <li><strong>Data Integrity Screening: </strong>Flags exploratory corridors exceeding 400m borehole drill spacing along verified fault strike lines.</li>
          </ul>
        </div>
      )}

      {/* Detailed Risk Evidence Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedRisk)}
        onClose={() => setSelectedRisk(null)}
        title={selectedRisk ? `Risk Screening Evidence: ${selectedRisk.indicator}` : ''}
        subtitle={selectedRisk ? `${selectedRisk.mineName} • Category: ${selectedRisk.category}` : ''}
        footer={
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-slate-500">Source: Certified Statutory Archive</span>
            <Button variant="primary" size="sm" onClick={() => setSelectedRisk(null)}>
              Dismiss Inspector
            </Button>
          </div>
        }
      >
        {selectedRisk && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <span className="text-rose-800 font-bold block mb-1">
                Underlying Geological Anomaly:
              </span>
              <p className="text-rose-900">{selectedRisk.reason}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Direct Document Citation:
              </span>
              <p className="font-semibold text-slate-900 mt-0.5">{selectedRisk.evidenceDocument} ({selectedRisk.evidencePage})</p>
              <blockquote className="mt-2 p-2.5 bg-white border border-slate-200 rounded text-slate-700 font-mono text-[11px] leading-relaxed">
                &ldquo;{selectedRisk.evidenceSnippet}&rdquo;
              </blockquote>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
              <span className="font-bold block mb-0.5">Recommended Mitigation Action:</span>
              <p>{selectedRisk.recommendedAction}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
