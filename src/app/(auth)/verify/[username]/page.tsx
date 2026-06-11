'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { VerifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

function VerifyAccount() {

    const router = useRouter();
    const params = useParams();

    //zod implemetatiom
    const form = useForm<z.infer<typeof VerifySchema>>({
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            code: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
        try {
            console.log(data)
            const response = await axios.post<ApiResponse>('/api/verify-code', {
                username: params.username,
                code: data.code
            })
            toast("Success", {
                description: response.data.message
            })
            router.replace('/sign-in')
        }
        catch (error) {
            console.error("Error in verifying code", error)
            const axiosError = error as AxiosError<ApiResponse>
            const errorMessage = axiosError.response?.data.message
            toast('Verify Code failed!', {
                description: errorMessage
            })
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen '>
            <div className='w-full max-w-md p-4 space-y-8 bg-whhite rounded-lg shawdow-md'>
                <div className='text-center'>
                    Code Verification - Verify Your Code
                </div>
            </div>

            <Card className="w-full sm:max-w-md">
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name='code'
                                control={form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel htmlFor="verifycode">
                                            Veification Code
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="verifycode"
                                            placeholder="Enter your code"
                                            onChange={(e) => {
                                                field.onChange(e)
                                            }}
                                        />
                                        <p className="text-red-500 text-sm">
                                            {form.formState.errors.code?.message}
                                        </p>
                                    </Field>
                                )}
                            />
                            <div className='flex gap-2 justify-center m-2'>
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

export default VerifyAccount