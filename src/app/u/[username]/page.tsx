'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { MessageSchema } from "@/schemas/messageSchma"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import {
  Loader2,
  Send,
  Sparkles,
  MessageSquareText
} from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const Page = () => {
  const [isSending, setIsSending] = useState(false)
  const [completion, setCompletion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      content: ""
    }
  })

  const messageLength =
    form.watch("content")?.length || 0

  const onSendMessage = async (data: z.infer<typeof MessageSchema>) => {
    setIsSending(true)

    try {
      const response =
        await axios.post<ApiResponse>(
          "/api/send-message",
          {
            username: params.username,
            content: data.content
          }
        )

      toast.success("Success", {
        description: response.data.message
      })

      form.reset()
    } catch (error) {
      const axiosError =
        error as AxiosError<ApiResponse>

      toast.error("Message Failed", {
        description:
          axiosError.response?.data.message
      })
    } finally {
      setIsSending(false)
    }
  }

  const generateSuggestions = async () => {
    setCompletion("")
    setIsLoading(true)

    try {
      const response = await fetch(
        "/api/suggest-messages",
        {
          method: "POST"
        }
      )

      const reader =
        response.body?.getReader()

      if (!reader) return

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } =
          await reader.read()

        if (done) break

        const chunk =
          decoder.decode(value)

        setCompletion(
          prev => prev + chunk
        )
      }
    } catch (err) {
      console.error(err)

      toast.error(
        "Failed to generate suggestions"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const suggestions = completion
    .split("||")
    .filter(Boolean)

  if (!params.username) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Username not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="mx-auto max-w-2xl space-y-6">

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">
              Send a Message to {params.username}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSendMessage)}
              className="space-y-5"
            >
              <FieldGroup>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Textarea
                        {...field}
                        placeholder="Write your anonymous message..."
                        className="
                          min-h-45
                          resize-none
                          text-base
                          leading-relaxed
                        "
                      />

                      <div className="flex justify-between items-center">
                        {form.formState.errors
                          .content ? (
                          <p className="text-sm text-red-500">
                            {
                              form.formState
                                .errors.content
                                .message
                            }
                          </p>
                        ) : (
                          <span />
                        )}

                        <span
                          className={`text-xs ${
                            messageLength > 280
                              ? "text-orange-500"
                              : "text-muted-foreground"
                          }`}
                        >
                          {messageLength}/320
                        </span>
                      </div>
                    </div>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Your identity remains completely anonymous.
              </p>
            </form>
          </CardContent>
        </Card>

      
        <Card className="shadow-lg border-0">

          <CardContent className="space-y-4">

            <Button
              onClick={generateSuggestions}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Suggestions
                </>
              )}
            </Button>

            <div className="grid gap-3">
              {suggestions.map(
                (suggestion, index) => (
                  <Card
                    key={index}
                    onClick={() =>
                      form.setValue(
                        "content",
                        suggestion
                      )
                    }
                    className="
                      cursor-pointer
                      transition-all
                      hover:shadow-md
                      hover:scale-[1.01]
                    "
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between gap-4">
                        <p className="text-sm">
                          {suggestion}
                        </p>

                        <span
                          className="
                            text-xs
                            text-indigo-600
                            font-medium
                            whitespace-nowrap
                          "
                        >
                          Use →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Page