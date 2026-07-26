import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { Animal } from "@/lib/models/Animal";
import { NextRequest, NextResponse } from "next/server";

async function resolveImages(images: string[] | undefined): Promise<string[]> {
    if (!images || images.length === 0) return [];
    return Promise.all(
        images.map((image) => (image.startsWith("data:") ? uploadImage(image, "animals") : image))
    );
}

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

        const resolvedImages = await resolveImages(images);

        const data ={name, type, age, breed, gender,healthStatus,
                vaccinationStatus, rescueStory, images: resolvedImages, location , status };

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


export async function GET(){
    try{
        await connectDB();

        const animal = await Animal.find();
        return NextResponse.json({
            message:"Animal fetch successfully",
            animal
        },{status:200})
    }catch(error){
        return NextResponse.json({
            error:"Internal server error",
        },{status:500})
    }
}
