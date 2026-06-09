"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { updateBudget } from "@/lib/api/budget";

import { Check, Pencil, X } from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BudgetProgress = ({ budget, currenExpense, refreshBudget }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString() || "");

  const percentageUse = budget ? (currenExpense / budget) * 100 : 0;

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updateBudgetResponse,
    error,
  } = useFetch(updateBudget);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please Entre a Valid Amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  useEffect(() => {
    const refreshData = async () => {
      if (updateBudgetResponse?.success) {
        setIsEdited(false);
        await refreshBudget();

        toast.success("BUDGET UPDATED SUCCESSFULLY");
      }
    };

    refreshData();
  }, [updateBudgetResponse]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to Update Budget");
    }
  }, [error]);

  useEffect(() => {
    setNewBudget(budget?.toString() || "");
  }, [budget]);

  const handleCancel = () => {
    setNewBudget(budget.toString() || "");

    setIsEdited(false);
  };

  console.log("BUDGET PROP:", budget);

  return (
    <Card className="overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/85 backdrop-blur-2xl shadow-[0_0_60px_rgba(45,212,191,0.08)]">
      {/* Top Glow */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

      <CardHeader className="border-b border-white/5 px-8 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl font-black tracking-tight text-white">
              Monthly Budget
            </CardTitle>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {isEdited ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-40"
                    placeholder="Enter Amount..."
                    autoFocus
                    disabled={isLoading}
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleUpdateBudget}
                    className="rounded-xl border border-emerald-500/15 bg-emerald-500/10 hover:bg-emerald-500/15"
                    disabled={isLoading}
                  >
                    <Check className="h-4 w-4 text-emerald-300" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                    className="rounded-xl border border-rose-500/15 bg-rose-500/10 hover:bg-rose-500/15"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4 text-rose-300" />
                  </Button>
                </div>
              ) : (
                <>
                  <CardDescription className="text-lg text-slate-400">
                    {budget
                      ? `₹${currenExpense.toFixed(2)} of ₹${budget.toFixed(
                          2,
                        )} spent`
                      : "No Budget Set"}
                  </CardDescription>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEdited(true)}
                    className="h-8 w-8 rounded-xl border border-teal-500/10 bg-teal-500/10 hover:bg-teal-500/15"
                  >
                    <Pencil className="h-3.5 w-3.5 text-teal-300" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Status Badge */}
          {budget && (
            <div
              className={`rounded-2xl border px-4 py-3 text-center ${
                percentageUse >= 100
                  ? "border-rose-500/15 bg-rose-500/10"
                  : percentageUse >= 80
                    ? "border-amber-500/15 bg-amber-500/10"
                    : "border-teal-500/15 bg-teal-500/10"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                Usage
              </p>

              <p
                className={`mt-1 text-2xl font-black ${
                  percentageUse >= 100
                    ? "text-rose-300"
                    : percentageUse >= 80
                      ? "text-amber-300"
                      : "text-teal-300"
                }`}
              >
                {percentageUse.toFixed(0)}%
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Budget Progress */}
          {budget && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-400">
                  Budget Progress
                </span>

                <span
                  className={`text-sm font-bold ${
                    percentageUse >= 90
                      ? "text-rose-300"
                      : percentageUse >= 75
                        ? "text-amber-300"
                        : "text-emerald-300"
                  }`}
                >
                  {percentageUse.toFixed(1)}%
                </span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    percentageUse >= 90
                      ? "bg-linear-to-r from-rose-500 to-red-500"
                      : percentageUse >= 75
                        ? "bg-linear-to-r from-amber-400 to-yellow-500"
                        : "bg-linear-to-r from-teal-400 to-emerald-500"
                  }`}
                  style={{
                    width: `${Math.min(percentageUse, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Budget Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-teal-500/10 bg-teal-500/5 p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                Budget
              </p>

              <p className="text-2xl font-black text-white">
                ₹ {budget.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-rose-500/10 bg-rose-500/5 p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                Spent
              </p>

              <p className="text-2xl font-black text-rose-300">
                ₹ {currenExpense.toFixed(2)}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-emerald-500/10 bg-emerald-500/5 p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                Remaining
              </p>

              <p className="text-2xl font-black text-emerald-300">
                ₹{" "}
                {budget
                  ? Math.max(budget - currenExpense, 0).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
