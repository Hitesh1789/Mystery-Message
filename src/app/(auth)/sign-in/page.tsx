'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/schemas/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";
import * as z from "zod";

function SignIn() {

    const router = useRouter();

    //zod implemetatiom
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })


    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        console.log(data)
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })

        console.log(result)
        if (result?.error) {
            toast('Signin Failed', {
                description: result.error
            })
        }

        if(result?.url){
            router.replace('/dashboard')
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-4 space-y-8 bg-whhite rounded-lg shawdow-md'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                        Join Mystry Message
                    </h1>
                    <p className='mb-4'>Sign in to start your anonymous adventure</p>
                </div>
            </div>

            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle className='text-center font-bold'>SignIn</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name='identifier'
                                control={form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel htmlFor="username">
                                            Username or Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="username"
                                            placeholder="Enter your username"
                                            onChange={(e) => {
                                                field.onChange(e)
                                            }}
                                        />
                                        <p className="text-red-500 text-sm">
                                            {form.formState.errors.identifier?.message}
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
                                <Button type="submit">
                                    Submit
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}

export default SignIn