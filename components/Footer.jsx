"use client";

import Link from "next/link";
import {
  Github,
  Linkedin,
  ArrowUpRight,
  Layers3
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/10">

      {/* Top Border Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-10 py-24 sm:px-16 lg:px-24 xl:px-32">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">

          {/* Brand */}
          <div className="max-w-md space-y-8">

            <Link
              href="/"
              className="group flex items-center gap-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 shadow-[0_0_35px_rgba(45,212,191,0.35)] transition-transform duration-300 group-hover:scale-105">
                <Layers3 className="h-7 w-7 text-[#03111f]" />
              </div>

              <div>
                <h2 className="gradient-title text-4xl font-black tracking-tight">
                  FlowMint
                </h2>
              </div>
            </Link>

            <p className="text-lg leading-9 text-slate-400">
              AI-powered financial intelligence designed to help
              you track spending, optimize budgets, and grow
              wealth with real-time insights.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-5">

              <a
                href="https://github.com/Suyash1505"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:bg-teal-500/10"
              >
                < Github className="h-5 w-5 text-slate-300 transition-colors duration-300 group-hover:text-teal-300" />
              </a>

              <a
                href="https://www.linkedin.com/in/suyash-mukesh-shrivastava-a0666a264/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:bg-teal-500/10"
              >
                <Linkedin className="h-5 w-5 text-slate-300 transition-colors duration-300 group-hover:text-teal-300" />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">

          <p className="text-[15px] text-slate-500">
            © {new Date().getFullYear()} FlowMint, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-8 text-[15px]">
            <Link
              href="/privacy"
              className="text-slate-500 transition-colors duration-300 hover:text-teal-300"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 transition-colors duration-300 hover:text-teal-300"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="text-slate-500 transition-colors duration-300 hover:text-teal-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;