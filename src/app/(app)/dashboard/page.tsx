'use client'

import { Message } from "@/model/User.model"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useCallback, useState } from "react"
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
      setValue('acceptMessages', response.data.isAcceptingMessage || false)
    } 
    catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description: axiosError.response?.data.message || "Failed to fetch accept Message Status"
      })
    }
    finally{
      setIsSwitchLoading(false)
    }


  }, [setValue])


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard