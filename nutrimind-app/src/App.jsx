import React, { useState, useEffect } from 'react'
import InputBox from './components/InputBox'
import AnalyzeButton from './components/AnalyzeButton'
import ResultCard from './components/ResultCard'
import InsightPanel from './components/InsightPanel'
import HistoryView from './components/HistoryView'
import InsightsView from './components/InsightsView'
import ProfileDropdown from './components/ProfileDropdown'
import { analyzeFood } from './services/insightAgent'

const App = () => {
  const [view, setView] = useState('dashboard') // 'dashboard' | 'history' | 'insights'
  const [input, setInput] = useState('')
  const [quantity, setQuantity] = useState('1 plate')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [history, setHistory] = useState([
    { id: 1, food: "Grilled Chicken Salad", date: "Today, 1:20 PM", calories: 340, rating: "Good" },
    { id: 2, food: "Double Cheeseburger", date: "Yesterday, 8:45 PM", calories: 890, rating: "Poor" },
    { id: 3, food: "Avocado Toast", date: "Yesterday, 9:15 AM", calories: 420, rating: "Moderate" },
    { id: 4, food: "Quinoa Bowl", date: "Oct 12, 1:05 PM", calories: 510, rating: "Good" },
  ])

  const defaultMacros = { protein: 30, carbs: 45, fats: 25 }

  const handleAnalyze = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    try {
      const data = await analyzeFood(input, quantity)
      setResults(data)

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        food: input,
        date: "Just now",
        calories: data.calories,
        rating: data.rating
      }
      setHistory(prev => [newHistoryItem, ...prev])
    } catch (error) {
      console.error("Analysis failed", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResults(null)
    setInput('')
    setQuantity('1 plate')
    setHistory([])
    setView('dashboard')
  }

  const renderView = () => {
    switch(view) {
      case 'history':
        return <HistoryView history={history} />
      case 'insights':
        return <InsightsView />
      default:
        return (
          <div className="space-y-20">
            {/* Input Section */}
            <section className="max-w-3xl mx-auto mb-36">
              <div className="glass-card p-2 rounded-2xl inner-glow-top flex flex-col md:flex-row gap-2 input-glow">
                <InputBox 
                  value={input} 
                  onChange={setInput} 
                  quantity={quantity} 
                  onQuantityChange={setQuantity}
                />
                <AnalyzeButton onClick={handleAnalyze} loading={loading} />
              </div>
            </section>

            {/* Results Area */}
            {(results || loading) && (
              <div className="space-y-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {loading ? (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="glass-card p-8 rounded-3xl h-64 animate-pulse bg-white/5"></div>
                      ))}
                    </>
                  ) : (
                    <>
                      <ResultCard 
                        title="Calories" 
                        value={results.calories} 
                        unit="kcal" 
                        icon="local_fire_department" 
                        subtext="Biometric calorie mapping based on density and quantity."
                      />
                      <ResultCard 
                        title="Health Rating" 
                        value={results.rating} 
                        icon="verified" 
                        subtext="Nutritional density ranking based on clinical standards."
                      />
                      <ResultCard 
                        title="Issues Detected" 
                        value={results.issues?.length || 0} 
                        unit="Found"
                        icon="report_problem" 
                        subtext={results.issues?.[0] || "No critical metabolic issues detected."}
                      />
                      <ResultCard 
                        title="Suggestions" 
                        value={results.suggestions?.length || 0} 
                        unit="Ways"
                        icon="tips_and_updates" 
                        subtext="Actionable optimizations for your profile."
                      />
                    </>
                  )}
                </div>

                <InsightPanel 
                  insights={results ? { 
                    summary: results.reasoning || `Your analysis for ${quantity} of "${input}" is complete.`,
                    suggestions: results.suggestions,
                    smartSwap: results.smartSwap
                  } : null} 
                  loading={loading} 
                />

                {/* Chart Section */}
                {!loading && (
                  <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                    <div className="lg:col-span-2 glass-card p-10 rounded-3xl inner-glow-top h-[480px] flex flex-col">
                      <div className="flex justify-between items-center mb-16">
                        <h3 className="text-xl font-bold tracking-tight">Nutritional balance</h3>
                        <div className="flex gap-8">
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/40"></span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Proteins</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm shadow-secondary/40"></span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Carbs</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-macro-fat shadow-sm shadow-macro-fat/40"></span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fats</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow flex items-end justify-center gap-16 px-4 pb-12">
                        <div className="w-24 bg-surface-container-highest/30 rounded-t-2xl relative group h-full cursor-pointer">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-lg font-black text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                            {results?.macros?.protein || defaultMacros.protein}%
                          </div>
                          <div 
                            className="absolute bottom-0 w-full bg-primary rounded-t-2xl transition-all duration-1000 ease-out group-hover:brightness-110" 
                            style={{ height: `${results?.macros?.protein || defaultMacros.protein}%` }}
                          ></div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protein</div>
                        </div>
                        <div className="w-24 bg-surface-container-highest/30 rounded-t-2xl relative group h-full cursor-pointer">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-lg font-black text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                            {results?.macros?.carbs || defaultMacros.carbs}%
                          </div>
                          <div 
                            className="absolute bottom-0 w-full bg-secondary rounded-t-2xl transition-all duration-1000 ease-out group-hover:brightness-110" 
                            style={{ height: `${results?.macros?.carbs || defaultMacros.carbs}%` }}
                          ></div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Carbs</div>
                        </div>
                        <div className="w-24 bg-surface-container-highest/30 rounded-t-2xl relative group h-full cursor-pointer">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-lg font-black text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                            {results?.macros?.fats || defaultMacros.fats}%
                          </div>
                          <div 
                            className="absolute bottom-0 w-full bg-macro-fat rounded-t-2xl transition-all duration-1000 ease-out group-hover:brightness-110" 
                            style={{ height: `${results?.macros?.fats || defaultMacros.fats}%` }}
                          ></div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fats</div>
                        </div>
                      </div>
                    </div>
                    <div className="glass-card p-10 rounded-3xl inner-glow-top flex flex-col justify-center items-center overflow-hidden relative min-h-[480px]">
                      <div className="text-center z-10">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-4">Macro Split</div>
                        <div className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">
                          {results ? results.rating : 'Healthy'}
                        </div>
                        <div className="text-primary font-bold text-sm tracking-[0.1em]">OPTIMIZING</div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg className="w-72 h-72 -rotate-90 transform" viewBox="0 0 100 100">
                          <circle className="text-white/5" cx="50" cy="50" fill="none" r="44" stroke="currentColor" strokeWidth="7"></circle>
                          <circle 
                            className="text-primary/30 transition-all duration-1000" 
                            cx="50" cy="50" fill="none" r="44" stroke="currentColor" 
                            strokeDasharray="276" 
                            strokeDashoffset={276 - (276 * ((results?.macros?.protein || 30) / 100))} 
                            strokeLinecap="round" strokeWidth="7"
                          ></circle>
                        </svg>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body selection:bg-primary/30">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center px-8 h-16 max-w-7xl mx-auto w-full relative">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-extrabold tracking-tighter text-primary cursor-pointer" onClick={() => setView('dashboard')}>NutriMind</span>
            <div className="hidden md:flex gap-10">
              <button 
                onClick={() => setView('dashboard')}
                className={`text-sm tracking-wide transition-all duration-300 ${view === 'dashboard' ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-slate-400 font-medium hover:text-primary'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setView('history')}
                className={`text-sm tracking-wide transition-all duration-300 ${view === 'history' ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-slate-400 font-medium hover:text-primary'}`}
              >
                History
              </button>
              <button 
                onClick={() => setView('insights')}
                className={`text-sm tracking-wide transition-all duration-300 ${view === 'insights' ? 'text-primary font-semibold border-b-2 border-primary pb-1' : 'text-slate-400 font-medium hover:text-primary'}`}
              >
                Insights
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-flex px-4 py-1.5 bg-surface-container-highest/50 border border-outline-variant/30 rounded-full text-[10px] font-bold tracking-[0.15em] text-secondary uppercase">
              AI Health Assistant
            </span>
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="hover:bg-primary/10 transition-all duration-300 p-1.5 rounded-full group"
              >
                <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">
                  account_circle
                </span>
              </button>
              {showProfile && <ProfileDropdown onReset={handleReset} onClose={() => setShowProfile(false)} />}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        {view === 'dashboard' && (
          <section className="text-center mb-28 relative">
            <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] biometric-glow rounded-full -z-10 opacity-60"></div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent">
              Understand Your Food.<br />Improve Your Health.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed opacity-90 text-sharp">
              Get instant AI-powered insights on your daily meals with high-precision biometric analysis and personalized health strategy.
            </p>
          </section>
        )}

        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950/70 border-t border-white/5 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-10">
          <div className="text-2xl font-black text-primary tracking-tighter">NutriMind</div>
          <div className="flex gap-12">
            <a className="text-slate-500 hover:text-white transition-colors text-[11px] font-bold tracking-[0.2em] uppercase" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-white transition-colors text-[11px] font-bold tracking-[0.2em] uppercase" href="#">Terms of Use</a>
            <a className="text-slate-500 hover:text-white transition-colors text-[11px] font-bold tracking-[0.2em] uppercase" href="#">Support Center</a>
          </div>
          <div className="h-px w-20 bg-primary/20"></div>
          <p className="text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
            © 2026 NutriMind AI. The Digital Biome Strategy.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
