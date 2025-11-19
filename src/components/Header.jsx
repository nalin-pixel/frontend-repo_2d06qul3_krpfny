import { Shirt, PlusCircle, Database } from 'lucide-react'

export default function Header({ onAddClick, onTestClick }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Cloth Manager</h1>
            <p className="text-xs text-slate-500">Track inventory, sizes, and colors</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onTestClick} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
            <Database className="w-4 h-4" /> Test Backend
          </button>
          <button onClick={onAddClick} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            <PlusCircle className="w-4 h-4" /> New Item
          </button>
        </div>
      </div>
    </header>
  )
}
