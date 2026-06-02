import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod"
import { VerifySchema } from "@/schemas/verifySchema";
import { NextResponse } from "next/server";

const VerifyCodeSchema = z.object({
    code: VerifySchema
})

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username)
        const temp = {
            code: {
                code
            }
        }
        //validate with zod
        const result = VerifyCodeSchema.safeParse(temp)

        if (!result.success) {
            const verifyErrors = result.error.format().code?.code?._errors || []
            return NextResponse.json(
                {
                    success: false,
                    message: verifyErrors.length>0 ? verifyErrors.join(', ') : 'Invalid code format.'
                },
                {
                    status: 400
                }
            )
        }

        const user = await UserModel.findOne({
            username: decodedUsername
        })
        
        if(!user){
            return NextResponse.json(
                {
                    success: false,
                    message:  'Username is incorrect please recheck.',
                },
                {
                    status: 400
                }
            )
        }

        const isCodeCorrect = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeCorrect && isCodeNotExpired){
            user.isVerified = true;
            await user.save();

            return NextResponse.json(
                {
                    success: true,
                    message: 'Your account verified successfully.',
                },
                {
                    status: 200
                }
            )
        }
        else if(!isCodeCorrect){
            return NextResponse.json(
                {
                    success: false,
                    message: 'Incorrect code! Please Recheck.',
                },
                {
                    status: 400
                }
            )
        }
        else{
            return NextResponse.json(
                {
                    success: false,
                    message: 'Your Code is Expired. Please signup again.',
                },
                {
                    status: 400
                }
            )
        }
    }
    catch (error) {
        console.error("Error while verifying code", error)
        return NextResponse.json(
            {
                success: false,
                message: 'Error while verifying code'
            },
            {
                status: 500
            }
        )
    }
}