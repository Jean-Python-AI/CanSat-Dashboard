interface DeleteConfirmModalProps {
  isOpen: boolean
  launchName: string
  onCancel: () => void
  onConfirm: () => void
}

function DeleteConfirmModal({ isOpen, launchName, onCancel, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-zinc-800 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-2">Delete Launch</h2>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete <span className="text-white font-semibold">{launchName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-zinc-700 text-white hover:bg-zinc-600 transition-colors font-medium cursor-pointer font-bold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-700 text-white hover:bg-red-600 transition-colors font-medium cursor-pointer font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
