"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, LogOutIcon, MenuIcon, XIcon, HomeIcon } from "lucide-react"
// import ThemeSelector from "./ThemeSelector"
import useLogout from "../hooks/useLogout"
import { LiaLanguageSolid } from "react-icons/lia";
const Navbar = ({ showSidebar = false }) => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const isChatPage = location.pathname?.startsWith("/chat")
  const { logoutMutation } = useLogout()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      path: "/",
      icon: HomeIcon,
      label: "Home",
      active: location.pathname === "/",
    },
    {
      path: "/notifications",
      icon: BellIcon,
      label: "Notifications",
      active: location.pathname === "/notifications",
    },
  ]

  return (
    <>
      <nav className="sticky top-0 z-40 border-b bg-slate-900/95 backdrop-blur-xl border-slate-700/50 h-14 sm:h-16">
        <div className="container h-full px-3 mx-auto sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Left side */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Mobile menu button - only show when sidebar should be visible */}
              {showSidebar && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 transition-all duration-300 rounded-lg lg:hidden bg-slate-800/50 hover:bg-slate-700/50"
                >
                  {mobileMenuOpen ? (
                    <XIcon className="w-5 h-5 text-slate-400" />
                  ) : (
                    <MenuIcon className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              )}

              {/* Logo - always show or only in chat page */}
              {(isChatPage || !showSidebar) && (
                <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
                  <div className="relative">
                    <LiaLanguageSolid className="w-6 h-6 transition-colors duration-300 sm:w-8 sm:h-8 text-cyan-400 group-hover:text-cyan-300" />
                    <div className="absolute inset-0 transition-all duration-300 rounded-full bg-cyan-400/20 blur-md group-hover:blur-lg"></div>
                  </div>
                  <span className="text-xl font-bold text-transparent sm:text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                    TalknLearn
                  </span>
                </Link>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              {/* Desktop navigation - only show when sidebar is not visible */}
              {!showSidebar && (
                <div className="items-center hidden space-x-2 sm:flex">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        item.active
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="hidden text-sm font-medium md:inline">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Notifications - mobile friendly */}
              {showSidebar && (
                <Link to="/notifications" className="relative group">
                  <div className="p-2 transition-all duration-300 rounded-lg sm:rounded-xl bg-slate-800/50 hover:bg-slate-700/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                    <BellIcon className="w-4 h-4 transition-colors duration-300 sm:w-5 sm:h-5 text-slate-400 group-hover:text-cyan-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-slate-900"></div>
                </Link>
              )}

              {/* User avatar */}
              <div className="relative group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                  <img
                    src={authUser?.profilePic || "/placeholder.svg"}
                    alt="User Avatar"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
              </div>

              {/* Logout button */}
              <button
                onClick={logoutMutation}
                className="p-2 transition-all duration-300 rounded-lg sm:rounded-xl bg-slate-800/50 hover:bg-red-500/20 group hover:shadow-lg hover:shadow-red-500/20"
              >
                <LogOutIcon className="w-4 h-4 transition-colors duration-300 sm:w-5 sm:h-5 text-slate-400 group-hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {showSidebar && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="fixed top-0 left-0 h-full transition-transform duration-300 transform border-r w-72 bg-slate-900/95 backdrop-blur-xl border-slate-700/50">
            <MobileSidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

// Mobile Sidebar Component
const MobileSidebar = ({ onClose }) => {
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <Link to="/" className="flex items-center space-x-3 group" onClick={onClose}>
          <div className="relative">
            <LiaLanguageSolid className="w-8 h-8 transition-colors duration-300 text-cyan-400 group-hover:text-cyan-300" />
            <div className="absolute inset-0 transition-all duration-300 rounded-full bg-cyan-400/20 blur-md group-hover:blur-lg"></div>
          </div>
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
            TalknLearn
          </span>
        </Link>
        <button onClick={onClose} className="p-2 transition-colors duration-300 rounded-lg hover:bg-slate-800/50">
          <XIcon className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              item.active
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <item.icon
              className={`w-5 h-5 ${item.active ? "text-cyan-300" : "text-slate-400 group-hover:text-white"} transition-colors duration-300`}
            />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User profile section */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center p-3 space-x-3 rounded-xl bg-slate-800/50">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
              <img
                src={authUser?.profilePic || "/placeholder.svg"}
                alt="User Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="absolute w-3 h-3 border-2 rounded-full -bottom-1 -right-1 bg-emerald-500 border-slate-900"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{authUser?.fullName}</p>
            <div className="flex items-center mt-1 space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-emerald-400">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
