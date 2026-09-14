import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, AlertTriangle, FileText, ChevronRight } from 'lucide-react';
import { MOCK_RISKS } from '../../data/mockRisks';
import Badge from '../common/Badge';

export default function RiskAlertsList() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-rose-50 text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Geological &amp; Operational Risk Screening</h3>
            <p className="text-[11px] text-slate-500">Explainable Decision Support (Not Disaster Prediction)</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/risk-intelligence')}
          className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
        >
          <span>All Screenings (6)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Risks List */}
      <div className="p-4 space-y-3 overflow-y-auto max-h-[380px]">
        {MOCK_RISKS.slice(0, 3).map((risk) => (
          <div
            key={risk.id}
            onClick={() => navigate('/risk-intelligence')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant={risk.severity === 'High' ? 'rose' : 'amber'}
                  size="sm"
                  dot
                >
                  {risk.severity} Priority
                </Badge>
                <span className="text-xs font-semibold text-slate-900 group-hover:text-rose-700">
                  {risk.mineName}
                </span>
                <span className="text-[11px] text-slate-400">({risk.subsidiary})</span>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">{risk.detectedDate}</span>
            </div>

            <h4 className="text-xs font-medium text-slate-800 mt-1.5">
              {risk.indicator}
            </h4>

            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              <strong className="text-slate-700 font-semibold">Evidence: </strong>
              {risk.reason}
            </p>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3 text-slate-400" />
                <span>Source: {risk.evidenceDocument}</span>
              </span>
              <span className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                Inspect Evidence <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
