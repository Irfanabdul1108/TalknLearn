import { Link } from "react-router"
import { LANGUAGE_TO_FLAG } from "../constants"

const FriendCard = ({ friend }) => {
  return (
    <div className="relative p-4 overflow-hidden transition-all duration-300 border group bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-6 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 hover:-translate-y-1">
      {/* Gradient overlay */}
      <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5"></div>

      <div className="relative z-10">
        {/* User Info */}
        <div className="flex items-center mb-3 space-x-3 sm:space-x-4 sm:mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
              <img
                src={friend.profilePic || "/placeholder.svg"}
                alt={friend.fullName}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="absolute w-3 h-3 border-2 rounded-full -bottom-1 -right-1 sm:w-4 sm:h-4 bg-emerald-500 border-slate-900"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white truncate sm:text-lg">{friend.fullName}</h3>
            <p className="text-xs text-slate-400 sm:text-sm">Online now</p>
          </div>
        </div>

        {/* Language badges */}
        <div className="flex flex-col flex-wrap gap-2 mb-4 sm:flex-row sm:mb-6">
          <div className="flex items-center px-2 py-1 border rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 sm:px-3">
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="ml-1 text-xs font-medium text-emerald-300">
              <span className="hidden sm:inline">Native: </span>
              {friend.nativeLanguage}
            </span>
          </div>
          <div className="flex items-center px-2 py-1 border rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 sm:px-3">
            {getLanguageFlag(friend.learningLanguage)}
            <span className="ml-1 text-xs font-medium text-purple-300">
              <span className="hidden sm:inline">Learning: </span>
              {friend.learningLanguage}
            </span>
          </div>
        </div>

        {/* Message button */}
        <Link
          to={`/chat/${friend._id}`}
          className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-300 text-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 text-sm sm:text-base"
        >
          Start Conversation
        </Link>
      </div>
    </div>
  )
}

export default FriendCard

export function getLanguageFlag(language) {
  if (!language) return null
  const langLower = language.toLowerCase()
  const countryCode = LANGUAGE_TO_FLAG[langLower]
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="flex-shrink-0 w-3 h-2 rounded-sm sm:w-4 sm:h-3"
      />
    )
  }
  return null
}
