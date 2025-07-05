"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from "../lib/api"
import { Link } from "react-router"
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, SparklesIcon } from "lucide-react"
import { capitialize } from "../lib/utils"
import FriendCard, { getLanguageFlag } from "../components/FriendCard"
import NoFriendsFound from "../components/NoFriendsFound"

const HomePage = () => {
  const queryClient = useQueryClient()
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set())

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  })

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  })

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  })

  useEffect(() => {
    const outgoingIds = new Set()
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id)
      })
      setOutgoingRequestsIds(outgoingIds)
    }
  }, [outgoingFriendReqs])

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto space-y-8 max-w-7xl sm:space-y-10 lg:space-y-12">
        {/* Header section */}
        <div className="px-4 space-y-3 text-center sm:space-y-4">
          <h1 className="text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
            Welcome to TalknLearn
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
            Connect with language partners worldwide and accelerate your learning journey
          </p>
        </div>

        {/* Friends section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 px-2 sm:flex-row sm:items-center">
            <div className="space-y-2">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl sm:gap-3">
                <UsersIcon className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                <span>Your Language Partners</span>
              </h2>
              <p className="text-sm text-slate-400 sm:text-base">
                Connect and practice with your language exchange partners
              </p>
            </div>
            <Link
              to="/notifications"
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
            >
              <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Friend Requests</span>
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex justify-center py-8 sm:py-12">
              <div className="relative">
                <div className="w-10 h-10 border-4 rounded-full sm:w-12 sm:h-12 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md"></div>
              </div>
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </section>

        {/* Recommended users section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="px-2 space-y-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl sm:gap-3">
              <SparklesIcon className="flex-shrink-0 w-6 h-6 text-purple-400 sm:w-8 sm:h-8" />
              <span>Discover New Partners</span>
            </h2>
            <p className="text-sm text-slate-400 sm:text-base">
              Perfect language exchange matches based on your learning goals
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-8 sm:py-12">
              <div className="relative">
                <div className="w-10 h-10 border-4 rounded-full sm:w-12 sm:h-12 border-purple-500/30 border-t-purple-500 animate-spin"></div>
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md"></div>
              </div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="relative p-6 overflow-hidden text-center border bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 sm:mb-6">
                  <SparklesIcon className="w-8 h-8 text-purple-400 sm:w-10 sm:h-10" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white sm:text-xl sm:mb-3">No recommendations available</h3>
                <p className="text-sm text-slate-400 sm:text-base">Check back later for new language partners!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id)
                return (
                  <div
                    key={user._id}
                    className="relative p-4 overflow-hidden transition-all duration-300 border group bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-6 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-br from-purple-500/0 via-transparent to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5"></div>

                    <div className="relative z-10 space-y-3 sm:space-y-4">
                      {/* User info */}
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-0.5">
                            <img
                              src={user.profilePic || "/placeholder.svg"}
                              alt={user.fullName}
                              className="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div className="absolute w-4 h-4 border-2 rounded-full -bottom-1 -right-1 sm:w-5 sm:h-5 bg-emerald-500 border-slate-900"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white truncate sm:text-lg">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center mt-1 text-xs text-slate-400 sm:text-sm">
                              <MapPinIcon className="flex-shrink-0 w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                              <span className="truncate">{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Language badges */}
                      <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
                        <div className="flex items-center px-2 py-1 border rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 sm:px-3">
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="ml-1 text-xs font-medium truncate text-emerald-300">
                            <span className="hidden sm:inline">Native: </span>
                            {capitialize(user.nativeLanguage)}
                          </span>
                        </div>
                        <div className="flex items-center px-2 py-1 border rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 sm:px-3">
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="ml-1 text-xs font-medium text-purple-300 truncate">
                            <span className="hidden sm:inline">Learning: </span>
                            {capitialize(user.learningLanguage)}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      {user.bio && (
                        <p className="text-xs leading-relaxed text-slate-400 sm:text-sm line-clamp-3">{user.bio}</p>
                      )}

                      {/* Action button */}
                      <button
                        className={`w-full py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                          hasRequestBeenSent
                            ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Request Sent</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Send Friend Request</span>
                            <span className="sm:hidden">Send Request</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage
