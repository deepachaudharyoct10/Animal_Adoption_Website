import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/db";
import {User} from "@/lib/models/User";
import {signToken} from "@/lib/auth";

export async function POST(request: NextRequest){
    try{
    const body = await request.json();
    const {name , email, password,phone}= body

    if(!name || !email || !password || !phone){
        return NextResponse.json({
            error: "All fields are required"
        },{
            status: 400
        })
    }

    await connectDB();
    const existingUser = await User.findOne({email});
    if(existingUser){
        return NextResponse.json({
            error: "User already exists"
        },{
            status: 400
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role:"user",
    })

    const token = signToken({userId: user._id.toString(), role: user.role});

    const response=  NextResponse.json({
        message: "User registered successfully",
        token,
        user:{
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    },{status:200});

    response.headers.set("Authorization",`Bearer ${token}`);
    return response;

}
catch(error){
    return NextResponse.json({
        error: "Internal Server Error"
    },{
        status: 500
    })
}
}