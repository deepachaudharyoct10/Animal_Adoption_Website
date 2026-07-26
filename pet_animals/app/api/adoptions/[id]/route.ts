import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Animal } from "@/lib/models/Animal";
import { AdoptionRequest } from "@/lib/models/AdoptionRequest";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        requireAdmin(request);

        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status || !["approved", "rejected"].includes(status)) {
            return NextResponse.json({
                message: "status must be 'approved' or 'rejected'",
            }, { status: 400 });
        }

        await connectDB();

        const adoptionRequest = await AdoptionRequest.findById(id);
        if (!adoptionRequest) {
            return NextResponse.json({
                message: "Adoption request not found",
            }, { status: 404 });
        }

        adoptionRequest.status = status;
        await adoptionRequest.save();

        if (status === "approved") {
            await Animal.findByIdAndUpdate(adoptionRequest.animal, { status: "adopted" });
        }

        return NextResponse.json({
            message: "Adoption request updated successfully",
            adoptionRequest,
        }, { status: 200 });

    } catch (error) {
        console.log("Error updating adoption request", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
