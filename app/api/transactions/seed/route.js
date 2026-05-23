import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/middleware/auth";
import { subDays } from "date-fns";

import Transaction from "@/models/Transaction.models";
import Account from "@/models/Account.models";

import mongoose from "mongoose";

// Categories
const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

// helpers
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category =
    categories[Math.floor(Math.random() * categories.length)];

  const amount = getRandomAmount(category.range[0], category.range[1]);

  return { category: category.name, amount };
}

export async function POST(req) {

  try {

    await connectDB();

    console.log("SEED CALLED");
    const userId = verifyToken(req);
    console.log("USER ID:", userId);

    const { accountId } = await req.json();
    console.log("ACCOUNT ID:", accountId);
    const accountObjectId = new mongoose.Types.ObjectId(accountId);

    if (!accountId) {
      return Response.json({
        success: false,
        message: "ACCOUNT ID REQUIRED"
      });
    }

    let totalBalance = 0;
    const transactions = [];

    // GENERATE 90 DAYS
    for (let i = 90; i >= 0; i--) {

      const date = subDays(new Date(), i);
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);
        totalBalance += type === "INCOME" ? amount : -amount;

        transactions.push({
          type,
          amount,
          description:
            type === "INCOME"
              ? `Received ${category}`
              : `Paid for ${category}`,
            date,
            category,
            status: "COMPLETED",
            userId,
            accountId: accountObjectId
        });

      }
    }

    // CLEAR OLD TRANSACTION
    await Transaction.deleteMany({ 
      accountId: accountObjectId, 
      userId 
    });

    // INSERT NEW TRANSACTION
    await Transaction.insertMany(transactions);

    // UPDATE ACCOUNT BALANCE
    await Account.findByIdAndUpdate(accountObjectId, {
      balance: totalBalance
    });
        
    return Response.json({
      success: true,
      message: `Created ${transactions.length} transactions`
    });

  } 
  catch (error) {

    return Response.json({
      success: false,
      message: error.message
    });

  }

}