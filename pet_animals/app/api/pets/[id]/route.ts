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
