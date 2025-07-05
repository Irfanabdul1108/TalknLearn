import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, HomeIcon } from "lucide-react"
import { LiaLanguageSolid } from "react-icons/lia";

const Sidebar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    {
      path: "/",
      icon: HomeIcon,
      label: "Home",
      active: currentPath === "/",
    },
    {
      path: "/notifications",
      icon: BellIcon,
      label: "Notifications",
      active: currentPath === "/notifications",
    },
  ]

  return (
    <aside className="sticky top-0 flex flex-col w-64 h-screen border-r xl:w-72 bg-slate-900/95 backdrop-blur-xl border-slate-700/50">
      {/* Logo section */}
      <div className="p-4 border-b xl:p-6 border-slate-700/50">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
             <LiaLanguageSolid className="w-8 h-8 transition-colors duration-300 xl:w-10 xl:h-10 text-cyan-400 group-hover:text-cyan-300" />
            <div className="absolute inset-0 transition-all duration-300 rounded-full bg-cyan-400/20 blur-md group-hover:blur-lg"></div>
          </div>
          <span className="text-xl font-bold text-transparent xl:text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
            TalknLearn
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 xl:p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 xl:px-4 py-2.5 xl:py-3 rounded-xl transition-all duration-300 group ${
              item.active
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <item.icon
              className={`w-5 h-5 ${item.active ? "text-cyan-300" : "text-slate-400 group-hover:text-white"} transition-colors duration-300`}
            />
            <span className="text-sm font-medium xl:text-base">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User profile section */}
      <div className="p-3 border-t xl:p-4 border-slate-700/50">
        <div className="flex items-center space-x-3 p-2.5 xl:p-3 rounded-xl bg-slate-800/50">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
              <img
                src={authUser?.profilePic || "/placeholder.svg"}
                alt="User Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="absolute w-3 h-3 border-2 rounded-full -bottom-1 -right-1 xl:w-4 xl:h-4 bg-emerald-500 border-slate-900"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate xl:text-base">{authUser?.fullName}</p>
            <div className="flex items-center mt-1 space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-emerald-400 xl:text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
