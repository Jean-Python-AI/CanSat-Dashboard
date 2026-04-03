import { useState } from 'react'

interface EditLaunchModalProps {
  isOpen: boolean
  currentName: string
  onCancel: () => void
  onConfirm: (newName: string) => void
}

function EditLaunchModal({ isOpen, currentName, onCancel, onConfirm }: EditLaunchModalProps) {
  const [name, setName] = useState(currentName)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onConfirm(name.trim())
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-zinc-800 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Edit Launch Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-zinc-400 mb-6"
            autoFocus
            maxLength={50}
          />
          <div className="flex justify-center gap-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-zinc-700 text-white hover:bg-zinc-600 transition-colors font-medium cursor-pointer font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-zinc-500 text-white hover:bg-zinc-400 transition-colors font-medium cursor-pointer font-bold"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditLaunchModal
