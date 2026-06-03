"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryColors } from "@/data/categories";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ArrowDownRight, ArrowUpRight, Clock, MoreHorizontal, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
  const filteredAndSortedTransaction = transactions || [];
  const router = useRouter();

  const handleSorting = () => {};

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(45,212,191,0.06)]">
        <div className="h-px w-full bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

        <Table>
          <TableCaption className="py-6 text-base text-slate-500">
            Your recent financial activity and transaction history.
          </TableCaption>

          {/* ================= HEADER ================= */}
          <TableHeader>
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="w-14 pl-6">
                <Checkbox />
              </TableHead>

              <TableHead
                className="cursor-pointer text-sm font-bold uppercase tracking-[0.18em] text-slate-400"
                onClick={() => handleSorting("date")}
              >
                <div className="flex items-center">Date</div>
              </TableHead>

              <TableHead className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                Description
              </TableHead>

              <TableHead
                className="cursor-pointer text-sm font-bold uppercase tracking-[0.18em] text-slate-400"
                onClick={() => handleSorting("category")}
              >
                <div className="flex items-center">Category</div>
              </TableHead>

              <TableHead
                className="cursor-pointer text-right text-sm font-bold uppercase tracking-[0.18em] text-slate-400"
                onClick={() => handleSorting("amount")}
              >
                <div className="flex items-center justify-end">Amount</div>
              </TableHead>

              <TableHead className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                Type
              </TableHead>

              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>

          {/* ================= BODY ================= */}
          <TableBody>
            {filteredAndSortedTransaction.length === 0 ? (
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableCell colSpan={7} className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-teal-400/10 bg-linear-to-br from-teal-500/15 to-emerald-500/10 shadow-[0_0_35px_rgba(45,212,191,0.08)]">
                      <Clock className="h-9 w-9 text-teal-300" />
                    </div>

                    <h3 className="text-3xl font-black tracking-tight text-white">
                      No Transactions Found
                    </h3>

                    <p className="mt-4 max-w-md text-lg leading-8 text-slate-500">
                      Your transactions will appear here once you start tracking
                      expenses and income.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransaction.map((transaction) => (
                <TableRow
                  key={transaction._id}
                  className="border-b border-white/5 transition-all duration-300 hover:bg-white/2"
                >
                  {/* CHECKBOX */}
                  <TableCell className="pl-6">
                    <Checkbox />
                  </TableCell>

                  {/* DATE */}
                  <TableCell className="font-medium text-slate-300">
                    {format(new Date(transaction.date), "PP")}
                  </TableCell>

                  {/* DESCRIPTION */}
                  <TableCell>
                    <div className="max-w-65">
                      <div className="truncate text-lg font-semibold text-white">
                        {transaction.description}
                      </div>
                    </div>
                  </TableCell>

                  {/* CATEGORY */}
                  <TableCell className="capitalize">
                    <span
                      style={{
                        background:
                          categoryColors[transaction.category]
                      }}
                      className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>

                  {/* AMOUNT */}
                  <TableCell className="text-right">
                    <div
                      className={`inline-flex items-center gap-2 text-xl font-black tracking-tight ${
                        transaction.type === "EXPENSE"
                          ? "text-rose-300"
                          : "text-emerald-300"
                      }`}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}

                      {transaction.type === "EXPENSE" ? "-" : "+"}

                        ₹{parseFloat(
                        transaction.amount?.$numberDecimal ||
                          transaction.amount,
                      ).toFixed(2)}
                    </div>
                  </TableCell>

                  {/* RECURRING */}
                  <TableCell>
                    {transaction.isRecurring ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className="flex w-fit items-center gap-2 rounded-full border border-teal-400/10 bg-teal-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-teal-300 hover:bg-teal-500/15">
                            <RefreshCcw className="h-3.5 w-3.5" />
                                {RECURRING_INTERVALS[
                                    transaction.recurringInterval
                                ]}
                          </Badge>
                        </TooltipTrigger>

                        <TooltipContent className="rounded-xl border border-teal-500/15 bg-[#0b1d36] text-slate-300 backdrop-blur-2xl">
                          <div className="text-sm">
                            <div className="font-medium">Next Date:</div>
                            <div>{format(new Date(transaction.nextRecurringDate), "PP")}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge className="flex w-fit items-center gap-2 rounded-full border border-white/5 bg-white/3 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        One-Time
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuLabel
                                onClick={() => 
                                    router.push(
                                        `/transaction/create?edit=${transaction._id}`
                                    )
                                }
                            >
                                Edit
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel
                                // onClick={() => 
                                //     deleteFn([transaction._id])
                                // }
                            >
                                Delete
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                  <TableCell />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
