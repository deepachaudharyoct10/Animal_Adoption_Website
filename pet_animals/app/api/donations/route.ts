import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Donation } from "@/lib/models/Donation";
// Imported so Mongoose registers the User model before .populate("donor", ...)
// runs below — populate() needs the referenced model registered by name.
import "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const decoded = verifyToken(request);
        await connectDB();

        const query = decoded.role === "admin" ? {} : { donor: decoded.userId };

        const donations = await Donation.find(query)
            .populate("donor", "name email")
            .sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Donations fetched successfully",
            donations,
        }, { status: 200 });

    } catch (error) {
        console.log("Error fetching donations", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
