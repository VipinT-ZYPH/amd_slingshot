import React from 'react'

const AnalyzeButton = ({ onClick, loading }) => {
  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-base tracking-wide px-12 py-5 rounded-xl btn-premium disabled:opacity-50 disabled:scale-100"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Analyzing
        </span>
      ) : 'Analyze'}
    </button>
  )
}

export default AnalyzeButton
