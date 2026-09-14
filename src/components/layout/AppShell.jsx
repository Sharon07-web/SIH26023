import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import GlobalSearchModal from './GlobalSearchModal';

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('ALL');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Persistent Left Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Navigation */}
        <TopNav
          selectedSubsidiary={selectedSubsidiary}
          onSelectSubsidiary={setSelectedSubsidiary}
          onOpenSearchModal={() => setIsSearchOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ selectedSubsidiary, setSelectedSubsidiary }} />
        </main>
      </div>

      {/* Global Command / Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
