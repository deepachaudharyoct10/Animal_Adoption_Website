import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { RescueReport } from "@/lib/models/RescueReport";
// Imported so Mongoose registers the User model before .populate("reporter", ...)
// runs below — populate() needs the referenced model registered by name.
import "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const decoded = verifyToken(request);
        const body = await request.json();

        const { reporterName, reporterPhone, animalType, description, location, photo } = body;

        if (!reporterName || !reporterPhone || !animalType || !description || !location || !photo) {
            return NextResponse.json({
                message: "All the fields are required",
            }, { status: 400 });
        }

        await connectDB();

        const photoUrl = await uploadImage(photo, "rescue-reports");

        const report = await RescueReport.create({
            reporter: decoded.userId,
            reporterName,
            reporterPhone,
            animalType,
            description,
            location,
            photo: photoUrl,
        });

        return NextResponse.json({
            message: "Rescue report submitted successfully",
            report,
        }, { status: 200 });

    } catch (error) {
        console.log("Error during rescue report creation", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const decoded = verifyToken(request);
        await connectDB();

        const query = decoded.role === "admin" ? {} : { reporter: decoded.userId };

        const reports = await RescueReport.find(query)
            .populate("reporter", "name email phone")
            .sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Rescue reports fetched successfully",
            reports,
        }, { status: 200 });

    } catch (error) {
        console.log("Error fetching rescue reports", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
