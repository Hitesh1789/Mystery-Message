'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { MessageSchema } from "@/schemas/messageSchma"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const Page = () => {
  const [isSending, setIsSending] = useState(false)
  const params = useParams()

  //zod implemetatiom
  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      content: ''
    }
  })

  const onSendMessage = async (data: z.infer<typeof MessageSchema>) => {
    setIsSending(true)
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        username: params.username,
        content: data.content
      })
      toast("Success", {
        description: response.data.message
      })
    }
    catch (error) {
      console.error("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast('Signup Failed', {
        description: errorMessage
      })
    }
    finally {
      setIsSending(false)
    }
  }


  return (
    <div className="text-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className='text-center font-bold'>Enter message to send</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSendMessage)}>
            <FieldGroup>
              <Controller
                name='content'
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    placeholder="Enter your message"
                    onChange={(e) => {
                      field.onChange(e)

                    }}
                  />
                )}
              />

              <div className='flex gap-2 justify-center m-2'>
                <Button type="submit" disabled={isSending}>
                  {isSending ? (<Loader2 />) : "Send"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>

      </Card>
    </div>


  )
}

export default Page