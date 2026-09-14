import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mountain, FileText, ShieldAlert, Sparkles, ArrowRight, X } from 'lucide-react';
import { MOCK_MINES } from '../../data/mockMines';
import { MOCK_REPORTS } from '../../data/mockReports';
import { MOCK_RISKS } from '../../data/mockRisks';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // toggle modal
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filteredMines = query
    ? MOCK_MINES.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.subsidiary.toLowerCase().includes(query.toLowerCase()) ||
          m.coalfield.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : MOCK_MINES.slice(0, 3);

  const filteredReports = query
    ? MOCK_REPORTS.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.reportNumber.toLowerCase().includes(query.toLowerCase()) ||
          r.mineName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : MOCK_REPORTS.slice(0, 2);

  const filteredRisks = query
    ? MOCK_RISKS.filter(
        (rk) =>
          rk.indicator.toLowerCase().includes(query.toLowerCase()) ||
          rk.mineName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2)
    : MOCK_RISKS.slice(0, 2);

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a mine name, borehole ID, report code, or risk keyword..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Mines Section */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1 flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-slate-400" />
              <span>Mines &amp; Colliery Projects</span>
            </div>
            <div className="space-y-1">
              {filteredMines.map((mine) => (
                <button
                  key={mine.id}
                  onClick={() => handleSelect(`/mines/${mine.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-blue-50/70 transition-colors group"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                      {mine.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {mine.subsidiary} • {mine.coalfield}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Reports Section */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Statutory &amp; Geological Reports</span>
            </div>
            <div className="space-y-1">
              {filteredReports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => handleSelect(`/reports`)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-blue-50/70 transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 truncate">
                      {report.reportNumber}: {report.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {report.mineName} • {report.period}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Risk Section */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>Active Risk Screenings</span>
            </div>
            <div className="space-y-1">
              {filteredRisks.map((risk) => (
                <button
                  key={risk.id}
                  onClick={() => handleSelect(`/risk-intelligence`)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-rose-50/60 transition-colors group"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-rose-700">
                      {risk.indicator}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {risk.mineName} • {risk.category}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate using keyboard or mouse</span>
          <span className="font-mono">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
