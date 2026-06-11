import { Droplets } from 'lucide-react'

export default function Navbar({
  currentPage,
  onNavigate,
  onStartAssessment,
}) {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-cyan-500 p-2 rounded-xl">
          <Droplets size={24} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-cyan-400">
            Smart Water Locator
          </h1>
          <p className="text-xs text-slate-400">
            AI Groundwater Assessment
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onNavigate('landing')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          Home
        </button>

        <button
          onClick={onStartAssessment}
          className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400"
        >
          Start Assessment
        </button>
      </div>
    </nav>
  )
}
