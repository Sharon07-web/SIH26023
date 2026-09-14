import React from 'react';
import { MOCK_ACTIVITIES } from '../../data/mockActivity';
import Badge from '../common/Badge';
import { Activity, Clock } from 'lucide-react';

export default function RecentActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card flex flex-col h-full">
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Recent Ingestion &amp; Activity</h3>
        </div>
        <span className="text-[11px] text-slate-400">Live feed</span>
      </div>

      {/* Activity List */}
      <div className="p-4 divide-y divide-slate-100 overflow-y-auto max-h-[380px]">
        {MOCK_ACTIVITIES.map((act) => (
          <div key={act.id} className="py-3 first:pt-0 last:pb-0 group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    act.badgeColor === 'emerald'
                      ? 'emerald'
                      : act.badgeColor === 'rose'
                      ? 'rose'
                      : act.badgeColor === 'amber'
                      ? 'amber'
                      : 'blue'
                  }
                  size="sm"
                >
                  {act.badge}
                </Badge>
                <span className="text-[11px] font-semibold text-slate-800 truncate">
                  {act.subsidiary} • {act.mine}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {act.timestamp}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-snug group-hover:text-slate-900 transition-colors">
              {act.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
