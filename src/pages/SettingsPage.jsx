import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Shield,
  Database,
  Cpu,
  Save,
  CheckCircle2,
  Sliders,
  Users
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('authority');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              GOVERNANCE &amp; CONFIGURATION
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">CMPDI HQ Node</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            System Settings &amp; Subsidiary Standards
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure Coal India Limited subsidiary permissions, automated geological validation thresholds, and API gateways.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Settings Saved
            </span>
          )}
          <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white p-3 rounded-xl border border-slate-200 shadow-card space-y-1">
          {[
            { id: 'authority', label: 'Authority & CIL Node', icon: Building2 },
            { id: 'validation', label: 'Geological Validation Rules', icon: Sliders },
            { id: 'vector', label: 'Database & Vector Index', icon: Database },
            { id: 'roles', label: 'Roles & Human-in-the-Loop', icon: Users }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Body */}
        <div className="lg:col-span-9 bg-white p-6 rounded-xl border border-slate-200 shadow-card">
          {activeTab === 'authority' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                CMPDI HQ Platform Identification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Organization:</label>
                  <input
                    type="text"
                    defaultValue="Central Mine Planning & Design Institute (CMPDI)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Parent Entity:</label>
                  <input
                    type="text"
                    defaultValue="Coal India Limited (Ministry of Coal, GoI)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Regional Institute:</label>
                  <input
                    type="text"
                    defaultValue="RI-II (Dhanbad &amp; Central Basins)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Default Coordinate CRS:</label>
                  <input
                    type="text"
                    defaultValue="EPSG:4326 (WGS 84) / Survey of India UTM 44N"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Automated Geological Validation Thresholds
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block">Maximum Permissible Fault Borehole Spacing</span>
                    <span className="text-slate-500 text-[11px]">CMPDI mandatory grid standard for complex faulted strata</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">
                    200 meters
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block">Highwall Dump Stability Threshold (DGMS FoS)</span>
                    <span className="text-slate-500 text-[11px]">Minimum acceptable Factor of Safety before alert generation</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">
                    1.30 FoS
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block">Aquifer Surge Trigger (Water Ingress Delta)</span>
                    <span className="text-slate-500 text-[11px]">Percentage increase over 3-year median to flag risk screening</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">
                    +25.0%
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vector' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Database &amp; Vector Index Configuration
              </h3>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
                <strong>Phase 1 Note: </strong>
                The platform is currently operating in frontend prototype mode with verified high-fidelity CMPDI mock strata datasets. pgvector and Supabase connection strings will be wired in Phase 5 &amp; 6.
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Engine</span>
                  <span className="font-bold text-slate-800">PostgreSQL + pgvector</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Embedding Model</span>
                  <span className="font-bold text-slate-800">text-embedding-004 (768 dim)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                User Roles &amp; Human-in-the-Loop Signatures
              </h3>
              <p className="text-slate-600">
                Statutory reports generated by AI must receive digital certificate sign-off from users holding the <strong>Chief Mining Geologist</strong> or <strong>Director Tech</strong> role.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">Active User: Er. S. Gangopadhyay</span>
                  <span className="text-slate-500 block text-[11px]">Chief Mining Geologist | CMPDI RI-II</span>
                </div>
                <Badge variant="blue" size="sm">
                  Full Authority
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
