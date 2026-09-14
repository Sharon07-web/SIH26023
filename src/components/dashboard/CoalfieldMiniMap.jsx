import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, MapPin, ExternalLink, ArrowRight, ShieldAlert, Mountain } from 'lucide-react';
import { MOCK_COALFIELDS } from '../../data/mockCoalfields';
import Button from '../common/Button';

export default function CoalfieldMiniMap() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
            <Map className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Coalfield Basins Overview</h3>
            <p className="text-[11px] text-slate-500">Major CIL Subsidiaries &amp; Strata</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/coalfield-map')}
          icon={ExternalLink}
          iconPosition="right"
        >
          Open Interactive GIS
        </Button>
      </div>

      {/* Coalfield Cards Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {MOCK_COALFIELDS.slice(0, 6).map((cf) => (
          <div
            key={cf.id}
            onClick={() => navigate('/coalfield-map')}
            className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-blue-700">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{cf.name}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                {cf.subsidiary}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
              {cf.geologicalFormation}
            </p>

            <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">
                Reserves: <strong className="text-slate-800">{cf.provenReservesBT} BT</strong>
              </span>
              <span className="text-slate-500">
                {cf.activeMines} Mines
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer banner */}
      <div className="mt-auto px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>Continuous seismic, radar &amp; piezometer tracking across 6 major basins</span>
        </div>
        <button
          onClick={() => navigate('/coalfield-map')}
          className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1"
        >
          <span>View Layers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
