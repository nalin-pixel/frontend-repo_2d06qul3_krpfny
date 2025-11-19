import { useState } from 'react'
import Header from './components/Header'
import Inventory from './components/Inventory'
import ItemForm from './components/ItemForm'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onAddClick={() => setOpen(true)} onTestClick={() => window.location.assign('/test')} />
      <main className="py-6">
        <Inventory />
      </main>
      {open && (
        <ItemForm onClose={() => setOpen(false)} onCreated={() => {
          setOpen(false)
          // Soft reload to refresh inventory list
          window.location.reload()
        }} />
      )}
    </div>
  )
}

export default App
