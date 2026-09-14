import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  FileSpreadsheet,
  FileCode,
  Eye,
  Trash2,
  RefreshCw,
  Layers,
  ArrowRight,
  Database,
  Search
} from 'lucide-react';
import { MOCK_UPLOADED_FILES } from '../data/mockActivity';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

export default function UploadDataPage() {
  const [filesList, setFilesList] = useState(MOCK_UPLOADED_FILES);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const newDoc = {
            id: `file-${Date.now()}`,
            name: "Rajrappa_Infill_Boreholes_BH104_BH112.pdf",
            type: "PDF (Exploration Log)",
            size: "14.2 MB",
            status: "Processed",
            uploadedOn: "Just now",
            extractedRecords: 86,
            validationStatus: "Passed (100%)",
            category: "Borehole Lithology"
          };
          setFilesList([newDoc, ...filesList]);
          setSelectedFile(newDoc);
          return 0;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    simulateUpload();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                DATA INGESTION PIPELINE
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">Automated OCR &amp; Stratigraphic Extraction</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Upload Geological &amp; Mining Records
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Ingest exploration reports, scanned drill logs, production ledgers, and telemetry. Automated AI extracts, normalizes, and validates records against CMPDI standards.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={() => setFilesList(MOCK_UPLOADED_FILES)}
            >
              Reset Demo Files
            </Button>
          </div>
        </div>
      </div>

      {/* Visual Ingestion Stages Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Automated 6-Stage Processing Engine
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: "1. Intake", desc: "Format verification", active: true },
            { step: "2. Extract", desc: "OCR & table parser", active: true },
            { step: "3. Clean", desc: "Noise & header filter", active: true },
            { step: "4. Validate", desc: "CMPDI geological rules", active: true },
            { step: "5. Structure", desc: "PostGIS & SQL schema", active: true },
            { step: "6. Index", desc: "pgvector semantic RAG", active: true }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-blue-200 bg-blue-50/50 flex flex-col items-center text-center"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mb-1.5 shadow-xs">
                {idx + 1}
              </div>
              <span className="text-xs font-semibold text-slate-800">{item.step}</span>
              <span className="text-[10px] text-slate-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`bg-white rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          dragActive
            ? 'border-blue-600 bg-blue-50/50 scale-[1.005]'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/40'
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            Drop your geological files here, or browse
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Supports PDF, DOCX, XLSX, CSV, and high-resolution scanned core lithologs (Max 150MB per file)
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="primary"
              size="md"
              icon={UploadCloud}
              loading={isUploading}
              onClick={simulateUpload}
            >
              {isUploading ? `Ingesting... (${uploadProgress}%)` : 'Select Files to Upload'}
            </Button>
          </div>

          {isUploading && (
            <div className="w-full mt-4">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Running layout OCR &amp; strata validation...</span>
                <span className="font-mono">{uploadProgress}%</span>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-400">
            <span>• Auto-rotation &amp; de-skew</span>
            <span>• Table structure reconstruction</span>
            <span>• Coordinate geotagging</span>
          </div>
        </div>
      </div>

      {/* Uploaded Files Registry Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Ingested File Repository</h3>
            <p className="text-xs text-slate-500">
              {filesList.length} files currently processed and structured in database
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter by:</span>
            <select className="text-xs bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1 text-slate-700">
              <option>All File Types</option>
              <option>PDF Reports</option>
              <option>Spreadsheets</option>
              <option>Telemetry CSV</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">File Name &amp; Category</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Records Extracted</th>
                <th className="px-4 py-3">Validation</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filesList.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate max-w-xs">{file.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Uploaded on {file.uploadedOn} • {file.category}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px] text-slate-600">
                    {file.type}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px] text-slate-600">
                    {file.size}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Badge
                      variant={
                        file.status === 'Processed'
                          ? 'emerald'
                          : file.status === 'Processing'
                          ? 'blue'
                          : file.status === 'Needs Review'
                          ? 'amber'
                          : 'slate'
                      }
                      size="sm"
                    >
                      {file.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono font-semibold text-slate-800">
                    {file.extractedRecords} rows
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 font-medium text-[11px] ${
                        file.status === 'Needs Review' ? 'text-amber-700' : 'text-emerald-700'
                      }`}
                    >
                      {file.status === 'Needs Review' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      {file.validationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedFile(file)}
                        className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        Inspect Metadata
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extracted Metadata Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedFile)}
        onClose={() => setSelectedFile(null)}
        title={selectedFile ? `Extracted Intelligence: ${selectedFile.name}` : ''}
        subtitle="CMPDI Automated Extraction & Geological Verification Audit"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-slate-500">Validation Check: Passed CMPDI Rule Set v2.4</span>
            <Button variant="primary" size="sm" onClick={() => setSelectedFile(null)}>
              Close Inspector
            </Button>
          </div>
        }
      >
        {selectedFile && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Format</span>
                <span className="font-semibold text-slate-800">{selectedFile.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Size</span>
                <span className="font-semibold text-slate-800">{selectedFile.size}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Records Parsed</span>
                <span className="font-semibold text-slate-800">{selectedFile.extractedRecords}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                <Badge variant={selectedFile.status === 'Processed' ? 'emerald' : 'amber'} size="sm">
                  {selectedFile.status}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Sample Extracted Strata &amp; Seam Horizons (Preview)
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">Horizon ID</th>
                      <th className="p-2.5">Depth From (m)</th>
                      <th className="p-2.5">Depth To (m)</th>
                      <th className="p-2.5">Lithology</th>
                      <th className="p-2.5">Quality / Ash %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600">STR-01</td>
                      <td className="p-2.5">0.0</td>
                      <td className="p-2.5">18.4</td>
                      <td className="p-2.5 font-sans">Medium Sandstone (Barakar)</td>
                      <td className="p-2.5">N/A (Overburden)</td>
                    </tr>
                    <tr className="bg-blue-50/50">
                      <td className="p-2.5 font-bold text-blue-600">SEAM-KRG</td>
                      <td className="p-2.5">18.4</td>
                      <td className="p-2.5">30.2</td>
                      <td className="p-2.5 font-sans font-semibold text-slate-900">Kargali Main Seam (Coal)</td>
                      <td className="p-2.5 text-emerald-700 font-semibold">Ash 18.2% (W-III Coking)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600">STR-02</td>
                      <td className="p-2.5">30.2</td>
                      <td className="p-2.5">46.5</td>
                      <td className="p-2.5 font-sans">Carbonaceous Shale Parting</td>
                      <td className="p-2.5">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Stratigraphic Integrity Verified: </strong>
                All depth intervals are contiguous without negative thicknesses or stratigraphic inversions.
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
