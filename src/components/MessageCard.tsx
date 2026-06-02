'use client'
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { toast } from "sonner";
import { Button } from "./ui/button";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Message } from "@/model/User.model";

type messageCardProps = {
    message:Message,
    onMessageDelete : (messageId: string)=>void
}

const MessageCard = ({message,onMessageDelete}:messageCardProps) => {

    const handleDelete = async ()=>{
        try {
            const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
            toast.message("Message deleted Successfully!",
                {
                    description:response.data.message
                }
            )
            onMessageDelete(message._id?.toString())
        } catch (error) {
            console.log("Error while deleting message",error)
            toast.message("Error while deleting Message")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{message.content}</CardTitle>
            </CardHeader>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your message
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}

export default MessageCard