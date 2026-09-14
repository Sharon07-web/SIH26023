import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Mountain,
  Search,
  Filter,
  MapPin,
  FileText,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { MOCK_MINES } from '../data/mockMines';
import Badge from '../components/common/Badge';
import StatusIndicator from '../components/common/StatusIndicator';
import Button from '../components/common/Button';
import SearchInput from '../components/common/SearchInput';

export default function MinesPage() {
  const navigate = useNavigate();
  const { selectedSubsidiary } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterRisk, setFilterRisk] = useState('ALL');

  const filteredMines = MOCK_MINES.filter((mine) => {
    const matchesSearch =
      mine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mine.coalfield.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mine.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mine.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubsidiary =
      selectedSubsidiary === 'ALL' ||
      mine.subsidiaryShort === selectedSubsidiary ||
      selectedSubsidiary === 'CMPDI';

    const matchesType = filterType === 'ALL' || mine.type.includes(filterType);
    const matchesRisk = filterRisk === 'ALL' || mine.riskLevel === filterRisk;

    return matchesSearch && matchesSubsidiary && matchesType && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                REGISTRY &amp; MASTER ASSETS
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">48 Active CIL Colliery Projects</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Mines &amp; Colliery Master Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Geological parameters, stratigraphy, production trends, boreholes, and risk screening across Coal India Limited subsidiaries.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              icon={ExternalLink}
              onClick={() => navigate('/coalfield-map')}
            >
              View on GIS Map
            </Button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search mine name, code, coalfield, or state..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Type:</span>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
          >
            <option value="ALL">All Mining Types</option>
            <option value="Opencast">Opencast (OCP)</option>
            <option value="Underground">Underground (UG)</option>
            <option value="Mixed">Mixed (OCP + UG)</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-2">
            <span>Risk:</span>
          </div>
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
          >
            <option value="ALL">All Risk Ratings</option>
            <option value="Low">Low Risk</option>
            <option value="Moderate">Moderate Risk</option>
            <option value="High">High Risk</option>
          </select>
        </div>
      </div>

      {/* Mines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMines.map((mine) => (
          <div
            key={mine.id}
            onClick={() => navigate(`/mines/${mine.id}`)}
            className="bg-white rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover hover:border-blue-300 transition-all cursor-pointer flex flex-col overflow-hidden group"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-slate-100 flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {mine.code}
                </span>
                <Badge
                  variant={
                    mine.riskLevel === 'High'
                      ? 'rose'
                      : mine.riskLevel === 'Moderate'
                      ? 'amber'
                      : 'emerald'
                  }
                  size="sm"
                  dot
                >
                  {mine.riskLevel} Risk ({mine.riskScore}/100)
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {mine.name}
              </h3>

              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{mine.coalfield} • {mine.state}</span>
              </div>

              <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                {mine.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] uppercase text-slate-400 block">Annual Prod</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {mine.annualProductionMTPA} MT
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] uppercase text-slate-400 block">Stripping</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {mine.strippingRatio}
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] uppercase text-slate-400 block">Boreholes</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {mine.boreholesCount} Logs
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">{mine.subsidiaryShort}</span>
              <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>View Full Intelligence</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
