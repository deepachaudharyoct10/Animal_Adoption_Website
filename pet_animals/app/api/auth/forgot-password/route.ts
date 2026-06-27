
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto";
import { nodeMailerLink } from "@/lib/mailer";

export async function POST(request: NextRequest){
    try{
        const body= await request.json();
        console.log("body data", body)
        const {email} = body;
        if(!email){
            return NextResponse.json({
                "message": "pls enter the mail id"
            })
        }
        await connectDB();
        const findUser = await User.findOne({email});
        if(!findUser){
            return NextResponse.json({
                message:"Please enter an existing User"
    
            })
        }
        
        const token = crypto.randomBytes(32).toString("hex");
        findUser.reset_token = token;
        findUser.token_Expiry  = Date.now() + 15*60*1000;
        await findUser.save();
        const mailData= await nodeMailerLink(email, token);

        return NextResponse.json({
            message:"Passoword link send to your register mail id ",
            mailData
        },{
            status: 200
        })


    }catch(error){
        console.log("error is ", error);
        return NextResponse.json({error:"Internal server error"},
            {status: 500}
        )
    }
}