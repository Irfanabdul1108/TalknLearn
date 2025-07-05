"use client"

import { useState } from "react"
import useAuthUser from "../hooks/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { completeOnboarding } from "../lib/api"
import { LoaderIcon, MapPinIcon, ShuffleIcon, CameraIcon } from "lucide-react"
import { LANGUAGES } from "../constants"
import { LiaLanguageSolid } from "react-icons/lia";

const OnboardingPage = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Onboarding failed")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onboardingMutation(formState)
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormState({ ...formState, profilePic: randomAvatar })
    toast.success("Random profile picture generated!")
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(14,165,233,0.1),rgba(0,0,0,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.1),rgba(0,0,0,0))]"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="overflow-hidden border shadow-2xl bg-slate-900/80 backdrop-blur-xl border-slate-700/50 rounded-2xl sm:rounded-3xl">
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Header */}
            <div className="mb-6 space-y-3 text-center sm:space-y-4 sm:mb-8">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <LiaLanguageSolid className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" />
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md"></div>
                </div>
                <span className="text-2xl font-bold text-transparent sm:text-3xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                  TalknLearn
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Complete Your Profile</h1>
              <p className="max-w-2xl mx-auto text-sm text-slate-400 sm:text-base">
                Tell us about yourself to get the best language learning experience and connect with perfect partners
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Profile picture section */}
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 overflow-hidden border-4 rounded-full sm:w-32 sm:h-32 bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600/50">
                    {formState.profilePic ? (
                      <img
                        src={formState.profilePic || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <CameraIcon className="w-8 h-8 sm:w-12 sm:h-12 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl"></div>
                </div>

                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base"
                >
                  <ShuffleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Generate Random Avatar</span>
                  <span className="sm:hidden">Random Avatar</span>
                </button>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Location</label>
                  <div className="relative">
                    <MapPinIcon className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 sm:w-5 sm:h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm sm:text-base"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Native Language */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Native Language</label>
                  <select
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Language */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Learning Language</label>
                  <select
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Bio</label>
                <textarea
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell others about yourself and your language learning goals..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full px-6 py-3 text-sm font-bold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 sm:py-4 sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-cyan-500/25 sm:text-base"
              >
                {isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoaderIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Completing Setup...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <LiaLanguageSolid className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Complete Profile</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
