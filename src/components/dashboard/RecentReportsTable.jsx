import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { MOCK_REPORTS } from '../../data/mockReports';
import Badge from '../common/Badge';

export default function RecentReportsTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recent Exploration &amp; Statutory Reports</h3>
            <p className="text-[11px] text-slate-500">CMPDI Regional Institutes &amp; Subsidiary Filings</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/reports')}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
        >
          <span>View All (1,240)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-5 py-3">Report Number &amp; Title</th>
              <th className="px-4 py-3">Mine / Colliery</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Statutory Status</th>
              <th className="px-4 py-3">Review State</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_REPORTS.slice(0, 4).map((rep) => (
              <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="font-semibold text-slate-900">{rep.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {rep.reportNumber} • {rep.category}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-medium text-slate-800">{rep.mineName}</div>
                  <div className="text-[11px] text-slate-400">{rep.subsidiary}</div>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                  {rep.period}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Badge
                    variant={
                      rep.status === 'Approved'
                        ? 'emerald'
                        : rep.status === 'Published'
                        ? 'blue'
                        : rep.status === 'Pending Review'
                        ? 'amber'
                        : 'slate'
                    }
                    size="sm"
                  >
                    {rep.status}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                      rep.status === 'Pending Review'
                        ? 'text-amber-700 font-semibold'
                        : 'text-slate-600'
                    }`}
                  >
                    {rep.status === 'Pending Review' ? (
                      <Clock className="w-3 h-3 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    )}
                    <span className="truncate max-w-[140px]">{rep.humanReviewStatus}</span>
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => navigate('/ai-query')}
                      className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="Ask AI about this report"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigate('/reports')}
                      className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
