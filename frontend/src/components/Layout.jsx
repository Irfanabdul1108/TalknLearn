import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex">
        {showSidebar && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar showSidebar={showSidebar} />
          <main className="relative flex-1 overflow-y-auto">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),rgba(0,0,0,0))]"></div>
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
