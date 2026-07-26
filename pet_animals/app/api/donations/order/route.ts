import { verifyToken } from "@/lib/auth";
import { getRazorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        verifyToken(request);
        const body = await request.json();
        const { amount } = body;

        if (!amount || typeof amount !== "number" || amount <= 0) {
            return NextResponse.json({
                message: "A valid donation amount is required",
            }, { status: 400 });
        }

        const order = await getRazorpay().orders.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `donation_${Date.now()}`,
        });

        return NextResponse.json({
            message: "Order created successfully",
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        }, { status: 200 });

    } catch (error) {
        console.log("Error creating Razorpay order", error);
        return NextResponse.json({
            message: "Unable to create donation order. Razorpay may not be configured yet.",
        }, { status: 500 });
    }
}
