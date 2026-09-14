import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

// Pages
import DashboardPage from './pages/DashboardPage';
import UploadDataPage from './pages/UploadDataPage';
import MinesPage from './pages/MinesPage';
import MineDetailPage from './pages/MineDetailPage';
import CoalfieldMapPage from './pages/CoalfieldMapPage';
import HistoricalArchivePage from './pages/HistoricalArchivePage';
import AIQueryPage from './pages/AIQueryPage';
import ReportsPage from './pages/ReportsPage';
import RiskIntelligencePage from './pages/RiskIntelligencePage';
import OfflineModePage from './pages/OfflineModePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/upload" element={<UploadDataPage />} />
          <Route path="/mines" element={<MinesPage />} />
          <Route path="/mines/:mineId" element={<MineDetailPage />} />
          <Route path="/coalfield-map" element={<CoalfieldMapPage />} />
          <Route path="/historical-archive" element={<HistoricalArchivePage />} />
          <Route path="/ai-query" element={<AIQueryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/risk-intelligence" element={<RiskIntelligencePage />} />
          <Route path="/offline-mode" element={<OfflineModePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
