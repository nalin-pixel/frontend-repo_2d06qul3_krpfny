import { useState } from 'react'

export default function ItemForm({ onClose, onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const [form, setForm] = useState({
    name: '',
    category: '',
    size: '',
    color: '',
    quantity: 0,
    sku: '',
    brand: '',
    price: '',
    location: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'quantity' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = { ...form, price: form.price === '' ? null : Number(form.price) }
      const res = await fetch(`${baseUrl}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      onCreated?.(data.id)
      onClose?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Add Clothing Item</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Category</label>
            <input name="category" value={form.category} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Size</label>
            <input name="size" value={form.size} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Color</label>
            <input name="color" value={form.color} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Quantity</label>
            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="w-full border rounded-md px-3 py-2" min={0} />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">SKU</label>
            <input name="sku" value={form.sku} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Brand</label>
            <input name="brand" value={form.brand} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Price</label>
            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border rounded-md px-3 py-2" rows={3} />
          </div>

          {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}

          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
            <button disabled={loading} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
              {loading ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
