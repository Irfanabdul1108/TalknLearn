"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendRequest, getFriendRequests } from "../lib/api"
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, CheckIcon } from "lucide-react"
import NoNotificationsFound from "../components/NoNotificationsFound"

const NotificationsPage = () => {
  const queryClient = useQueryClient()

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] })
      queryClient.invalidateQueries({ queryKey: ["friends"] })
    },
  })

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="px-4 space-y-3 text-center sm:space-y-4">
          <h1 className="text-3xl font-bold text-transparent sm:text-4xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
            Notifications
          </h1>
          <p className="text-sm text-slate-400 sm:text-base">Stay updated with your language learning connections</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8 sm:py-12">
            <div className="relative">
              <div className="w-10 h-10 border-4 rounded-full sm:w-12 sm:h-12 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Friend Requests */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4 sm:space-y-6">
                <div className="flex items-center px-2 space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg sm:rounded-xl">
                    <UserCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">Friend Requests</h2>
                  <div className="px-2 py-1 border rounded-full sm:px-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
                    <span className="text-xs font-semibold text-cyan-300 sm:text-sm">{incomingRequests.length}</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="p-4 transition-all duration-300 border group bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-6 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30"
                    >
                      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center flex-1 min-w-0 space-x-3 sm:space-x-4">
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
                              <img
                                src={request.sender.profilePic || "/placeholder.svg"}
                                alt={request.sender.fullName}
                                className="object-cover w-full h-full rounded-full"
                              />
                            </div>
                            <div className="absolute w-4 h-4 border-2 rounded-full -bottom-1 -right-1 sm:w-5 sm:h-5 bg-emerald-500 border-slate-900"></div>
                          </div>
                          <div className="flex-1 min-w-0 space-y-2">
                            <h3 className="text-base font-bold text-white truncate sm:text-lg">
                              {request.sender.fullName}
                            </h3>
                            <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
                              <span className="px-2 py-1 text-xs font-medium border rounded-full sm:px-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="px-2 py-1 text-xs font-medium text-purple-300 border rounded-full sm:px-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/25 text-sm sm:text-base w-full sm:w-auto"
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-3 h-3 border-2 rounded-full sm:w-4 sm:h-4 border-white/30 border-t-white animate-spin"></div>
                              <span>Accepting...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Accept</span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Requests */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4 sm:space-y-6">
                <div className="flex items-center px-2 space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg sm:rounded-xl">
                    <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">New Connections</h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="p-4 border bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-6"
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5">
                            <img
                              src={notification.recipient.profilePic || "/placeholder.svg"}
                              alt={notification.recipient.fullName}
                              className="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div className="absolute w-3 h-3 border-2 rounded-full -bottom-1 -right-1 sm:w-4 sm:h-4 bg-emerald-500 border-slate-900"></div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <h3 className="text-sm font-bold text-white truncate sm:text-base">
                            {notification.recipient.fullName}
                          </h3>
                          <p className="text-sm text-slate-300">
                            {notification.recipient.fullName} accepted your friend request
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-slate-400 sm:text-sm">
                            <ClockIcon className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Recently</span>
                          </div>
                        </div>
                        <div className="flex items-center flex-shrink-0 px-2 py-1 space-x-1 border rounded-full sm:px-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 sm:space-x-2">
                          <MessageSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-300">New Friend</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No notifications */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && <NoNotificationsFound />}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
