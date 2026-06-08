"use client";

import useFetch from "@/hooks/useFetch";
import { getAccountDetails } from "@/lib/api/account";
import React, { Suspense, useEffect } from "react";
import { useParams } from "next/navigation";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";
import { Landmark, ArrowUpRight, Wallet } from "lucide-react";

const AccountsPage = () => {
  const params = useParams();
  const accountId = params.id;

  const { data: account, fn: getAccountFn } = useFetch(getAccountDetails);

  useEffect(() => {
    if (accountId) {
      getAccountFn(accountId);
    }
  }, [accountId]);

  return (
    <div className="space-y-10 m-5">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-500/15 bg-[#0b1d36]/85 p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(45,212,191,0.08)] md:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

        {/* Background Glow */}
        <div className="absolute left-[-10%] top-[-20%] h-70 w-70 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-70 w-70 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_35px_rgba(45,212,191,0.10)]">
              <Landmark className="h-12 w-12 text-teal-300" />
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-10 bg-teal-400" />

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                  Account Overview
                </span>
              </div>

              <h1 className="text-5xl font-black tracking-tight text-white capitalize md:text-7xl">
                {account?.name}
              </h1>

              {/* Type */}
              <p className="mt-5 text-lg font-medium tracking-wide text-slate-400">
                {account?.type &&
                  account.type.charAt(0) +
                    account.type.slice(1).toLowerCase()}{" "}
                Account
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[1.8rem] border border-teal-500/10 bg-white/3 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-teal-500/15 to-emerald-500/10">
                  <Wallet className="h-6 w-6 text-teal-300" />
                </div>

                <span className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Current Balance
                </span>
              </div>

              <div className="bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                ₹{" "}
                {account?.balance
                  ? parseFloat(
                      account.balance?.$numberDecimal || account.balance,
                    ).toFixed(2)
                  : "0.00"}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/5 bg-white/3 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/15 to-teal-500/10">
                  <ArrowUpRight className="h-6 w-6 text-emerald-300" />
                </div>

                <span className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Transactions
                </span>
              </div>

              <div className="text-4xl font-black tracking-tight text-white">
                {account?.transactionCount || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CHART SECTION ================= */}

      {/* ================= TRANSACTION TABLE ================= */}
      <Suspense
        fallback={
          <div className="overflow-hidden rounded-2xl border border-teal-500/10 bg-[#0b1d36]/70 p-6 backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-semibold text-slate-300">
                Loading Transactions
              </div>

              <div className="text-sm text-slate-500">Fetching records...</div>
            </div>

            <BarLoader width={"100%"} color="#2dd4bf" height={6} />
          </div>
        }
      >
        <TransactionTable
          transactions={account?.transactions || []}
          refreshTransactions={() => getAccountFn(accountId)}
        />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
