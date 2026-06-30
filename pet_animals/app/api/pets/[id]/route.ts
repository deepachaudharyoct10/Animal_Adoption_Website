import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Animal } from "@/lib/models/Animal";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        requireAdmin(request);

        const { id } = await params;
        const body = await request.json();

        await connectDB();

        const updatedAnimal = await Animal.findByIdAndUpdate(
            id,
            { ...body },
            { returnDocument: "after" }
        );

        if (!updatedAnimal) {
            return NextResponse.json({
                message: "Animal not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Animal updated successfully",
            updatedAnimal
        }, { status: 200 });

    } catch(error) {
        console.log("Error during update", error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest , { params }: { params: Promise<{ id: string }> }){
    try{
   
    requireAdmin(request);
    const {id}=  await params ;

    if(!id){
        return NextResponse.json({
            message:"NO animal id for deletaion",
        },{status:400})
    }

    await connectDB();
    const deletedAnimal = await Animal.findByIdAndDelete(id);

    if(!deletedAnimal){
        return NextResponse.json({
            message:"No animal is deleted  , getting error",
        },{status:400})
    }

    return NextResponse.json({
        message:"Animal deleted successfully",
        deletedAnimal
    },{status:200})
}
     catch(error){
        NextResponse.json({
            message:`there are some issue ${error}`,
        },{status:500})
    }

}
