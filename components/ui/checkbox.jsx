"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-300 outline-none",
        "hover:border-teal-400/20 hover:bg-teal-500/3",
        "focus-visible:border-teal-400/30 focus-visible:ring-2 focus-visible:ring-teal-400/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-teal-400/20",
        "data-[state=checked]:bg-linear-to-br data-[state=checked]:from-teal-400 data-[state=checked]:via-emerald-400 data-[state=checked]:to-lime-400",
        "data-[state=checked]:text-[#04111f]",
        "data-[state=checked]:shadow-[0_0_20px_rgba(45,212,191,0.25)]",
        "aria-invalid:border-rose-400/40 aria-invalid:ring-2 aria-invalid:ring-rose-400/10",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        <CheckIcon className="h-3.5 w-3.5 stroke-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
