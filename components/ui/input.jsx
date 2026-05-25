import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-14 w-full min-w-0 rounded-2xl border border-white/10 bg-white/3 px-5 text-base font-medium text-white backdrop-blur-xl transition-all duration-300 outline-none",
        "placeholder:text-slate-500",
        "selection:bg-teal-400 selection:text-[#04111f]",
        "hover:border-teal-400/20 hover:bg-teal-500/2",
        "focus:border-teal-400/30 focus:bg-teal-500/3 focus:ring-2 focus:ring-teal-400/10",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:mr-4 file:rounded-xl file:border-0 file:bg-teal-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-teal-300",
        "aria-invalid:border-rose-400/40 aria-invalid:ring-2 aria-invalid:ring-rose-400/10",
        className
      )}
      {...props}
    />
  )
}

export { Input }