import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/middleware/auth";

import Account from "@/models/Account.models";
import Transaction from "@/models/Transaction.models";

import mongoose from "mongoose";


export async function DELETE(req) {

    const session = await mongoose.startSession();

    try {
        
        // CONNECT TO DATABASE
        await connectDB();

        // VERIFY USER
        const userId = verifyToken(req);

        // GET TRANSACTION IDs
        const { transactionIds } = await req.json();

        // VALIDATE USER
        if(!transactionIds || !Array.isArray(transactionIds) || transactionIds.length === 0) {
            return Response.json({
                success: false,
                message: "TRANSACTION IDs REQUIRED"
            },{status: 400})
        }

        // START TRANSACTION
        session.startTransaction();

        // FETCH USER TRANSACTION
        const transactions = await Transaction.find({
            _id: { $in: transactionIds }
        });

        if(!transactions.length) {
            await session.abortTransaction()
            return Response.json({
                success: false,
                message: "NO TRANSACTIONS FOUND",
            },{ status: 404 });
        }

        // CALCULATE BALANCE CHANGED
        const accountBalanceChange = {};
        for(const transaction of transactions){

            const accountId = transaction.accountId.toString();
            
            const amount = parseFloat(
                transaction.amount?.toString() || 0
            );

            const change = transaction.type === "EXPENSE" ? amount : -amount;
            accountBalanceChange[accountId] = (accountBalanceChange[accountId] || 0) + change;
        }

        // DELETE TRANSACTION
        const deletedResult = await Transaction.deleteMany({
            _id: { $in: transactionIds },
            userId,
        }).session(session);

        // UPDATE ACCOUNT BALANCE
        for(const [accountId, balanceChange] of Object.entries(accountBalanceChange)) {
            const account = await Account.findById(accountId).session(session);

            if(!account){
                continue;
            }

            const currentBalance = Number(account.balance);
            account.balance = currentBalance + balanceChange;

            await account.save({ session });
        }

        // COMMIT TRANSACTION
        await session.commitTransaction();

        return Response.json({
            success: true,
            },{ status: 200 }
        );
    } 
    catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        console.error(
            "BULK DELETE ERROR:",
            error.message
        );

        return Response.json({
            success: false,
            message: error.message,
            },{ status: 500 }
        );
    }
    finally{
        session.endSession();
    }
}