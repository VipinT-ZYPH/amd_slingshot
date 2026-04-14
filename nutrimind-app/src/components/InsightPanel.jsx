import React from 'react'

const InsightPanel = ({ insights, loading }) => {
  if (loading) {
    return (
      <div className="ai-insight-glow p-12 rounded-[2rem] animate-pulse relative overflow-hidden">
        <div className="flex items-center gap-6 mb-10">
          <div className="p-4 bg-secondary/10 rounded-2xl w-16 h-16"></div>
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded w-48"></div>
            <div className="h-3 bg-white/5 rounded w-32"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="ai-insight-glow p-12 rounded-[2rem] relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
      <div className="absolute -right-20 -top-20 w-96 h-96 biometric-glow rounded-full opacity-40"></div>
      
      <div className="flex items-center gap-6 mb-10">
        <div className="p-4 bg-secondary/15 rounded-2xl border border-secondary/30 shadow-lg shadow-secondary/5">
          <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">AI Nutrition Insight</h2>
          <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Premium Performance Analysis
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-lg text-slate-300 leading-relaxed max-w-5xl font-medium text-sharp">
          {insights?.summary || "Enter your meal profile for a biometric nutritional analysis and stable glucose mapping."}
        </p>
        
        {insights?.suggestions?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {insights.suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-center gap-4 text-sm text-on-surface/80 font-medium p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {insights?.smartSwap && (
          <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 flex items-start gap-4 animate-in fade-in zoom-in-95 duration-500">
            <span className="material-symbols-outlined text-primary text-2xl pt-0.5">lightbulb</span>
            <div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Smart Swap Suggestion</h4>
              <p className="text-on-surface/90 text-sm font-medium leading-relaxed">
                {insights.smartSwap}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InsightPanel
