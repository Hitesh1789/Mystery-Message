'use client'

import MessageCard from "@/components/MessageCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Message } from "@/model/User.model"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

function Dashboard() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
  })

  const { register, watch, setValue } = form

  const acceptMessages = watch('acceptMessages')

  const { data: session } = useSession()
  const user: User = session?.user as User


  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id.toString() !== messageId))
  }

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages || false)
    }
    catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description: axiosError.response?.data.message || "Failed to fetch accept message Status"
      })
    }
    finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])


  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setIsSwitchLoading(false);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(response.data.messages || [])
      if (refresh) {
        toast.message("Messages refreshed successfully.")
      }
    }
    catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description: axiosError.response?.data.message || "Error while fetching user messages."
      })
    }
    finally {
      setIsLoading(false)
    }
  }, [setMessages, setIsLoading])

  useEffect(() => {
    if (!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()
  }, [session, setValue, fetchMessages, fetchAcceptMessage])

  //handle switch change when user wants to change 
  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessageStatus: !acceptMessages
      })
      setValue('acceptMessages', response.data.isAcceptingMessages || false)
      toast.message("Accept Message status switched successfully.")
    }
    catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description: axiosError.response?.data.message || "Failed to switch accept message Status"
      })
    }
    finally {
      setIsSwitchLoading(false);
    }
  }


  if (!session || !session.user) {
    return (
      <div className="text-2xl p-4 text-center">Please Login</div>
    )
  }

  const { username } = session.user as User
  //generate profile Url
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.message("Profile URL Copied Successfull.y")
  }


  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6  rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            disabled
            value={profileUrl}
            className="bg-input border-t-input w-full p-2 mr-2"
          />
          <Button onClick={copyToClipBoard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages || false}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          AcceptMessages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>

      <Separator className="mb-2"/>

      <Button onClick={()=>fetchMessages(true)}>
        {
          isLoading ?
            (<Loader2 className="h-4 w-4 animate-spin" />)
            :
            (<RefreshCcw className="h-4 w-4" />)
        }
      </Button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id.toString()}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (<p> No messages yet.</p>)
        }
      </div>
    </div>
  )
}

export default Dashboard