const NoFriendsFound = () => {
  return (
    <div className="relative p-6 overflow-hidden text-center border bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 sm:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-600">
            <span className="text-xl sm:text-2xl">👥</span>
          </div>
        </div>

        <h3 className="mb-2 text-lg font-bold text-white sm:text-xl sm:mb-3">No friends yet</h3>
        <p className="max-w-md mx-auto text-sm leading-relaxed text-slate-400 sm:text-base">
          Start your language journey by connecting with amazing language partners below. Practice together and make
          lasting friendships!
        </p>
      </div>
    </div>
  )
}

export default NoFriendsFound
