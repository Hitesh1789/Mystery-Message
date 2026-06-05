import UserModel from "@/model/User.model";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: 'Not Authenticated'
        },
            { status: 401 }
        )
    }

    const userId = user._id;
    const { acceptMessageStatus } = await request.json();
    

    if(acceptMessageStatus === undefined || acceptMessageStatus === null){
        return NextResponse.json({
                success: false,
                message: 'AcceptMessageStatus is required!'
            },
                { status: 400 }
            )
    }

    try {
        const user = await UserModel.findByIdAndUpdate(
            { _id : userId },
            {
                isAcceptingMessage: acceptMessageStatus
            },
            { new: true }
        )

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found!'
            },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message:'Accept Message status updated successfully.',
            isAcceptingMessages: user.isAcceptingMessage
        },
            { status: 200 }
        )

    }
    catch (error) {
        console.log('Error while updating accept message status ', error)
        return NextResponse.json({
            success: false,
            message: 'Error while updating accept message status '
        },
            { status: 500 }
        )
    }
}

export async function GET(){
    dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: 'Not Authenticated'
        },
            { status: 401 }
        )
    }

    const userId = user._id;

    try {
        const user = await UserModel.findById(userId)

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found!'
            },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            isAcceptingMessages: user.isAcceptingMessage
        },
            { status: 200 }
        )

    }
    catch (error) {
        console.log('Error while getting accept message status ', error)
        return NextResponse.json({
            success: false,
            message: 'Error while getting accept message status '
        },
            { status: 500 }
        )
    }
}