import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import {
  Map as MapIcon,
  Mountain,
  Layers,
  ShieldAlert,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  Info
} from 'lucide-react';
import { MOCK_MINES } from '../data/mockMines';
import { MOCK_COALFIELDS } from '../data/mockCoalfields';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import StatusIndicator from '../components/common/StatusIndicator';

export default function CoalfieldMapPage() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const navigate = useNavigate();

  const [selectedMine, setSelectedMine] = useState(MOCK_MINES[0]);
  const [activeLayers, setActiveLayers] = useState({
    mines: true,
    coalfields: true,
    risks: true
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center map on central Indian coal belts (Jharkhand / Chhattisgarh / MP)
    const map = L.map(mapContainerRef.current, {
      center: [23.5, 84.5],
      zoom: 6,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    // CartoDB Positron tiles for clean, high-contrast, professional government GIS
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO &copy; CMPDI GIS',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // Render Coalfield Basin Regions
    MOCK_COALFIELDS.forEach((cf) => {
      const circle = L.circle(cf.center, {
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.12,
        weight: 1.5,
        radius: 35000
      }).addTo(map);

      circle.bindTooltip(
        `<div style="font-family: Inter, sans-serif; font-size: 11px; font-weight: 600; padding: 2px 4px;">${cf.name} (${cf.subsidiary})</div>`,
        { permanent: false, direction: 'top' }
      );
    });

    // Render Mines Markers with Custom HTML Badges
    MOCK_MINES.forEach((mine) => {
      const isHighRisk = mine.riskLevel === 'High';
      const markerColor = isHighRisk ? '#dc2626' : mine.riskLevel === 'Moderate' ? '#d97706' : '#10b981';

      const customIcon = L.divIcon({
        className: 'custom-mine-marker',
        html: `
          <div style="
            background: ${markerColor};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
          ">
            ⛏
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(mine.coordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedMine(mine);
      });

      marker.bindTooltip(
        `<div style="font-family: Inter, sans-serif; font-size: 11px; padding: 4px;">
          <strong>${mine.name}</strong><br/>
          <span style="color: #64748b;">${mine.subsidiaryShort} • ${mine.riskLevel} Risk</span>
        </div>`,
        { direction: 'top', offset: [0, -10] }
      );
    });

    return () => {
      map.remove();
    };
  }, []);

  const panToMine = (mine) => {
    setSelectedMine(mine);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(mine.coordinates, 9, { duration: 1.2 });
    }
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              GEOSPATIAL GIS SYSTEM
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Pan-India Coal Basins &amp; Mine Horizons</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Coalfield GIS &amp; Stratigraphic Map
          </h1>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">Quick Focus:</span>
          <select
            onChange={(e) => {
              const m = MOCK_MINES.find((item) => item.id === e.target.value);
              if (m) panToMine(m);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 font-medium"
          >
            {MOCK_MINES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.subsidiaryShort})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Container + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[650px]">
        {/* Left Side: Leaflet Interactive GIS Map */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden relative flex flex-col">
          {/* Map Controls Floating Overlay */}
          <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Legend &amp; Status
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span className="text-slate-700 text-[11px]">High Risk Mine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-700 text-[11px]">Moderate Risk Mine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-700 text-[11px]">Stable Mine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-blue-500 bg-blue-100" />
                <span className="text-slate-700 text-[11px]">Coalfield Basin</span>
              </div>
            </div>
          </div>

          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Right Side: Contextual Mine Intelligence Panel */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-card flex flex-col overflow-hidden">
          {selectedMine ? (
            <div className="flex flex-col h-full">
              {/* Panel Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {selectedMine.code}
                  </span>
                  <Badge
                    variant={
                      selectedMine.riskLevel === 'High'
                        ? 'rose'
                        : selectedMine.riskLevel === 'Moderate'
                        ? 'amber'
                        : 'emerald'
                    }
                    size="sm"
                    dot
                  >
                    {selectedMine.riskLevel} Risk
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {selectedMine.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedMine.coalfield} Coalfield • {selectedMine.state}
                </p>
              </div>

              {/* Panel Metrics */}
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase">Subsidiary</span>
                    <span className="font-semibold text-slate-800">{selectedMine.subsidiaryShort}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase">Method</span>
                    <span className="font-semibold text-slate-800">{selectedMine.type}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase">Annual Output</span>
                    <span className="font-semibold text-slate-800 font-mono">{selectedMine.annualProductionMTPA} MTPA</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase">Gas Category</span>
                    <span className="font-semibold text-slate-800">{selectedMine.gasCategory}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Seams &amp; Strata Horizon
                  </h4>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong>Primary: </strong>{selectedMine.primarySeam} ({selectedMine.seamThicknessM})
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Hydrogeology &amp; Water Ingress
                  </h4>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                    <span>Active Ingress Rate:</span>
                    <strong className="text-slate-900 font-mono">{selectedMine.waterIngressM3Hr} m³/hr</strong>
                  </div>
                </div>

                {/* Connected Entity Workflows */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Cross-Module Intelligence
                  </h4>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-between"
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={() => navigate(`/mines/${selectedMine.id}`)}
                  >
                    View Mine Profile &amp; Boreholes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={() => navigate('/reports')}
                  >
                    View Statutory Reports ({selectedMine.totalReportsCount})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-rose-700 hover:bg-rose-50 hover:border-rose-300"
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={() => navigate('/risk-intelligence')}
                  >
                    View Active Risk Screenings ({selectedMine.activeRisksCount})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-blue-600 hover:bg-blue-50"
                    icon={Sparkles}
                    iconPosition="left"
                    onClick={() => navigate('/ai-query')}
                  >
                    Ask AI About {selectedMine.name}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center h-full">
              <MapIcon className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-xs">Click any mine marker on the map to load intelligence dossier.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
