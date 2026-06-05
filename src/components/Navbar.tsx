import { useState } from 'react'

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

      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">New Entry</h3>
            <p className="py-4">Form coming soon...</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setModalOpen(false)} />
        </dialog>
      )}
    </>
  )
}

export default Navbar
