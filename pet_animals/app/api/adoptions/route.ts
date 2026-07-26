import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Animal } from "@/lib/models/Animal";
import { AdoptionRequest } from "@/lib/models/AdoptionRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const decoded = verifyToken(request);
        const body = await request.json();

        const { animalId, fullName, email, phoneNumber, address, occupation, previousExperience } = body;

        if (!animalId || !fullName || !email || !phoneNumber || !address || !occupation || !previousExperience) {
            return NextResponse.json({
                message: "All the fields are required",
            }, { status: 400 });
        }

        await connectDB();

        const animal = await Animal.findById(animalId);
        if (!animal) {
            return NextResponse.json({
                message: "Animal not found",
            }, { status: 404 });
        }

        if (animal.status !== "available") {
            return NextResponse.json({
                message: "This animal is not available for adoption",
            }, { status: 400 });
        }

        const adoptionRequest = await AdoptionRequest.create({
            user: decoded.userId,
            animal: animalId,
            fullName,
            email,
            phoneNumber,
            address,
            occupation,
            previousExperience,
            status: "pending",
        });

        return NextResponse.json({
            message: "Adoption request submitted successfully",
            adoptionRequest,
        }, { status: 200 });

    } catch (error) {
        console.log("Error during adoption request creation", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const decoded = verifyToken(request);
        await connectDB();

        const query = decoded.role === "admin" ? {} : { user: decoded.userId };

        const adoptionRequests = await AdoptionRequest.find(query)
            .populate("user", "name email phone")
            .populate("animal", "name type breed images status")
            .sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Adoption requests fetched successfully",
            adoptionRequests,
        }, { status: 200 });

    } catch (error) {
        console.log("Error fetching adoption requests", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
