import { useState, useEffect, useCallback, useRef, type SVGProps } from 'react'
import { fetchLaunches, stopRecording, deleteLaunch, updateLaunch, type Launch } from '../services/api'
import EditLaunchModal from './EditLaunchModal'
import DeleteConfirmModal from './DeleteConfirmModal'

type IconProps = SVGProps<SVGSVGElement>

const EditIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/>
  </svg>
)

const BinIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/>
  </svg>
)

interface SidebarProps {
  onLaunchSelect?: (launchId: number) => void
  launchOpen: number
  onLaunchDeleted?: (deletedLaunchId: number) => void
  isOpen?: boolean
  onClose?: () => void
}

function Sidebar({ onLaunchSelect, launchOpen, onLaunchDeleted, isOpen = true, onClose }: SidebarProps) {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingLaunchId, setEditingLaunchId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingLaunchId, setDeletingLaunchId] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const loadLaunches = useCallback(async () => {
    try {
      setError(null)
      const data = await fetchLaunches()
      setLaunches(data)
    } catch (err) {
      console.error('Failed to load launches:', err)
      setError('Failed to load launches')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLaunches()
  }, [loadLaunches])

  useEffect(() => {
    const interval = setInterval(loadLaunches, 5000)
    return () => clearInterval(interval)
  }, [loadLaunches])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLaunch = launches.find(l => l.id === launchOpen)
  const isLive = currentLaunch?.live ?? false

  const handleStop = async () => {
    if (!launchOpen) return
    try {
      await stopRecording(launchOpen)
      loadLaunches()
    } catch (err) {
      console.error('Failed to stop recording:', err)
    }
  }

  const handleLaunchClick = (launch: Launch) => {
    if (onLaunchSelect) {
      onLaunchSelect(launch.id)
    }
  }

  const handleMenuClick = (e: React.MouseEvent, launchId: number) => {
    e.stopPropagation()
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setMenuPosition({ x: rect.right + 8, y: rect.top })
    setMenuOpen(launchId)
  }

  const handleDeleteClick = () => {
    if (!menuOpen) return
    setDeletingLaunchId(menuOpen)
    setDeleteModalOpen(true)
    setMenuOpen(null)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingLaunchId) return
    try {
      await deleteLaunch(deletingLaunchId)
      setDeleteModalOpen(false)
      setDeletingLaunchId(null)
      if (onLaunchDeleted) {
        onLaunchDeleted(deletingLaunchId)
      }
      loadLaunches()
    } catch (err) {
      console.error('Failed to delete launch:', err)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setDeletingLaunchId(null)
  }

  const handleEditClick = () => {
    if (!menuOpen) return
    setEditingLaunchId(menuOpen)
    setEditModalOpen(true)
    setMenuOpen(null)
  }

  const handleEditConfirm = (newName: string) => {
    if (!editingLaunchId) return
    updateLaunch(editingLaunchId, newName)
      .then(() => {
        setEditModalOpen(false)
        setEditingLaunchId(null)
        loadLaunches()
      })
      .catch(err => console.error('Failed to update launch:', err))
  }

  const handleEditCancel = () => {
    setEditModalOpen(false)
    setEditingLaunchId(null)
  }

  const editingLaunch = launches.find(l => l.id === editingLaunchId)

  return (
    <>
      <div className={`
        min-h-screen max-h-screen 
        w-64 max-w-64 
        flex flex-col justify-between 
        border-r border-zinc-800 px-4 bg-zinc-950 pb-8
        fixed lg:relative inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between pt-4 lg:hidden">
          <h1 className="text-xl font-bold">CanSat</h1>
          <button onClick={onClose} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className={isOpen ? 'block' : 'hidden lg:block'}>
          <div className="w-full py-8 flex justify-center items-center mb-4">
            <h1 className="text-2xl font-bold">CanSat</h1>
          </div>

          <h1 className="text-lg font-bold ml-2 mb-4 text-gray-400">Launches</h1>

          {loading ? (
            <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 text-sm">{error}</div>
          ) : launches.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">No Launches</div>
          ) : (
            launches.map((launch) => (
              <button
                key={launch.id}
                className={`w-full py-2 px-4 rounded-xl flex justify-between items-center mt-4 cursor-pointer ${launchOpen === launch.id ? 'bg-zinc-800' : 'bg-zinc-950'} ${launchOpen === launch.id ? null : 'hover:bg-zinc-900'}`}
                onClick={() => handleLaunchClick(launch)}
              >
                <h1 className="font-semibold text-base max-w-5/6 truncate">{launch.name}</h1>
                <span 
                  className="font-extrabold cursor-pointer text-gray-400 hover:text-gray-200"
                  onClick={(e) => handleMenuClick(e, launch.id)}
                >
                  :
                </span>
              </button>
            ))
          )}
        </div>

        {launchOpen > 0 && (
          <div className="space-y-2">
            {isLive && (
              <button
                className="w-full bg-red-900 hover:bg-red-800 rounded-xl p-2 cursor-pointer font-bold text-red-200"
                onClick={handleStop}
              >
                STOP
              </button>
            )}
          </div>
        )}
      </div>

      {menuOpen !== null && (
        <div 
          ref={menuRef}
          className="fixed bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg p-1 z-50"
          style={{ left: menuPosition.x, top: menuPosition.y }}
        >
          <button
            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-zinc-700 rounded-xl font-bold cursor-pointer flex items-center gap-2"
            onClick={handleEditClick}
          >
            <EditIcon className="w-4 h-4" />
            Edit
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-700 rounded-xl font-bold cursor-pointer flex items-center gap-2"
            onClick={handleDeleteClick}
          >
            <BinIcon className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}

      <EditLaunchModal
        isOpen={editModalOpen}
        currentName={editingLaunch?.name || ''}
        onCancel={handleEditCancel}
        onConfirm={handleEditConfirm}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        launchName={launches.find(l => l.id === deletingLaunchId)?.name || ''}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default Sidebar
