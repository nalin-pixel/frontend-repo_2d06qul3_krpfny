import { useEffect, useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'

export default function Inventory() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ category: '', color: '', size: '' })

  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.category) params.set('category', filters.category)
      if (filters.color) params.set('color', filters.color)
      if (filters.size) params.set('size', filters.size)
      if (query) params.set('search', query)

      const res = await fetch(`${baseUrl}/api/items?${params.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const categories = useMemo(() => Array.from(new Set(items.map(i => i.category).filter(Boolean))), [items])
  const colors = useMemo(() => Array.from(new Set(items.map(i => i.color).filter(Boolean))), [items])
  const sizes = useMemo(() => Array.from(new Set(items.map(i => i.size).filter(Boolean))), [items])

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, brand, SKU" className="w-full pl-9 pr-3 py-2 border rounded-md" />
            </div>
            <button onClick={fetchItems} className="px-3 py-2 rounded-md bg-slate-900 text-white">Search</button>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select value={filters.category} onChange={(e)=> setFilters(f=>({...f, category:e.target.value}))} className="border rounded-md px-2 py-2">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filters.color} onChange={(e)=> setFilters(f=>({...f, color:e.target.value}))} className="border rounded-md px-2 py-2">
              <option value="">All Colors</option>
              {colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filters.size} onChange={(e)=> setFilters(f=>({...f, size:e.target.value}))} className="border rounded-md px-2 py-2">
              <option value="">All Sizes</option>
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading items...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No items found. Try adjusting filters.</div>
        ) : (
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="p-4 grid grid-cols-2 md:grid-cols-6 gap-2">
                <div>
                  <div className="text-sm text-slate-500">Name</div>
                  <div className="font-medium">{item.name}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Category</div>
                  <div>{item.category}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Size</div>
                  <div>{item.size}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Color</div>
                  <div>{item.color}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Qty</div>
                  <div>{item.quantity}</div>
                </div>
                <div className="truncate">
                  <div className="text-sm text-slate-500">SKU</div>
                  <div className="truncate">{item.sku || '-'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
