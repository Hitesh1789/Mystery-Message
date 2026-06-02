import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameters',
                },
                {
                    status: 400
                })
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })

        if (existingVerifiedUser) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Username already taken."

                },
                {
                    status: 400
                })
        }

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "Username is unique."
            },
            {
                status: 200
            })
    }
    catch (error) {
        console.error("Error checking username", error)
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: 'Error while checking email'
            },
            {
                status: 500
            })
    }
}