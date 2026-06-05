'use client'
import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

const Page = () => {
  const [username, setUsername] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300)
  const router = useRouter();

  //zod implemetatiom
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUserMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          // console.log(response)
          setUserMessage(response.data.message)
        }
        catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUserMessage(axiosError.response?.data.message || "Error checking username.")
        }
        finally {
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data)
      toast("Success", {
        description: response.data.message
      })
      router.replace(`/verify/${data.username}`)
      setIsSubmitting(false)
    }
    catch (error) {
      console.error("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast('Signup Failed', {
        description: errorMessage
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-4 space-y-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
            Join Mystry Message
          </h1>
          <p className='mb-4'>Sign up to start your anonymous adventure</p>
        </div>
      </div>
      
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className='text-center font-bold'>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='username'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="username">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Enter your username"
                      onChange={(e) => {
                        field.onChange(e)
                        debounced(e.target.value)
                      }}
                    />
                    {isCheckingUsername &&
                      <Loader2 className='animate-spin' />}
                    <p className={`text-sm ${userMessage === "Username is unique." ? 'text-green-500' : 'text-red-500'}`}>{userMessage}</p>
                  </Field>
                )}
              />
              <Controller
                name='email'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="email">
                      Email
                    </FieldLabel>
                    <Input
                      type='email'
                      {...field}
                      id="email"
                      placeholder="Enter your Email"
                    />
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email?.message}
                    </p>
                  </Field>
                )}
              />
              <Controller
                name='password'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="password">
                      Password
                    </FieldLabel>
                    <Input
                      type='password'
                      {...field}
                      id="password"
                      placeholder="Enter your Password"
                    />
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.password?.message}
                    </p>
                  </Field>
                )}
              />
              <div className='flex gap-2 justify-center m-2'>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (<Loader2 />) : "Submit"}
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