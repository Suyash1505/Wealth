"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 120,
  ...props
}) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}) {
  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      {...props}
    />
  );
}

function TooltipTrigger({
  ...props
}) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}

function TooltipContent({
  className,
  sideOffset = 10,
  children,
  ...props
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "relative z-50 overflow-hidden rounded-xl",
          "border border-teal-500/10",
          "bg-[#081726]/95",
          "px-4 py-3",
          "text-sm font-medium text-slate-300",
          "backdrop-blur-3xl",
          "shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_20px_rgba(45,212,191,0.08)]",

          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=closed]:zoom-out-95",

          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",

          "duration-200",
          className
        )}
        {...props}
      >
        {/* Top Glow Border */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent" />

        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_70%)]" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Arrow */}
        <TooltipPrimitive.Arrow
          className="fill-[#081726]"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
};