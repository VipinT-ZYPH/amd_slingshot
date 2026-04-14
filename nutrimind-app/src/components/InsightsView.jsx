import React from 'react'

const InsightsView = () => {
  const healthTips = [
    {
      title: "Circadian Fasting",
      category: "Metabolism",
      tip: "Try aligning your last meal with sunset. Early time-restricted feeding may improve insulin sensitivity.",
      icon: "wb_twilight",
      color: "text-amber-400"
    },
    {
      title: "Micronutrient Synergy",
      category: "Absorption",
      tip: "Pair fat-soluble vitamins (A, D, E, K) with a healthy fat source like avocado for 3x better absorption.",
      icon: "biotech",
      color: "text-emerald-400"
    },
    {
      title: "Glucose Mapping",
      category: "Energy",
      tip: "Eating fiber and protein before carbohydrates can flatten your glucose curve significantly.",
      icon: "monitoring",
      color: "text-sky-400"
    }
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <section className="text-center">
        <h2 className="text-4xl font-black tracking-tight text-on-surface mb-3">AI Deep Health Insights</h2>
        <p className="text-slate-400 max-w-lg mx-auto font-medium">Precision strategies based on nutritional science and biometric data.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {healthTips.map((item, idx) => (
          <div key={idx} className="glass-card p-8 rounded-3xl inner-glow-top flex flex-col group cursor-help">
            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 ${item.color} group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{item.icon}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{item.category}</span>
            <h3 className="text-xl font-bold text-on-surface mb-4">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium text-sharp">
              {item.tip}
            </p>
          </div>
        ))}
      </div>

      <div className="ai-insight-glow p-10 rounded-[2rem] text-center">
        <h3 className="text-primary font-bold text-lg mb-4">Personalization Phase 2 Ready</h3>
        <p className="text-slate-300 max-w-2xl mx-auto italic">
          "Your profile is trending towards optimal glucose stability. Sustain this baseline for 7 more days to unlock advanced longevity stressors."
        </p>
      </div>
    </div>
  )
}

export default InsightsView
