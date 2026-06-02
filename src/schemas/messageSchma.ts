import {z} from "zod";

export const MessageSchema = z.object({
   content: z.string()
   .min(10,{message:"Content must be atleast of 10 characters"})
   .max(320,{message:"Content msut be equal to or less then 320 characters."})
})