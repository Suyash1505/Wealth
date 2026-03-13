import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",

  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02]",

        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-md",

        outline:
          "border border-gray-200 bg-white hover:bg-gray-50 shadow-sm",

        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200",

        ghost:
          "hover:bg-gray-100",

        link:
          "text-blue-600 underline-offset-4 hover:underline",

        glass:
          "bg-white/60 backdrop-blur-lg border border-white/40 shadow-md hover:bg-white/70",
      },
      size: {
        default: "h-10 px-5",
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
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
      {...props} />
  );
}

export { Button, buttonVariants }
