"use client"

import { VideoIcon } from "lucide-react"

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 border-b bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-slate-700/50">
      <div className="flex items-center justify-between px-3 py-3 mx-auto max-w-7xl sm:px-4 md:px-6 sm:py-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-300 sm:text-sm">Video Call Active</span>
        </div>
        <button
          onClick={handleVideoCall}
          className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
        >
          <div className="flex items-center space-x-1 sm:space-x-2">
            <VideoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Start Video Call</span>
            <span className="sm:hidden">Call</span>
          </div>
          <div className="absolute inset-0 transition-transform duration-700 transform -translate-x-full -skew-x-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full"></div>
        </button>
      </div>
    </div>
  )
}

export default CallButton
