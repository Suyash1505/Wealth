"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      {/* Main Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-teal-500/15 bg-[#0b1d36]/85 p-10 text-center backdrop-blur-2xl shadow-[0_0_80px_rgba(45,212,191,0.08)] md:p-16">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />

        {/* Icon */}
        <div className="relative z-10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-teal-400/20 bg-linear-to-br from-teal-400/20 via-emerald-400/10 to-lime-400/5 shadow-[0_0_40px_rgba(45,212,191,0.12)]">
          <AlertTriangle className="h-11 w-11 text-teal-300" />
        </div>

        {/* 404 */}
        <h1 className="relative z-10 bg-linear-to-r from-teal-300 via-emerald-300 to-lime-300 bg-clip-text text-8xl font-black tracking-tight text-transparent md:text-[9rem]">
          404
        </h1>

        {/* Title */}
        <h2 className="relative z-10 mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="relative z-10 mx-auto mt-6 max-w-xl text-lg leading-9 text-slate-400 md:text-xl">
          The page you're looking for doesn't exist, was moved, or may never
          have been created.
        </p>

        {/* Buttons */}
        <div className="relative z-10 mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link href="/">
            <Button className="h-16 rounded-2xl border border-teal-300/20 bg-linear-to-r from-teal-400 via-emerald-400 to-lime-400 px-10 text-lg font-bold text-[#04111f] shadow-[0_0_35px_rgba(45,212,191,0.30)] transition-all duration-500 hover:shadow-[0_0_55px_rgba(45,212,191,0.45)]">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="outline"
              className="h-16 rounded-2xl border border-white/10 bg-white/3 px-10 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-teal-400/20 hover:bg-teal-500/10 hover:text-teal-300"
            >
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Bottom Text */}
        <div className="relative z-10 mt-10 text-sm tracking-wide text-slate-500">
          Error Code: FLOWMINT_404
        </div>
      </div>
    </section>
  );
}
