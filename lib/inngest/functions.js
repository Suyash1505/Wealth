import { inngest } from "./client";

import Budget from "@/models/Budget.models";
import Account from "@/models/Account.models";
import Transaction from "@/models/Transaction.models";

import { connectDB } from "@/lib/mongodb";
import { sendEmail } from "../resend/sendEmail";

export const checkBudgetAlert = inngest.createFunction(
  {
    id: "check-budget-alert",

    triggers: [
      {
        cron: "0 */6 * * *",
      },
    ],
  },

  async ({ step }) => {
    await connectDB();

    const budgets = await step.run("fetch-all-budgets", async () => {
      return await Budget.find({});
    });

    for (const budget of budgets) {
      const defaultAccount = await step.run(
        `find-default-account-${budget._id}`,
        async () => {
          return await Account.findOne({
            userId: budget.userId,
            isDefault: true,
          });
        },
      );

      if (!defaultAccount) {
        continue;
      }

      await step.run(`check-budget-${budget._id}`, async () => {
        const startDate = new Date();

        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        const expenses = await Transaction.aggregate([
          {
            $match: {
              userId: budget.userId,
              accountId: defaultAccount._id,
              type: "EXPENSE",
              date: {
                $gte: startDate,
              },
            },
          },
          {
            $group: {
              _id: null,
              totalExpense: {
                $sum: {
                  $toDouble: "$amount",
                },
              },
            },
          },
        ]);

        const totalExpense = expenses[0]?.totalExpense || 0;

        const budgetAmount = parseFloat(budget.amount.toString());

        const percentageUsed = (totalExpense / budgetAmount) * 100;

        console.log(`USER: ${budget.userId}`);

        console.log(`BUDGET: ${budgetAmount}`);

        console.log(`EXPENSE: ${totalExpense}`);

        console.log(`USED: ${percentageUsed.toFixed(2)}%`);

        if (
          percentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(budget.lastAlertSent, new Date()))
        ) {
          // SEND EMAIL HERE LATER
          await sendEmail({
            to: user.email,

            subject: `⚠️ FlowMint Budget Alert - ${defaultAccount.name}`,

            react: EmailTemplate({
              userName: user.user_name,

              type: "budget-alert",

              data: {
                percentageUsed,

                budgetAmount: Number(budgetAmount).toFixed(2),

                totalExpenses: Number(totalExpenses).toFixed(2),

                remaining: Number(budgetAmount - totalExpenses).toFixed(2),

                accountName: defaultAccount.name,
              },
            }),
          });

          console.log(`BUDGET ALERT FOR USER ${budget.userId}`);

          await Budget.findByIdAndUpdate(budget._id, {
            lastAlertSent: new Date(),
          });
        }
      });
    }

    return {
      success: true,
      message: "BUDGET ALERT CHECK COMPLETED",
    };
  },
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
