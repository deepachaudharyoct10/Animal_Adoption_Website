import { signToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try{

        const body = await request.json();

        const {email, password} = body;

        if(!email || !password){
            return NextResponse.json({
               "Messaage": "All field are required"
            })
        }

         await connectDB();

        const findUser = await User.findOne({email});

        if(!findUser){
            return NextResponse.json({
                "message":"User is not existing ,pls register in"
            })
        }

        const isPasswordCorrect= await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect){
            return NextResponse.json({
                message:"Please enter the correct password"
            })
        }
        const token = signToken({userId: findUser._id.toString(), role: findUser.role})
        const response = NextResponse.json({
            message: "User is logged in Successfully",
            email,
            userId: findUser._id,
            token
        },{status: 200})

        response.headers.set("Authorization", `Bearer ${token}`);
        return response;




    }catch(error){
        console.log("We got an error", error);
    }
}