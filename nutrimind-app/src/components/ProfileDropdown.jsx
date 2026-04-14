import React from 'react'

const ProfileDropdown = ({ onReset, onClose }) => {
  return (
    <div className="absolute right-0 top-14 w-64 glass-card p-4 rounded-2xl border border-white/10 shadow-2xl z-[60] animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center gap-4 p-2 mb-4 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-on-surface">Alex Rivera</h4>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Premium Member</p>
        </div>
      </div>

      <div className="space-y-1">
        <button 
          onClick={() => { onReset(); onClose(); }}
          className="w-full text-left px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3 group"
        >
          <span className="material-symbols-outlined text-error/60 group-hover:text-error transition-colors">restart_alt</span>
          Reset Data
        </button>
        <button 
          className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3 cursor-not-allowed"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileDropdown
