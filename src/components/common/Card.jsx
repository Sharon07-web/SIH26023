import React from 'react';

export default function Card({
  children,
  className = '',
  title,
  subtitle,
  action,
  icon: Icon,
  padding = 'default',
  hover = false,
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    tight: 'p-3',
    default: 'p-5',
    spacious: 'p-6',
  };

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 shadow-card ${
        hover ? 'transition-all duration-200 hover:shadow-card-hover hover:border-slate-300' : ''
      } ${className}`}
      {...props}
    >
      {(title || action || Icon) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="p-1.5 rounded-md bg-slate-100 text-slate-700">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <div>
              {title && <h3 className="text-sm font-semibold text-slate-900 tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={paddingStyles[padding] || paddingStyles.default}>{children}</div>
    </div>
  );
}
