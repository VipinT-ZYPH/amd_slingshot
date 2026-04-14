import React from 'react'

const ResultCard = ({ title, value, unit, icon, subtext }) => {
  return (
    <div className="glass-card p-8 rounded-3xl inner-glow-top flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon || 'analytics'}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{title}</span>
      </div>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-6xl font-bold tracking-tighter text-on-surface">{value}</span>
        {unit && <span className="text-lg text-slate-500 font-semibold">{unit}</span>}
      </div>
      {subtext && (
        <p className="mt-auto text-xs text-slate-500 leading-relaxed font-medium text-sharp">
          {subtext}
        </p>
      )}
    </div>
  )
}

export default ResultCard
