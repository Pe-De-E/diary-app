import { useState } from 'react'
import AddEntryModal from './AddEntryModal'

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <nav className="navbar bg-base-100 shadow-sm px-4">
        <div className="flex-1">
          <span className="text-xl font-bold">Diary App</span>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
            Add Entry
          </button>
        </div>
      </nav>

      {modalOpen && <AddEntryModal onClose={() => setModalOpen(false)} />}
    </>
  )
}

export default Navbar
