import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { RescueReport } from "@/lib/models/RescueReport";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        requireAdmin(request);

        const { id } = await params;
        const body = await request.json();
        const { rescueStatus } = body;

        if (!rescueStatus || !["pending", "rescued", "not rescued"].includes(rescueStatus)) {
            return NextResponse.json({
                message: "rescueStatus must be 'pending', 'rescued' or 'not rescued'",
            }, { status: 400 });
        }

        await connectDB();

        const report = await RescueReport.findByIdAndUpdate(
            id,
            { rescueStatus },
            { new: true }
        );

        if (!report) {
            return NextResponse.json({
                message: "Rescue report not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Rescue report updated successfully",
            report,
        }, { status: 200 });

    } catch (error) {
        console.log("Error updating rescue report", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
