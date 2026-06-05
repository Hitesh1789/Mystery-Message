import UserModel from "@/model/User.model";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    dbConnect();
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: 'Not Authenticated'
        },
            { status: 401 }
        )
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const userMessageData = await UserModel.aggregate([
            { $match: { _id: userId } },
            {
                $unwind: {
                    path: '$messages',
                    preserveNullAndEmptyArrays: true // Prevents dropping users with 0 messages
                }
            },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])

        if (!userMessageData || userMessageData.length == 0) {
            return NextResponse.json({
                success: false,
                message: 'User not found!'
            },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            messages: userMessageData[0].messages
        },
            { status: 200 }
        )

    } catch (error) {
        console.log('Error while getting messages.', error)

        return NextResponse.json({
            success: false,
            message: 'Error while getting messages.'
        },
            { status: 500 }
        )
    }

}