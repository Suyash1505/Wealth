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

import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Clock,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Trash,
  X,
} from "lucide-react";

import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { bulkDeleteTransactions } from "@/lib/api/transaction";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionTable = ({ transactions, refreshTransaction }) => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const filteredAndSortedTransaction =
    useMemo(() => {
      let results = [...transactions];

      // APPLY SEARCH FLILTER
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        results = results.filter((transaction) =>
          transaction.description?.toLowerCase().includes(searchLower),
        );
      }

      // APPLY RECURRING FLILTER
      if (recurringFilter) {
        results = results.filter((transaction) => {
          if (recurringFilter === "recurring") {
            return transaction.isRecurring;
          }
          return !transaction.isRecurring;
        });
      }

      // APPLY TYPE FILTER
      if (typeFilter) {
        results = results.filter(
          (transaction) => transaction.type === typeFilter,
        );
      }

      // APPLY SORTING
      results.sort((a, b) => {
        let comparision = 0;

        switch (sortConfig.field) {
          case "date":
            comparision = new Date(a.date) - new Date(b.date);
            break;

          case "amount":
            comparision =
              parseFloat(a.amount?.$numberDecimal || a.amount || 0) -
              parseFloat(b.amount?.$numberDecimal || b.amount || 0);
            break;

          case "category":
            comparision = a.category.localeCompare(b.category);
            break;

          default:
            comparision = 0;
        }

        return sortConfig.direction === "asc" ? comparision : -comparision;
      });
      return results;
    }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]) ||
    [];

  const handleSorting = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field == field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedId((current) =>
      current.includes(id)
        ? current.filter((item) => item != id)
        : [...current, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedId((current) =>
      current.length === filteredAndSortedTransaction.length
        ? []
        : filteredAndSortedTransaction.map((t) => t._id),
    );
  };

  const handleBulkDelete = async () => {
    if (selectedId.length === 0) {
      toast.error("PLEASE SELECT TRANSACTION");
      return;
    }

    const result = await deleteFn(selectedId);
    if (result?.success) {
      toast.success("TRANSACTION DELETED");
      setSelectedId([]);

      console.log("REFRESH FUNCTION:",refreshTransaction);

    if (refreshTransaction) {
      await refreshTransaction();
    }
    }
  };

  useEffect( () => {
    if(deleted, !deleteLoading) {
      toast.success("TRANSACTION DELETED SUCCESSFULLY");
    }
  }, [deleted, deleteLoading])

  const handClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setSelectedId([]);
  };

  return (
    <div className="space-y-6">

      {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#9333ea"/>
      )}

      {/* ================= FILTERS ================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search Transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-50">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="INCOME">Income</SelectItem>
                <SelectItem value="EXPENSE">Expense</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={recurringFilter} onValueChange={setRecurringFilter}>
            <SelectTrigger className="w-50">
              <SelectValue placeholder="All Transaction" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="recurring">Recurring Only</SelectItem>
                <SelectItem value="non-recurring">
                  Non-recurring Only
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {selectedId.length > 0 && (
            <div>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={selectedId.length === 0 || deleteLoading}
                className="shadow-[0_0_25px_rgba(244,63,94,0.15)]"
              >
                <Trash className="h-4 w-4 mr-2" />

                {deleteLoading
                  ? "Deleting..."
                  : `Delete Selected (${selectedId.length})`}
              </Button>
            </div>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant="outline"
              onClick={handClearFilters}
              className="border-rose-500/15 bg-rose-500/10 text-rose-300 hover:bg-rose-500/15 hover:text-rose-200"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* ================= TRANSACTION ================= */}
      <div className="overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/90 backdrop-blur-2xl shadow-[0_0_60px_rgba(45,212,191,0.08)]">
        <div className="h-px w-full bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

        <Table>
          <TableCaption className="py-6 text-base text-slate-500">
            Your recent financial activity and transaction history.
          </TableCaption>

          {/* ================= HEADER ================= */}
          <TableHeader>
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="w-14 pl-6">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={
                    selectedId.length === filteredAndSortedTransaction.length &&
                    filteredAndSortedTransaction.length > 0
                  }
                />
              </TableHead>

              <TableHead
                className="cursor-pointer text-sm font-bold uppercase tracking-[0.18em] text-slate-400"
                onClick={() => handleSorting("date")}
              >
                <div className="flex items-center">
                  Date {""}
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                Description
              </TableHead>

              <TableHead
                className="cursor-pointer text-sm font-bold uppercase tracking-[0.18em] text-slate-400"
                onClick={() => handleSorting("category")}
              >
                <div className="flex items-center">
                  Category {""}
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer text-right text-sm font-bold uppercase tracking-[0.18em] text-slate-400"
                onClick={() => handleSorting("amount")}
              >
                <div className="flex items-center justify-end">
                  Amount{""}
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
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
                    <Checkbox
                      onCheckedChange={() => handleSelect(transaction._id)}
                      checked={selectedId.includes(transaction._id)}
                    />
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
                        background: categoryColors[transaction.category],
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
                      {transaction.type === "EXPENSE" ? "-" : "+"}₹
                      {parseFloat(
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
                            {RECURRING_INTERVALS[transaction.recurringInterval]}
                          </Badge>
                        </TooltipTrigger>

                        <TooltipContent className="rounded-xl border border-teal-500/15 bg-[#0b1d36] text-slate-300 backdrop-blur-2xl">
                          <div className="text-sm">
                            <div className="font-medium">Next Date:</div>
                            <div>
                              {format(
                                new Date(transaction.nextRecurringDate),
                                "PP",
                              )}
                            </div>
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
                              `/transaction/create?edit=${transaction._id}`,
                            )
                          }
                        >
                          Edit
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteFn([transaction._id])}
                        >
                          Delete
                        </DropdownMenuItem>
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
