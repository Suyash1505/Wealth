import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const DashboardLayout = ({ children }) => {

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 lg:px-14">
      <div className="relative mb-10 flex flex-col gap-6 border-b border-white/5 pb-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          {/* Label */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-teal-400" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Financial Overview
            </span>

          </div>

          <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
            Financial{" "}
            <span className="bg-linear-to-r from-teal-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Monitor spending, track transactions, and unlock AI-powered financial intelligence in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-5 py-4 backdrop-blur-xl">
          <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
            System Active
          </span>
        </div>
      </div>

      {/* Content */}
      <Suspense
        fallback={
          <div className="relative overflow-hidden rounded-2xl border border-teal-500/10 bg-[#0b1d36]/70 p-6 backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between">

              <div className="text-lg font-semibold text-slate-300">
                Loading Dashboard
              </div>

              <div className="text-sm text-slate-500">
                Fetching live data...
              </div>
            </div>

            <BarLoader
              width={"100%"}
              color="#2dd4bf"
              height={6}
            />
          </div>
        }
      >

        <div className="relative">
          {children}
        </div>

      </Suspense>
    </div>
  );
};

export default DashboardLayout;