import React, { useState } from 'react';
import {
  Search,
  Bell,
  User,
  Shield,
  Clock,
  ExternalLink,
  ChevronDown,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  Sparkles
} from 'lucide-react';
import { MOCK_SUBSIDIARIES } from '../../data/mockMines';

export default function TopNav({
  selectedSubsidiary,
  onSelectSubsidiary,
  onOpenSearchModal,
  breadcrumbs = []
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Highwater Inflow Alert',
      time: '12m ago',
      desc: 'Moonidih Shaft 2 piezometer surge +32%',
      urgent: true
    },
    {
      id: 2,
      title: 'Extraction Completed',
      time: '35m ago',
      desc: '142 borehole stratigraphy logs indexed for Rajrappa OCP',
      urgent: false
    },
    {
      id: 3,
      title: 'Report Needs Review',
      time: '2h ago',
      desc: 'SECL Gevra slope stability analysis ready for certification',
      urgent: false
    }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/90 shadow-sm flex items-center justify-between px-6">
      {/* Left: Breadcrumbs & Subsidiary Selector */}
      <div className="flex items-center gap-4">
        {/* Subsidiary Quick Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
            Subsidiary:
          </label>
          <div className="relative">
            <select
              value={selectedSubsidiary}
              onChange={(e) => onSelectSubsidiary(e.target.value)}
              className="appearance-none bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-1.5 border border-slate-300/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
            >
              {MOCK_SUBSIDIARIES.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Vertical divider */}
        <div className="h-5 w-px bg-slate-200 hidden md:block" />

        {/* Context / Date indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Operational Cycle: Q4 FY25-26</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-slate-600 font-mono">14-Sep-2026</span>
        </div>
      </div>

      {/* Middle: Global Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <button
          type="button"
          onClick={onOpenSearchModal}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 transition-all text-left group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span className="truncate">Search mines, borehole logs, risks, reports...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Network / PWA Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-700">
          <Wifi className="w-3 h-3 text-emerald-600" />
          <span>HQ Connected</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-dropdown z-50 overflow-hidden animate-fadeIn">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-800">Operational Alerts</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  1 Urgent
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-0.5">
                      <span className="flex items-center gap-1.5">
                        {item.urgent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        )}
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all in Risk Intelligence &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Authority Role */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-navy-900 text-white font-semibold text-xs flex items-center justify-center border border-navy-800 shadow-sm">
              SG
            </div>
            <div className="hidden xl:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                Er. S. Gangopadhyay
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Chief Mining Geologist | CMPDI
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white border border-slate-200 shadow-dropdown z-50 p-2 animate-fadeIn">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-semibold text-slate-900">Er. S. Gangopadhyay</p>
                <p className="text-[11px] text-slate-500">geologist.hq@cmpdi.co.in</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-700">
                  ROLE: CHIEF GEOTECH OFFICER
                </span>
              </div>
              <div className="text-xs text-slate-600">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 rounded-md hover:bg-slate-50 font-medium text-slate-700"
                >
                  CMPDI Authority Settings
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 rounded-md hover:bg-slate-50 font-medium text-slate-700"
                >
                  Offline Cache Status
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 rounded-md hover:bg-slate-50 text-slate-500"
                >
                  Switch Identity (Demo Mode)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
