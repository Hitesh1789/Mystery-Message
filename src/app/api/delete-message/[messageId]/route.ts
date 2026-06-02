import UserModel from "@/model/User.model";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { NextResponse } from "next/server";


export async function DELETE({ params }: { params: { messageId: string } }) {
    const messageId = params.messageId
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

    try {
        const updatedResult = await UserModel.updateOne(
            { _id: user._id },
            {
                $pull: {
                    messages: {
                        _id: messageId
                    }
                }
            }
        )

        if (updatedResult.modifiedCount == 0) {
            return NextResponse.json({
                success: false,
                message: 'Message not found or it may not belongs to you.'
            },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Message deleted successfully.'
        },
            { status: 200 }
        )

    } catch (error) {
        console.log('Error while deleting messages.', error)

        return NextResponse.json({
            success: false,
            message: 'Error while deleting messages.'
        },
            { status: 500 }
        )
    }

}