import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/middleware/auth";

import Budget from "@/models/Budget.models";
import Transaction from "@/models/Transaction.models";

export async function GET(req) {
    try {
        
        // CONNECT TO DATABASE
        await connectDB();

        // VERIFY USER ID
        const userId = verifyToken(req);

        // FIND USER BUDGET
        const budget = await Budget.findOne({ userId });

        // CONNECT MONTH RANGE
        const currentDate = new Date();

        const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23,
            59,
            59
        )

        // FATCH CURRENT MONTH EXPENSES
        const expenses = await Transaction.find({
            userId,
            type: "EXPENSE",
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        });

        const currentExpense = expenses.reduce(
            (sum, transaction) => 
                sum + 
                parseFloat(
                    transaction.amount?.toString() || 0
                ),
            0
        );

        const budgetAmount = budget 
            ? parseFloat(budget.amount?.toString() || 0)
            : 0;

        return Response.json({
            success: true,
            budget: budgetAmount,
            currentExpense,
            remaining: budgetAmount - currentExpense,
            percentage: budgetAmount > 0
                ? Number(
                    (
                        (currentExpense/budgetAmount) * 100
                    ).toFixed(2)
                ): 0
        });

    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

// UPDATE/CREATE BUDGET
export async function POST(req) {
    try {
        // CONNECT TO DATABASE
        await connectDB();

        // VERIFY USER ID
        const userId = verifyToken(req);

        const { amount } = await req.json();

        if(!amount || amount <= 0) {
            return Response.json({
                success: false,
                message: "VALID BUDGET AMOUNT REQUIRED"
            },{status: 400 });
        }

        // UPDATE BUDGET
        const budget = await Budget.findOneAndUpdate(
            { userId },
            {
                amount
            },
            {
                upsert: true,
                new: true
            }
        );

        return Response.json({
            success: true,
            message: "BUDGET UPDATED SUCCESSFULLY!",
            budget: {
                ...budget.toObject(),
                amount: parseFloat(
                    budget.amount?.toString() || 0
                )
            }
        });
    } 
    catch (error) {
        
        return Response.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}