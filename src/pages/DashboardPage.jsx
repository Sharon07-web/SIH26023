import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Mountain,
  FileText,
  FileCheck2,
  ShieldAlert,
  UploadCloud,
  Sparkles,
  Map,
  FilePlus2,
  Building,
  ArrowRight,
  TrendingUp,
  Database,
  Layers
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import PipelineVisualizer from '../components/layout/PipelineVisualizer';
import RiskAlertsList from '../components/dashboard/RiskAlertsList';
import CoalfieldMiniMap from '../components/dashboard/CoalfieldMiniMap';
import RecentActivityFeed from '../components/dashboard/RecentActivityFeed';
import RecentReportsTable from '../components/dashboard/RecentReportsTable';
import Button from '../components/common/Button';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { selectedSubsidiary } = useOutletContext();

  return (
    <div className="space-y-6">
      {/* Top Greeting & Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              CMPDI CENTRAL INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Subsidiary Scope: {selectedSubsidiary === 'ALL' ? 'Pan-CIL (All 8 Subsidiaries)' : selectedSubsidiary}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, Geologist &amp; Engineering Team
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here is what is happening with your mining, geological stratigraphy, and reporting records today.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={UploadCloud}
            onClick={() => navigate('/upload')}
          >
            Upload Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/ai-query')}
          >
            Ask AI Query
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Map}
            onClick={() => navigate('/coalfield-map')}
          >
            Coalfield Map
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={FilePlus2}
            onClick={() => navigate('/reports')}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Mines Tracked"
          value="48"
          trend="+3 new"
          trendDirection="up"
          timeframe="expansion projects"
          icon={Mountain}
          colorScheme="blue"
          onClick={() => navigate('/mines')}
        />
        <KPICard
          title="Geological Reports"
          value="1,240"
          trend="+18"
          trendDirection="up"
          timeframe="this month"
          icon={FileText}
          colorScheme="emerald"
          onClick={() => navigate('/reports')}
        />
        <KPICard
          title="Documents Processed"
          value="8,920"
          trend="99.4%"
          trendDirection="up"
          timeframe="OCR & validation rate"
          icon={FileCheck2}
          colorScheme="purple"
          onClick={() => navigate('/upload')}
        />
        <KPICard
          title="Risk Screenings"
          value="6 Active"
          trend="3 High"
          trendDirection="down"
          timeframe="require mitigation action"
          icon={ShieldAlert}
          colorScheme="rose"
          onClick={() => navigate('/risk-intelligence')}
        />
      </div>

      {/* End-to-End Data Pipeline Section */}
      <PipelineVisualizer />

      {/* Split Section: Risk Alerts & Recent Ingestion Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RiskAlertsList />
        </div>
        <div className="lg:col-span-5">
          <RecentActivityFeed />
        </div>
      </div>

      {/* Coalfields Geospatial Overview */}
      <CoalfieldMiniMap />

      {/* Recent Exploration & Statutory Reports Table */}
      <RecentReportsTable />
    </div>
  );
}
