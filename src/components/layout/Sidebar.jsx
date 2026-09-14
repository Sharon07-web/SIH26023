import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  Mountain,
  Map,
  History,
  Sparkles,
  FileText,
  ShieldAlert,
  WifiOff,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  Building2,
  Database
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Upload Data', path: '/upload', icon: UploadCloud },
    { name: 'Mines', path: '/mines', icon: Mountain },
    { name: 'Coalfield Map', path: '/coalfield-map', icon: Map },
    { name: 'Historical Archive', path: '/historical-archive', icon: History },
    { name: 'AI Query', path: '/ai-query', icon: Sparkles, tech: true },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Risk Intelligence', path: '/risk-intelligence', icon: ShieldAlert, badge: '6' },
    { name: 'Offline Mode', path: '/offline-mode', icon: WifiOff },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-navy-950 border-r border-navy-800/80 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-navy-800/80 bg-navy-900/60">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/30">
            <Layers className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-wider text-blue-400 font-mono">
                  SIH26023
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-800 rounded">
                  CMPDI
                </span>
              </div>
              <h1 className="text-xs font-semibold text-white truncate tracking-tight">
                Geological &amp; Mining
              </h1>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Authority Context Banner */}
      {!collapsed && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-navy-900/80 border border-navy-800/80 flex items-center gap-2.5">
          <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div className="text-[11px] leading-tight text-slate-300">
            <div className="font-semibold text-white">Coal India Limited</div>
            <div className="text-[10px] text-slate-400">Min. of Coal, Govt. of India</div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto dark-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                    : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? item.name : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  item.tech ? 'text-cyan-400 group-hover:text-cyan-300' : ''
                }`}
              />
              {!collapsed && (
                <span className="truncate flex-1 tracking-tight">{item.name}</span>
              )}
              {!collapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {item.badge}
                </span>
              )}
              {!collapsed && item.tech && (
                <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-wider font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  RAG
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-3 border-t border-navy-800/80 bg-navy-900/40">
        {!collapsed ? (
          <div className="px-2 py-1.5 rounded-lg bg-navy-950/60 border border-navy-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">System State</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>NODE: CMPDI-HQ-01</span>
              <span>v1.0-DEMO</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="System Status: Operational">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
}
