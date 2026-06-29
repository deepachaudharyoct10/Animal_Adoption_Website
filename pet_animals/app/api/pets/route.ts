import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Animal } from "@/lib/models/Animal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        requireAdmin(request);
        const body =await  request.json();

        const {name, type, age, breed, gender,healthStatus,
                vaccinationStatus, rescueStory, images, location , status } = body;
        if(!name  || !type || !location){
            return NextResponse.json({
                message:"All the fields are reqiuired",
            },{status:400})
        }

        await connectDB();

        const data ={name, type, age, breed, gender,healthStatus,
                vaccinationStatus, rescueStory, images, location , status };

        const createAnimal = await Animal.create(data);
        return NextResponse.json({
            message:"Animal created successfully",
            createAnimal
        },{status:200})


    }catch(error){
        console.log("Error during animal addition", error);
        return NextResponse.json({
            message:"Error duing animal addtion"
        },{status: 500})
    }
}