"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { endOfDay, format, startOfDay, subDays } from "date-fns";

import { useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DATE_RANGES = {
  "7D": {
    label: "Last 7 Days",
    days: 7,
  },

  "1M": {
    label: "Last Month",
    days: 30,
  },

  "3M": {
    label: "Last 3 Months",
    days: 90,
  },

  "6M": {
    label: "Last 6 Months",
    days: 180,
  },

  ALL: {
    label: "All Time",
    days: null,
  },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("1M");

  const filterData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();

    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (transaction) =>
        new Date(transaction.date) >= startDate &&
        new Date(transaction.date) <= endOfDay(now),
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");

      if (!acc[date]) {
        acc[date] = {
          date,
          income: 0,
          expense: 0,
        };
      }

      const amount = parseFloat(
        transaction.amount?.$numberDecimal || transaction.amount || 0,
      );

      if (transaction.type === "INCOME") {
        acc[date].income += amount;
      } else {
        acc[date].expense += amount;
      }

      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filterData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      {
        income: 0,
        expense: 0,
      },
    );
  }, [filterData]);

  return (
    <Card className="overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/85 backdrop-blur-2xl shadow-[0_0_60px_rgba(45,212,191,0.08)]">
      {/* Top Glow */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 px-8 py-6">
        <CardTitle className="text-3xl font-black tracking-tight text-white">
          Transaction Overview
        </CardTitle>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-55">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-8">
        {/* Summary Cards */}
        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Income */}
          <div className="rounded-[1.5rem] border border-emerald-500/10 bg-emerald-500/5 p-6">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-emerald-300">
              Total Income
            </p>

            <p className="text-4xl font-black tracking-tight text-emerald-300">
              ₹ {totals.income.toFixed(2)}
            </p>
          </div>

          {/* Expense */}
          <div className="rounded-[1.5rem] border border-rose-500/10 bg-rose-500/5 p-6">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-rose-300">
              Total Expense
            </p>

            <p className="text-4xl font-black tracking-tight text-rose-300">
              ₹ {totals.expense.toFixed(2)}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-teal-500/10 bg-teal-500/5 p-6">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-teal-300">
              Net Cash Flow
            </p>

            <p
              className={`text-4xl font-black tracking-tight ${
                totals.income - totals.expense >= 0
                  ? "text-teal-300"
                  : "text-rose-300"
              }`}
            >
              ₹ {(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-112.5 w-full rounded-[1.5rem] border border-white/5 bg-white/2 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filterData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickFormatter={(value) => `₹${value}`}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#081726",
                  border: "1px solid rgba(45,212,191,0.15)",
                  borderRadius: "18px",
                  color: "#fff",
                  backdropFilter: "blur(20px)",
                }}
                cursor={{
                  fill: "rgba(45,212,191,0.04)",
                }}
                formatter={(value, name) => [
                  `₹${Number(value).toFixed(2)}`,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />

              <Legend
                wrapperStyle={{
                  color: "#94a3b8",
                  paddingTop: 20,
                }}
              />

              <Bar
                dataKey="income"
                name="Income"
                fill="#2dd4bf"
                radius={[10, 10, 0, 0]}
              />

              <Bar
                dataKey="expense"
                name="Expense"
                fill="#fb7185"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountChart;
