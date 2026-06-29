import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET= process.env.JWT_SECRET as string;

export type TokenPayload ={
    userId: string,
    role: "user" | "admin";
};


export function signToken(payload:TokenPayload) {
    return jwt.sign(payload, JWT_SECRET,{expiresIn: "7d"}) as string;
}

export function verifyToken(request:NextRequest) {
    const authHeader= request.headers.get("authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new Error(
            "No token provided"
        );
    }

    const token = authHeader.split(" ")[1];
    return jwt.verify(token , JWT_SECRET) as TokenPayload;
}

export function requireAdmin(request: NextRequest) {
    const decoded = verifyToken(request);
    if (decoded.role !== "admin") {
        throw new Error("Admin access required");
    }
    return decoded;
}