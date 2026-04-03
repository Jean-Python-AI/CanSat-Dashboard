import { useState } from 'react'
import Sidebar from './features/Sidebar'
import Dashboard from './features/Dashboard'

function App() {
  const [launch, setLaunch] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLaunchSelect = (launchId: number) => {
    setLaunch(launchId)
    setSidebarOpen(false)
  }

  const handleLaunchDeleted = (deletedLaunchId: number) => {
    if (launch === deletedLaunchId) {
      setLaunch(null)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen flex relative z-10 text-slate-100 overflow-hidden font-body bg-zinc-900">
      <Sidebar 
        onLaunchSelect={handleLaunchSelect} 
        launchOpen={launch ?? 0}
        onLaunchDeleted={handleLaunchDeleted}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-y-auto w-full h-screen">
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-zinc-800 rounded-lg border border-zinc-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {launch ? (
          <Dashboard launchID={launch} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 p-8 text-center">
            <h1 className="text-xl">Select a launch from the sidebar</h1>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
