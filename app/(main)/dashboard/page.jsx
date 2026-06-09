"use client";

import React, { useEffect, useState } from "react";
import CreateAccountDrawer from "@/components/Create-account-drawer";
import { Card } from "@/components/ui/card";
import { Plus, Wallet, Landmark, ShieldCheck } from "lucide-react";
import { getUserAccount } from "@/lib/api/account";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/lib/api/budget";
import BudgetProgress from "./_components/budget-progress";

const DashboardPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [budgetData, setBudgetData] = useState(null);

  const fetchAccounts = async () => {
    try {
      const data = await getUserAccount();
      setAccounts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // TOTAL BALANCE
  const totalBalance = (accounts).reduce((acc, curr) => {
    return acc + parseFloat(curr.balance?.$numberDecimal || 0);
  }, 0);

  // GET USER BUDGET
  const fetchBudget = async () => {
    try {
      const data = await getCurrentBudget();
      setBudgetData(data);
    } 
    catch (error) {
      console.error(error);
    }
  }

   useEffect(() => {
    fetchAccounts();
    fetchBudget();
  }, []);

  console.log("BUDGET DATA:", budgetData);

  return (
    <div className="space-y-12">

      {/* ================= BUDGET PROGRESS ================= */}
      {
        <BudgetProgress
          budget={budgetData?.budget || 0}
          currenExpense={budgetData?.currentExpenses || 0}
          refreshBudget={fetchBudget}
        />
      }

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="group relative overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 p-0 backdrop-blur-2xl transition-all duration-500 hover:border-teal-400/25 hover:shadow-[0_0_45px_rgba(45,212,191,0.12)]">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_70%)]" />

            <div className="relative z-10 flex items-start justify-between p-8">
                <div>
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                        Total Balance
                    </p>

                    <h2 className="bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                        ₹ {totalBalance.toFixed(2)}
                    </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_25px_rgba(45,212,191,0.10)]">
                    <Wallet className="h-8 w-8 text-teal-300" />
                </div>
            </div>
        </Card>

        {/* TOTAL ACCOUNTS */}
        <Card className="group relative overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 p-0 backdrop-blur-2xl transition-all duration-500 hover:border-teal-400/25 hover:shadow-[0_0_45px_rgba(45,212,191,0.12)]">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_70%)]" />

            <div className="relative z-10 flex items-start justify-between p-8">
                <div>
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                        Total Accounts
                    </p>

                    <h2 className="text-4xl font-black tracking-tight text-white">
                        {accounts.length}
                    </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_25px_rgba(45,212,191,0.10)]">
                    <Landmark className="h-8 w-8 text-teal-300" />
                </div>
            </div>
        </Card>

        {/* DEFAULT ACCOUNT */}
        <Card className="group relative overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 p-0 backdrop-blur-2xl transition-all duration-500 hover:border-teal-400/25 hover:shadow-[0_0_45px_rgba(45,212,191,0.12)]">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_70%)]" />

          <div className="relative z-10 flex items-start justify-between p-8">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Default Account
              </p>

              <h2 className="text-2xl font-black tracking-tight text-white capitalize">
                {accounts.find((acc) => acc.isDefault)?.name || "None"}
              </h2>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_25px_rgba(45,212,191,0.10)]">
              <ShieldCheck className="h-8 w-8 text-teal-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* ================= ACCOUNT GRID ================= */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <CreateAccountDrawer refreshAccounts={fetchAccounts}>
          <div className="group relative flex h-60 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-teal-500/20 bg-[#0b1d36]/70 backdrop-blur-2xl transition-all duration-500 hover:border-teal-400/35 hover:shadow-[0_0_45px_rgba(45,212,191,0.12)]">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.10),transparent_70%)]" />

            <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_30px_rgba(45,212,191,0.10)]">
              <Plus className="h-10 w-10 text-teal-300 transition-transform duration-500 group-hover:rotate-90" />
            </div>

            <p className="relative z-10 text-xl font-bold tracking-tight text-white">
              Add New Account
            </p>

            <p className="relative z-10 mt-2 max-w-xs text-center text-sm leading-7 text-slate-500">
              Create a new account to track balances, budgets, and transactions.
            </p>
          </div>
        </CreateAccountDrawer>

        {/* ACCOUNT LIST */}
        {accounts.length > 0 ? (
          (accounts).map((account) => (
            <AccountCard
              key={account._id}
              account={account}
              refreshAccounts={fetchAccounts}
            />
          ))
        ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-[2rem] border border-white/5 bg-[#0b1d36]/60 px-10 py-24 text-center backdrop-blur-2xl">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_35px_rgba(45,212,191,0.08)]">
                    <Wallet className="h-10 w-10 text-teal-300" />
                </div>

                <h3 className="text-3xl font-black tracking-tight text-white">
                    No Accounts Found
                </h3>

                <p className="mt-4 max-w-md text-lg leading-8 text-slate-500">
                    Start by creating your first account to begin tracking your
                    finances with AI-powered insights.
                </p>
            </div>
        )}
        </div>
    </div>
  );
};

export default DashboardPage;
