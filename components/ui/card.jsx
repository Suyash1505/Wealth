import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] border border-teal-500/15 bg-[#0b1d36]/80 text-white backdrop-blur-2xl shadow-[0_0_40px_rgba(45,212,191,0.06)] transition-all duration-500",
        "hover:border-teal-400/25 hover:shadow-[0_0_55px_rgba(45,212,191,0.12)]",
        className,
      )}
      {...props}
    >
      {/* Top Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">{props.children}</div>
    </div>
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-3 px-8 pt-8 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-2xl font-black tracking-tight text-white", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-base leading-7 text-slate-400", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-8 pb-8", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-auto flex items-center border-t border-white/5 px-8 py-6",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
