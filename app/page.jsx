"use client";

import HeroSection from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData } from "@/data/landing";

import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <HeroSection />

      {/* ================= STATS ================= */}
      <section className="relative overflow-hidden py-28">
        <div className="mx-auto max-w-375 px-6 sm:px-10 lg:px-16">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-500/15 bg-[#0b1d36]/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(45,212,191,0.08)]">
            {/* Top Border Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-4">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className={`group relative flex flex-col items-center justify-center px-8 py-14 transition-all duration-300 hover:bg-white/2
                    ${index !== statsData.length - 1 ? "border-b border-white/5 md:border-b-0 md:border-r md:border-r-white/5" : ""}`}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.08),transparent_70%)]" />

                  {/* Value */}
                  <div className="relative z-10 mb-3 bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-6xl">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="relative z-10 text-base font-medium tracking-wide text-slate-400 md:text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative overflow-hidden py-32">
        <div className="mx-auto max-w-375 px-6 sm:px-10 lg:px-16">
          {/* Heading */}
          <div className="mb-20 max-w-5xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-teal-400" />

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                Features
              </span>
            </div>

            <h2 className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              Everything You Need to{" "}
              <span className="bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                Master Money
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-400">
              From automatic expense categorization to AI-generated budget
              recommendations — FlowMint handles the heavy lifting.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 p-0 backdrop-blur-2xl transition-all duration-500 hover:border-teal-400/30 hover:shadow-[0_0_45px_rgba(45,212,191,0.14)]"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.10),transparent_65%)]" />

                <CardContent className="relative z-10 flex h-full flex-col p-10">
                  {/* Icon */}
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/5 bg-linear-to-br from-teal-500/15 via-emerald-500/10 to-lime-500/5 shadow-[0_0_35px_rgba(45,212,191,0.08)]">
                    <div className="text-teal-300 [&_svg]:h-9 [&_svg]:w-9 [&_svg]:stroke-[2.2]">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-5 text-3xl font-bold tracking-tight text-white">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg leading-9 text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative overflow-hidden py-32">
        <div className="mx-auto max-w-375 px-6 sm:px-10 lg:px-16">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div>
              {/* Label */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-10 bg-teal-400" />

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                  How It Works
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                Up and running{" "}
                <span className="bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                  in minutes
                </span>
              </h2>

              {/* Description */}
              <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-400">
                No complicated setup. Connect your accounts and let FlowMint's
                AI engine do the rest.
              </p>

              {/* Steps */}
              <div className="mt-16 space-y-10">
                {howItWorksData.map((work, index) => (
                  <div
                    key={index}
                    className="group relative flex gap-6 border-b border-white/5 pb-10 last:border-none"
                  >
                    {/* Step Number */}
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-xl font-black transition-all duration-500 ${
                        index === 0
                          ? "border-teal-400/30 bg-linear-to-br from-teal-400 to-emerald-500 text-[#03111f] shadow-[0_0_35px_rgba(45,212,191,0.25)]"
                          : "border-teal-500/10 bg-[#0b1d36] text-teal-300"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className={`mb-3 text-3xl font-bold tracking-tight transition-colors duration-300 ${
                          index === 0 ? "text-teal-300" : "text-white"
                        }`}
                      >
                        {work.title}
                      </h3>

                      <p className="max-w-2xl text-lg leading-9 text-slate-400">
                        {work.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT DASHBOARD MOCKUP */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-teal-500/10 blur-3xl" />

              {/* Card */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-500/15 bg-[#0b1d36]/90 backdrop-blur-2xl shadow-[0_0_60px_rgba(45,212,191,0.08)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-teal-400 to-emerald-500 shadow-[0_0_20px_rgba(45,212,191,0.25)]">
                      ⚡
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-teal-300">
                        FlowMint
                      </span>

                      <span className="text-2xl font-bold text-white">
                        Dashboard
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live
                  </div>
                </div>

                {/* Chart Area */}
                <div className="p-8">
                  <div className="mb-10">
                    <div className="mb-6 text-lg text-slate-500">
                      Income vs Spending Overview
                    </div>

                    <div className="flex items-end gap-3">
                      {[
                        { income: 80, expense: 45 },
                        { income: 95, expense: 52 },
                        { income: 88, expense: 49 },
                        { income: 110, expense: 58 },
                        { income: 96, expense: 50 },
                        { income: 118, expense: 56 },
                      ].map((bar, index) => (
                        <div
                          key={index}
                          className="flex flex-1 flex-col items-center"
                        >
                          {/* Income Bar */}
                          <div
                            className="w-full rounded-t-2xl border border-teal-300/10 bg-linear-to-b from-teal-300 via-teal-400 to-teal-600 shadow-[0_0_25px_rgba(45,212,191,0.18)]"
                            style={{ height: `${bar.income}px` }}
                          />

                          {/* Expense Bar */}
                          <div
                            className="mt-1.5 w-full rounded-b-2xl border border-rose-300/10 bg-linear-to-b from-rose-400 via-pink-500 to-rose-700 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                            style={{ height: `${bar.expense}px` }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex justify-between px-2 text-sm text-slate-500">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>

                  {/* Transactions */}
                  <div className="space-y-4">
                    {[
                      {
                        name: "Amazon Fresh",
                        category: "Groceries",
                        amount: "-$84.20",
                        color: "text-rose-400",
                        icon: "🛒",
                      },
                      {
                        name: "Salary Deposit",
                        category: "Income",
                        amount: "+$4,200",
                        color: "text-emerald-400",
                        icon: "💼",
                      },
                      {
                        name: "Starbucks",
                        category: "Dining",
                        amount: "-$6.50",
                        color: "text-rose-400",
                        icon: "☕",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/3 px-5 py-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-teal-500/15 to-emerald-500/10 text-xl">
                            {item.icon}
                          </div>

                          <div>
                            <div className="text-xl font-semibold text-white">
                              {item.name}
                            </div>

                            <div className="text-sm text-slate-500">
                              {item.category}
                            </div>
                          </div>
                        </div>

                        <div className={`text-2xl font-bold ${item.color}`}>
                          {item.amount}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Insight */}
                  <div className="mt-6 rounded-2xl border border-teal-500/20 bg-teal-500/10 px-6 py-5 text-lg leading-8 text-teal-200">
                    ✨ AI Insight: Your dining spend is 22% above target this
                    month. Skipping 3 restaurant visits could save you $180.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden py-32">
        <div className="mx-auto max-w-375 px-6 sm:px-10 lg:px-16">
          <div className="relative overflow-hidden rounded-[3rem] border border-teal-500/15 bg-[#0b1d36]/85 px-8 py-24 text-center backdrop-blur-2xl shadow-[0_0_80px_rgba(45,212,191,0.08)] md:px-20">
            {/* Top Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent" />

            {/* Background Mesh */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.08),transparent_30%)]" />

            {/* Small Label */}
            <div className="relative z-10 mb-6 inline-flex items-center gap-3 rounded-full border border-teal-500/20 bg-teal-500/10 px-6 py-3">
              <div className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.9)]" />

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                Start Today
              </span>
            </div>

            {/* Heading */}
            <h2 className="relative z-10 mx-auto max-w-5xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              Ready to Take Control of{" "}
              <span className="bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                Your Finances?
              </span>
            </h2>

            {/* Description */}
            <p className="relative z-10 mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-400">
              Join thousands of users already managing their money smarter with
              AI-powered insights, predictive analytics, and real-time financial
              intelligence.
            </p>

            {/* Buttons */}
            <div className="relative z-10 mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link href="/dashboard">
                <Button className="h-16 rounded-2xl border border-teal-300/20 bg-linear-to-r from-teal-400 via-emerald-400 to-lime-400 px-10 text-lg font-bold text-[#04111f] shadow-[0_0_35px_rgba(45,212,191,0.30)] transition-all duration-500 hover:shadow-[0_0_55px_rgba(45,212,191,0.45)]">
                  Start Free Trial
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-16 rounded-2xl border border-white/10 bg-white/3 px-10 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-teal-400/20 hover:bg-teal-500/10 hover:text-teal-300"
                >
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
