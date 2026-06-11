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
import { Trash2 } from "lucide-react";


type messageCardProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: messageCardProps) => {

    const handleDelete = async () => {
        try {
            const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
            toast.message("Message deleted Successfully!",
                {
                    description: response.data.message
                }
            )
            onMessageDelete(message._id?.toString())
        } catch (error) {
            console.log("Error while deleting message", error)
            toast.message("Error while deleting Message")
        }
    }

    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">

                <CardTitle className="text-sm md:text-base font-medium wrap-break-word max-w-[90%]">
                    {message.content}
                </CardTitle>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            className=" text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0 "
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
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
            </CardHeader>
        </Card >
    )
}

export default MessageCard