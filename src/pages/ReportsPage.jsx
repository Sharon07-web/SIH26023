import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  FilePlus2,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Sparkles,
  AlertTriangle,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { MOCK_REPORTS } from '../data/mockReports';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Tabs from '../components/common/Tabs';
import Modal from '../components/common/Modal';
import SearchInput from '../components/common/SearchInput';

export default function ReportsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportsList, setReportsList] = useState(MOCK_REPORTS);

  const tabs = [
    { id: 'all', label: 'All Statutory Reports', count: reportsList.length },
    { id: 'Approved', label: 'Approved & Certified', count: reportsList.filter((r) => r.status === 'Approved').length },
    { id: 'Pending Review', label: 'Pending Review', count: reportsList.filter((r) => r.status === 'Pending Review').length },
    { id: 'Draft', label: 'Drafts', count: reportsList.filter((r) => r.status === 'Draft').length }
  ];

  const filteredReports = reportsList.filter((r) => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.mineName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newRep = {
        id: `rep-${Date.now()}`,
        reportNumber: `CMPDI-AUTO-${Date.now().toString().slice(-4)}`,
        title: "Automated Quarterly Geological Strata & Seam Volumetric Review",
        mineId: "mine-001",
        mineName: "Rajrappa Open Cast Project",
        subsidiary: "CCL",
        category: "Volumetric & Strata Audit",
        period: "FY 2025-26 Q4",
        status: "Pending Review",
        humanReviewStatus: "Human Review Required (Chief Geologist Sign-Off)",
        reviewer: "Assigned: Er. S. Gangopadhyay (Chief Mining Geologist)",
        date: "2026-02-24",
        pagesCount: 52,
        fileFormat: "PDF",
        fileSize: "7.8 MB",
        confidenceScore: "97.4%",
        summary: "Compiled using verified borehole records and LiDAR drone survey volumes. Strata correlations indicate 2.4% thickening in Seam Kargali.",
        keyFindings: [
          "Seam thickness continuity confirmed across Central and East benches.",
          "Overburden stripping volume reconciled with weighbridge dispatch metrics within 1.2% variance.",
          "Groundwater ingress rate stable at 310 m³/hr."
        ],
        risksCount: 1,
        recommendations: "Maintain current quarterly infill borehole drilling plan and conduct slope radar verification."
      };
      setReportsList([newRep, ...reportsList]);
      setSelectedReport(newRep);
    }, 800);
  };

  const handleApproveReport = (repId) => {
    setReportsList((prev) =>
      prev.map((r) =>
        r.id === repId
          ? {
              ...r,
              status: 'Approved',
              humanReviewStatus: 'Reviewed & Certified by Chief Geologist'
            }
          : r
      )
    );
    if (selectedReport && selectedReport.id === repId) {
      setSelectedReport((prev) => ({
        ...prev,
        status: 'Approved',
        humanReviewStatus: 'Reviewed & Certified by Chief Geologist'
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              STATUTORY &amp; CMPDI REPORTING STUDIO
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Human-in-the-Loop Certification
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Geological &amp; Mining Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Certified statutory filings, reserve re-estimations, and geotechnical evaluations. All automated drafts enforce mandatory Chief Geologist review.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            icon={FilePlus2}
            loading={isGenerating}
            onClick={handleGenerateReport}
          >
            {isGenerating ? 'Compiling Report...' : 'Generate New Report'}
          </Button>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <div className="w-full sm:w-72">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search reports or mine names..."
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Report Number &amp; Title</th>
                <th className="px-4 py-3">Target Mine</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Human Review Workflow</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate max-w-sm">{rep.title}</span>
                    </div>
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
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                        rep.status === 'Pending Review'
                          ? 'text-amber-700 font-semibold'
                          : 'text-slate-600'
                      }`}
                    >
                      {rep.status === 'Pending Review' ? (
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span className="truncate max-w-[160px]">{rep.humanReviewStatus}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px] text-slate-700">
                    {rep.confidenceScore}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        Inspect Dossier
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Report Dossier Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        maxWidth="max-w-3xl"
        title={selectedReport ? `${selectedReport.reportNumber}: ${selectedReport.title}` : ''}
        subtitle={selectedReport ? `${selectedReport.mineName} (${selectedReport.subsidiary}) • ${selectedReport.period}` : ''}
        footer={
          selectedReport && (
            <div className="flex items-center justify-between w-full">
              <div>
                {selectedReport.status === 'Pending Review' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Human Review Required Before Final Certification
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedReport.status === 'Pending Review' && (
                  <Button
                    variant="success"
                    size="sm"
                    icon={UserCheck}
                    onClick={() => handleApproveReport(selectedReport.id)}
                  >
                    Digitally Certify &amp; Sign
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={() => alert(`Downloading signed PDF for ${selectedReport.reportNumber}...`)}
                >
                  Export Signed PDF
                </Button>
                <Button variant="primary" size="sm" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
              </div>
            </div>
          )
        }
      >
        {selectedReport && (
          <div className="space-y-4 text-xs">
            {/* Top Metadata Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Format</span>
                <span className="font-semibold text-slate-800">{selectedReport.fileFormat} ({selectedReport.fileSize})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Total Pages</span>
                <span className="font-semibold text-slate-800">{selectedReport.pagesCount} Pages</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Reviewer</span>
                <span className="font-semibold text-slate-800 truncate block">{selectedReport.reviewer}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Statutory State</span>
                <Badge variant={selectedReport.status === 'Approved' ? 'emerald' : 'amber'} size="sm">
                  {selectedReport.status}
                </Badge>
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Executive Geological Summary
              </h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed font-sans">
                {selectedReport.summary}
              </p>
            </div>

            {/* Structured Findings */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Verified Strata Findings &amp; Observations
              </h4>
              <ul className="space-y-1.5 pl-5 list-disc text-slate-800 bg-blue-50/50 p-3 rounded-lg border border-blue-200">
                {selectedReport.keyFindings.map((finding, idx) => (
                  <li key={idx} className="leading-snug">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-slate-900 block mb-0.5">
                Statutory Recommendations:
              </span>
              <span className="text-slate-600 leading-relaxed">
                {selectedReport.recommendations}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
