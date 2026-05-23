import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/middleware/auth";
import Account from "@/models/Account.models";
import Transaction from "@/models/Transaction.models";
import mongoose from "mongoose";


export async function GET(req, { params }) {
    try {

        await connectDB();

        const userId = verifyToken(req);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const { id } = await params;
        const accountId = new mongoose.Types.ObjectId(id);

        const account = await Account.findOne({
            _id: accountId,
            userId: userObjectId
        });

        if (!account) {
            return Response.json({
                success: false,
                message: "ACCOUNT NOT FOUND!"
            });
        }

        const transactions = await Transaction.find({
            accountId: accountId,
            userId: userObjectId
        }).sort({ date: -1 });

        return Response.json({
            success: true,
            account: {
                ...account.toObject(),
                transactionCount: transactions.length,
                transactions
            }
        });

    } catch (error) {
        return Response.json({
            success: false,
            message: error.message
        });
    }
}