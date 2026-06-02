import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerficationEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    await dbConnect()
    
    try {
        const { username, email, password } = await request.json();

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingVerifiedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username already taken."
                },
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6 digit number

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "User is already verified with this email.",
                    },
                    { status: 400 }
                );
            }
            else{
                const hasedPassword = await bcrypt.hash(password,10);
                existingUserByEmail.username = username;
                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        }
        else {
            const hasedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()

        }

        //send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if(!emailResponse.success){
            return NextResponse.json(
                {
                    success: false,
                    message: emailResponse.message
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully. Please verify your code before other person take your username."
            },
            { status: 201 }
        );
    }
    catch (err) {
        console.error('Error while Registering user', err)
        return NextResponse.json(
            {
                success: false,
                message: "Error while registering user."                
            },
            { status: 500 }
        );
    }
}