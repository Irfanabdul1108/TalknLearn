import { LoaderIcon } from "lucide-react"
import { useThemeStore } from "../store/useThemeStore"

const PageLoader = () => {
  const { theme } = useThemeStore()

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      data-theme={theme}
    >
      <div className="relative w-full max-w-sm">
        {/* Animated background */}
        <div className="absolute inset-0 -m-8 sm:-m-12">
          <div className="w-32 h-32 rounded-full sm:w-48 sm:h-48 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse"></div>
        </div>

        {/* Loader content */}
        <div className="relative p-8 border shadow-2xl bg-slate-900/80 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-12">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="relative">
              <LoaderIcon className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 animate-spin" />
              <div className="absolute inset-0 w-12 h-12 border-2 rounded-full sm:w-16 sm:h-16 border-cyan-500/20 animate-ping"></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white sm:text-xl">Loading TalknLearn</h3>
              <p className="mt-2 text-sm text-slate-400">Preparing your experience...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
