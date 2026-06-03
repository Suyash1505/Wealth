"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div
      data-slot="table-container"
      className="relative overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(45,212,191,0.06)]"
    >
      {/* Top Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[-20%] h-62.5 w-62.5 rounded-full bg-teal-500/5 blur-3xl" />

      <div className="relative w-full overflow-x-auto">
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm text-white", className)}
          {...props}
        />
      </div>
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cn("border-b border-white/5 bg-white/2", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-white/5 bg-white/2 font-semibold text-white",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-white/5 transition-all duration-300",
        "hover:bg-white/2",
        "data-[state=selected]:bg-teal-500/10",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-6 py-5 align-middle text-base text-slate-300",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("py-6 text-base leading-7 text-slate-500", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
