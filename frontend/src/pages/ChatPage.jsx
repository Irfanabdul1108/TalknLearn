"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { useQuery } from "@tanstack/react-query"
import { getStreamToken } from "../lib/api"
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react"
import { StreamChat } from "stream-chat"
import toast from "react-hot-toast"
import ChatLoader from "../components/ChatLoader"
import CallButton from "../components/CallButton"

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
  const { id: targetUserId } = useParams()
  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)
  const { authUser } = useAuthUser()

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  })

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return

      try {
        console.log("Initializing stream chat client...")
        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token,
        )

        const channelId = [authUser._id, targetUserId].sort().join("-")
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        })

        await currChannel.watch()
        setChatClient(client)
        setChannel(currChannel)
      } catch (error) {
        console.error("Error initializing chat:", error)
        toast.error("Could not connect to chat. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    initChat()
  }, [tokenData, authUser, targetUserId])

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`
      channel.sendMessage({
        text: `🎥 I've started a video call. Join me here: ${callUrl}`,
      })
      toast.success("Video call link sent successfully!")
    }
  }

  if (loading || !chatClient || !channel) return <ChatLoader />

  return (
    <div className="h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.1),rgba(0,0,0,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),rgba(0,0,0,0))]"></div>

      <div className="relative z-10 h-full">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <div className="relative w-full h-full">
              <CallButton handleVideoCall={handleVideoCall} />
              <div className="h-full pt-16 overflow-hidden border rounded-none shadow-2xl sm:pt-20 bg-slate-900/30 backdrop-blur-xl border-slate-700/50 sm:rounded-2xl sm:m-2">
                <Window>
                  <div className="border-b bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                    <ChannelHeader />
                  </div>
                  <div className="flex-1 min-h-0 bg-slate-900/20 backdrop-blur-xl">
                    <MessageList />
                  </div>
                  <div className="border-t bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                    <MessageInput focus />
                  </div>
                </Window>
              </div>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  )
}

export default ChatPage
