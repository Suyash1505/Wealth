import { connectDB } from "@/lib/mongodb"
import Account from "@/models/Account.models";
import { verifyToken } from "@/middleware/auth";


export async function GET(req) {
    try {
        await connectDB();

        const userId = verifyToken(req);
        const accounts = await Account.find({ userId })
            .sort({ createdAt: -1 });

        return Response.json({
            success: true,
            accounts
        });
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        })    
    }
}