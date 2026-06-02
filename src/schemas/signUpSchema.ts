import {z} from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Username must be atleeast 2 characters.")
    .max(20,"Username must be less or equal to 20 characters.")
    .regex(/^[a-zA-Z0-9]+$/,"Username must not contain special characters.")

export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address."}),
    password:z.string().min(6,{message:"Password must be atleast 6 characters."})
}) 