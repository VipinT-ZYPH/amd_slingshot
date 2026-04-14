import React from 'react'

const HistoryView = ({ history = [] }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Analysis History</h2>
          <p className="text-slate-400 text-sm mt-1">Review your past biometric food mappings.</p>
        </div>
        {history.length > 0 && (
          <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">Export Data</button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass-card p-20 rounded-[2rem] text-center flex flex-col items-center justify-center border-dashed border-2 border-white/5">
          <span className="material-symbols-outlined text-slate-600 text-6xl mb-6">history</span>
          <p className="text-slate-500 font-medium">Your analysis history is currently empty.</p>
          <p className="text-slate-600 text-xs mt-2 italic uppercase tracking-widest">Start mapping your meals on the dashboard.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div key={item.id} className="glass-card p-6 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                  item.rating === 'Good' ? 'bg-primary/10 border-primary/20 text-primary' : 
                  item.rating === 'Poor' ? 'bg-error/10 border-error/20 text-error' : 
                  'bg-secondary/10 border-secondary/20 text-secondary'
                }`}>
                  <span className="material-symbols-outlined">
                    {item.rating === 'Good' ? 'check_circle' : item.rating === 'Poor' ? 'warning' : 'info'}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{item.food}</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-on-surface">{item.calories} <span className="text-[10px] text-slate-500 uppercase">kcal</span></div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${
                  item.rating === 'Good' ? 'text-primary' : item.rating === 'Poor' ? 'text-error' : 'text-secondary'
                }`}>
                  {item.rating} Quality
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryView
