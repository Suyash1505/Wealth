import { connectDB } from "@/lib/mongodb";

import Account from "@/models/Account.models";

import { verifyToken } from "@/middleware/auth";

export async function GET(req) {

    try {

        // CONNECT TO DATABASE
        await connectDB();

        // VERIFY USER TOKEN
        const decoded = verifyToken(req);

        const userId = decoded.id;

        // FETCH USER ACCOUNTS
        const accounts = await Account.find({ userId })
            .select("name type balance isDefault createdAt")
            .sort({ createdAt: -1 });

        return Response.json(
            {
                success: true,
                accounts,
            },
            { status: 200 }
        );

    } 
    catch (error) {

        console.error(
            "FETCH ACCOUNTS ERROR:",
            error.message
        );

        return Response.json(
            {
                success: false,
                message: "UNAUTHORIZED ACCESS",
            },
            { status: 401 }
        );
    }
}