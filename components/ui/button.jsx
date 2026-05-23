import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* ── Primary: teal → emerald gradient (FlowMint brand) ── */
        default:
          "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(13,148,136,0.35)] hover:shadow-[0_0_32px_rgba(13,148,136,0.55)] hover:scale-[1.02] active:scale-[0.98]",

        /* ── Destructive ── */
        destructive:
          "bg-red-600/90 text-white hover:bg-red-600 shadow-md hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]",

        /* ── Outline: teal-tinted border ── */
        outline:
          "border border-teal-500/30 bg-transparent text-foreground hover:bg-teal-500/8 hover:border-teal-400/60 shadow-sm",

        /* ── Secondary: deep navy surface ── */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",

        /* ── Ghost ── */
        ghost:
          "hover:bg-teal-500/10 hover:text-teal-300",

        /* ── Link ── */
        link:
          "text-teal-400 underline-offset-4 hover:underline hover:text-teal-300",

        /* ── Glass: dark-mode glassmorphism ── */
        glass:
          "bg-white/5 backdrop-blur-xl border border-white/10 shadow-md hover:bg-white/10 hover:border-teal-400/30 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]",

        /* ── Gold accent (for premium / upgrade CTAs) ── */
        gold:
          "bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_32px_rgba(245,158,11,0.55)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default:  "h-10 px-5",
        xs:       "h-7 px-2 text-xs",
        sm:       "h-8 px-3",
        lg:       "h-11 px-6 text-base",
        icon:     "h-10 w-10",
        "icon-xs": "h-6 w-6",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }