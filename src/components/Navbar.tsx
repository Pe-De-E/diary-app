import { useState } from 'react'
import AddEntryModal from './AddEntryModal'

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <nav className="navbar sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6">
        <div className="flex-1">
          <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Diary App</span>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm"
            onClick={() => setModalOpen(true)}
          >
            + Add Entry
          </button>
        </div>
      </nav>

      {modalOpen && <AddEntryModal onClose={() => setModalOpen(false)} />}
    </>
  )
}

export default Navbar
