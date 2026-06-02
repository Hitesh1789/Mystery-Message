import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Message } from "@/model/User.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    dbConnect();
    const { username, content } = await request.json();

    try {
        const user = await UserModel.findOne({
            username
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found!'
            },
                { status: 404 }
            )
        }

        if (!user.isAcceptingMessage) {
            return NextResponse.json({
                success: false,
                message: 'User not accepting Message.'
            },
                { status: 403 }
            )
        }
        const newMessage = { content, createdAt: new Date() }

        user.messages.push(newMessage as Message);
        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Message sended successfully.'
        },
            { status: 200 }
        )
    } catch (error) {
        console.log('Error while sending message, ', error)
        return NextResponse.json({
            success: false,
            message: 'Error while sending message.'
        },
            { status: 500 }
        )
    }

}