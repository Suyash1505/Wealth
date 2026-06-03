import { connectDB } from "@/lib/mongodb";
import { subDays } from "date-fns";
import Transaction from "@/models/Transaction.models";
import Account from "@/models/Account.models";
import mongoose from "mongoose";

// CATEGORIES
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

// RANDOM AMOUNT
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// RANDOM CATEGORY
function getRandomCategory(type) {
  const categories = CATEGORIES[type];

  const category = categories[Math.floor(Math.random() * categories.length)];

  const amount = getRandomAmount(category.range[0], category.range[1]);

  return {
    category: category.name,
    amount,
  };
}

export async function POST() {
  try {
    // CONNECT DATABASE
    await connectDB();
    console.log("SEED STARTED");

    // HARDCODED USER + ACCOUNT
    const userId = new mongoose.Types.ObjectId("6a11ff11d2f20a85bdf2e5c2");
    const accountId = new mongoose.Types.ObjectId("6a146970047be7f3a26c6d09");

    let totalBalance = 0;
    const transactions = [];

    // GENERATE 90 DAYS TRANSACTIONS
    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";

        const { category, amount } = getRandomCategory(type);

        // UPDATE BALANCE
        totalBalance += type === "INCOME" ? amount : -amount;

        // PUSH TRANSACTION
        transactions.push({
          type,
          amount,
          description:
            type === "INCOME" ? `Received ${category}` : `Paid for ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId,
          accountId,
        });
      }
    }

    // DELETE OLD TRANSACTIONS
    await Transaction.deleteMany({
      userId,
      accountId,
    });

    // INSERT NEW TRANSACTIONS
    await Transaction.insertMany(transactions);

    // UPDATE ACCOUNT BALANCE
    await Account.findByIdAndUpdate(accountId, {
      balance: totalBalance,
    });

    console.log("TRANSACTIONS CREATED:", transactions.length);

    return Response.json(
      {
        success: true,
        message: `${transactions.length} TRANSACTIONS CREATED`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("SEED ERROR:", error.message);

    return Response.json(
      {
        success: false,
        message: "SEED FAILED",
      },
      { status: 500 },
    );
  }
}
