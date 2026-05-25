"use client";

import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";
import { setDefaultAccount } from "@/lib/api/account";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AccountCard = ({ account, refreshAccounts }) => {
  const { name, type, balance, _id, isDefault } = account;

  const formattedBalance = parseFloat(balance?.$numberDecimal || balance || 0);

  const {
    fn: updateDefaultFn,
    loading: updateDefaultLoading,
    data: updateAccount,
    error,
  } = useFetch(setDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.error("YOU NEED ATLEAST ONE DEFAULT ACCOUNT");
      return;
    }

    await updateDefaultFn(_id);
  };

  useEffect(() => {
    if (updateAccount?.success) {
      toast.success("DEFAULT ACCOUNT UPDATED SUCCESSFULLY!");
      refreshAccounts();
    }
  }, [updateAccount?.success]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "FAILED TO UPDATE ACCOUNT!");
    }
  }, [error]);

  return (
    <Link href={`/account/${_id}`}>
      <Card className="group relative overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 p-0 backdrop-blur-2xl transition-all duration-500 hover:border-teal-400/25 hover:shadow-[0_0_55px_rgba(45,212,191,0.12)]">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

        <div className="relative z-10 p-7">
          <div className="mb-8 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_30px_rgba(45,212,191,0.08)]">
                {isDefault ? (
                  <ShieldCheck className="h-8 w-8 text-teal-300" />
                ) : (
                  <Landmark className="h-8 w-8 text-teal-300" />
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-white capitalize">
                  {name}
                </h3>

                <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                  {type} ACCOUNT
                </p>
              </div>
            </div>

            {/* Default Switch */}
            <Switch
              checked={isDefault}
              onClick={(e) => {
                e.stopPropagation();
                handleDefaultChange(e);
              }}
              disabled={updateDefaultLoading}
            />
          </div>

          {/* BALANCE */}
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Current Balance
            </p>

            <div className="bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-5xl font-black tracking-tight text-transparent">
              ₹ {formattedBalance.toFixed(2)}
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between border-t border-white/5 pt-5">
            {/* Income */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/10 px-4 py-3">
              <ArrowUpRight className="h-5 w-5 text-emerald-300" />

              <span className="text-sm font-semibold text-emerald-300">
                Income
              </span>
            </div>

            {/* Expense */}
            <div className="flex items-center gap-3 rounded-xl border border-rose-400/10 bg-rose-400/10 px-4 py-3">
              <ArrowDownRight className="h-5 w-5 text-rose-300" />

              <span className="text-sm font-semibold text-rose-300">
                Expense
              </span>
            </div>
          </div>

          {/* Default Badge */}
          {isDefault && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal-400/15 bg-teal-500/10 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
                Default Account
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default AccountCard;
