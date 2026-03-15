import { connectDB } from "@/lib/mongodb"
import { verifyToken } from "@/middleware/auth";
import Account from "@/models/Account.models";
import Transaction from "@/models/Transaction.models";
import User from "@/models/User.models"


export async function GET(req) {
    
    try {
        // CONNECT TO THE DATA BASE
        await connectDB();

        const userId = verifyToken(req);
        const user = await User.findById(userId);

        if(!user){
            return Response.json({
                success: false,
                message: "USER NOT FOUND!"
            });
        }

        const accounts = await Account.find( { userId });
        const transactions = await Transaction.find( { userId })
        .sort( { date: -1 })
        .limit(10);

        return Response.json({
            success: true,
            accounts,
            transactions
        });
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        })
    }
}