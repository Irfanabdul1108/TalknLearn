"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { useQuery } from "@tanstack/react-query"
import { getStreamToken } from "../lib/api"
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import toast from "react-hot-toast"
import PageLoader from "../components/PageLoader"

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const CallPage = () => {
  const { id: callId } = useParams()
  const [client, setClient] = useState(null)
  const [call, setCall] = useState(null)
  const [isConnecting, setIsConnecting] = useState(true)
  const { authUser, isLoading } = useAuthUser()
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  })

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return

      try {
        console.log("Initializing Stream video client...")
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        })

        const callInstance = videoClient.call("default", callId)
        await callInstance.join({ create: true })
        console.log("Joined call successfully")

        setClient(videoClient)
        setCall(callInstance)
      } catch (error) {
        console.error("Error joining call:", error)
        toast.error("Could not join the call. Please try again.")
      } finally {
        setIsConnecting(false)
      }
    }

    initCall()
  }, [tokenData, authUser, callId])

  if (isLoading || isConnecting) return <PageLoader />

  return (
    <div className="relative flex flex-col items-center justify-center h-screen p-2 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 sm:p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.1),rgba(0,0,0,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),rgba(0,0,0,0))]"></div>

      <div className="relative z-10 w-full h-full mx-auto max-w-7xl">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <div className="w-full h-full overflow-hidden border rounded-lg shadow-2xl bg-slate-900/50 backdrop-blur-xl border-slate-700/50 sm:rounded-2xl">
                <CallContent />
              </div>
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-md p-6 mx-auto text-center border bg-slate-900/80 backdrop-blur-xl border-slate-700/50 rounded-xl sm:rounded-2xl sm:p-8">
              <p className="text-base text-white sm:text-lg">
                Could not initialize call. Please refresh or try again later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  const navigate = useNavigate()

  if (callingState === CallingState.LEFT) return navigate("/")

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <StreamTheme>
          <SpeakerLayout />
        </StreamTheme>
      </div>
      <div className="p-2 border-t sm:p-4 bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
        <StreamTheme>
          <CallControls />
        </StreamTheme>
      </div>
    </div>
  )
}

export default CallPage
