import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap backdrop-blur-xl transition-all duration-300 [&>svg]:pointer-events-none [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "border-teal-400/10 bg-teal-500/10 text-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.08)] hover:bg-teal-500/15",

        secondary:
          "border-white/5 bg-white/[0.03] text-slate-300 hover:bg-white/[0.05]",

        destructive:
          "border-rose-400/10 bg-rose-500/10 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.08)] hover:bg-rose-500/15",

        outline:
          "border-white/10 bg-transparent text-slate-300 hover:border-teal-400/20 hover:bg-teal-500/[0.03] hover:text-teal-300",

        ghost:
          "border-transparent bg-transparent text-slate-400 hover:bg-white/[0.03] hover:text-white",

        link: "border-transparent bg-transparent p-0 text-teal-300 underline-offset-4 hover:underline",

        success:
          "border-emerald-400/10 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(74,222,128,0.08)] hover:bg-emerald-500/15",

        warning:
          "border-amber-400/10 bg-amber-500/10 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.08)] hover:bg-amber-500/15",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant = "default", asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
