import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try{

        const token = request.nextUrl.searchParams.get("token");
        const body = await request.json();
        const {newPassword}= body;

        if(!token || !newPassword){
            return NextResponse.json({
                message: "token and newPassword is required",
            },{
                status: 400
            })
        }

        await connectDB();
        const findUser = await User.findOne({reset_token: token});

        if(!findUser){
            return NextResponse.json({
                message:"No user Found , token is expired"
            },{status:404});
        }

        const hashPassword = await bcrypt.hash(newPassword,10);

        findUser.password = hashPassword;
        findUser.reset_token = undefined;
        findUser.token_Expiry = undefined;

        await findUser.save();

        return NextResponse.json({
            message:"Password is reset Successfully",
            findUser

        },{status: 200});

    }catch(error){
        return NextResponse.json({
            message: `Error during password-reset ${error}`,
        },{status: 500})
    }
}