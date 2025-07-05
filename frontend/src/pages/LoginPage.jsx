"use client"

import { useState } from "react"
import {  EyeIcon, EyeOffIcon } from "lucide-react"
import { Link } from "react-router"
import useLogin from "../hooks/useLogin"
import { LiaLanguageSolid } from "react-icons/lia";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const { isPending, error, loginMutation } = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation(loginData)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.1),rgba(0,0,0,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),rgba(0,0,0,0))]"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="overflow-hidden border shadow-2xl bg-slate-900/80 backdrop-blur-xl border-slate-700/50 rounded-2xl sm:rounded-3xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Form */}
            <div className="w-full p-6 lg:w-1/2 sm:p-8 lg:p-12">
              {/* Logo */}
              <div className="flex items-center mb-6 space-x-2 sm:mb-8 sm:space-x-3">
                <div className="relative">
                  <LiaLanguageSolid className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md"></div>
                </div>
                <span className="text-2xl font-bold text-transparent sm:text-3xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                  TalknLearn
                </span>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 mb-4 border rounded-lg sm:mb-6 sm:p-4 bg-red-500/10 border-red-500/30 sm:rounded-xl">
                  <p className="text-sm text-red-400">{error.response?.data?.message || "Login failed"}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">Welcome Back</h2>
                  <p className="text-sm text-slate-400 sm:text-base">
                    Sign in to continue your language learning journey
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">Email Address</label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm sm:text-base"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm sm:text-base pr-10 sm:pr-12"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute transition-colors duration-300 -translate-y-1/2 right-3 top-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 rounded-full sm:w-5 sm:h-5 border-white/30 border-t-white animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Sign up link */}
                  <div className="text-center">
                    <p className="text-sm text-slate-400 sm:text-base">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="font-semibold transition-colors duration-300 text-cyan-400 hover:text-cyan-300"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Right side - Illustration */}
            <div className="items-center justify-center hidden w-full p-8 lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 lg:p-12">
              <div className="space-y-6 text-center lg:space-y-8">
                <div className="relative max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl lg:rounded-3xl blur-3xl"></div>
                  <img
                    src="/i.png"
                    alt="Language connection illustration"
                    className="relative z-10 w-full h-auto rounded-xl lg:rounded-2xl"
                  />
                </div>
                <div className="space-y-3 lg:space-y-4">
                  <h2 className="text-xl font-bold text-white lg:text-2xl">Connect with language partners worldwide</h2>
                  <p className="text-sm leading-relaxed text-slate-400 lg:text-base">
                    Practice conversations, make friends, and improve your language skills with native speakers from
                    around the globe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
