import { BellIcon } from "lucide-react"

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center sm:py-20">
      <div className="relative mb-6 sm:mb-8">
        <div className="flex items-center justify-center w-20 h-20 border rounded-full sm:w-24 sm:h-24 bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30">
          <BellIcon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-500" />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-xl"></div>
      </div>

      <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl sm:mb-4">All caught up!</h3>
      <p className="max-w-md mx-auto text-sm leading-relaxed text-slate-400 sm:text-base">
        No new notifications right now. When you receive friend requests or messages, they'll appear here for you to
        review.
      </p>
    </div>
  )
}

export default NoNotificationsFound
