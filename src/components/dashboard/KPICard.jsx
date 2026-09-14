import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KPICard({
  title,
  value,
  trend,
  trendDirection = 'up',
  timeframe = 'vs last quarter',
  icon: Icon,
  colorScheme = 'blue',
  onClick
}) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 text-blue-700',
      border: 'hover:border-blue-300',
      accent: 'bg-blue-600'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-700',
      border: 'hover:border-emerald-300',
      accent: 'bg-emerald-600'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700',
      border: 'hover:border-amber-300',
      accent: 'bg-amber-600'
    },
    rose: {
      bg: 'bg-rose-50 text-rose-700',
      border: 'hover:border-rose-300',
      accent: 'bg-rose-600'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-700',
      border: 'hover:border-purple-300',
      accent: 'bg-purple-600'
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 shadow-card p-5 transition-all duration-200 hover:shadow-card-hover ${
        onClick ? 'cursor-pointer' : ''
      } ${scheme.border}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
              {value}
            </span>
          </div>
        </div>

        <div className={`p-2.5 rounded-lg ${scheme.bg} shrink-0`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      {trend && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 font-semibold">
            {trendDirection === 'up' ? (
              <span className="text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {trend}
              </span>
            ) : trendDirection === 'down' ? (
              <span className="text-rose-600 flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5" />
                {trend}
              </span>
            ) : (
              <span className="text-slate-600">{trend}</span>
            )}
          </div>
          <span className="text-slate-400 text-[11px]">{timeframe}</span>
        </div>
      )}
    </div>
  );
}
