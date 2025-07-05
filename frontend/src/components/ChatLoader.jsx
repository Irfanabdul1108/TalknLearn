import { LoaderIcon } from "lucide-react"

function ChatLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-sm">
        {/* Animated background circles */}
        <div className="absolute inset-0 -m-4 sm:-m-8">
          <div className="w-24 h-24 rounded-full sm:w-32 sm:h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl animate-pulse"></div>
        </div>
        <div className="relative p-6 border shadow-2xl bg-slate-900/80 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-8">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="relative">
              <LoaderIcon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 animate-spin" />
              <div className="absolute inset-0 w-10 h-10 border-2 rounded-full sm:w-12 sm:h-12 border-cyan-500/20 animate-ping"></div>
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-bold text-white sm:text-xl">Connecting to chat...</h3>
              <p className="text-sm text-slate-400">Establishing secure connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatLoader
