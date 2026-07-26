import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Donation } from "@/lib/models/Donation";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const decoded = verifyToken(request);
        const body = await request.json();

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
            donorName,
            email,
            purpose,
        } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount || !donorName) {
            return NextResponse.json({
                message: "Missing payment verification details",
            }, { status: 400 });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({
                message: "Payment verification failed",
            }, { status: 400 });
        }

        await connectDB();

        const donation = await Donation.create({
            donor: decoded.userId,
            donorName,
            email,
            amount,
            purpose,
            transactionId: razorpay_payment_id,
        });

        return NextResponse.json({
            message: "Donation recorded successfully",
            donation,
        }, { status: 200 });

    } catch (error) {
        console.log("Error verifying donation", error);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
