"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
className,
size = "default",
...props
}) {

return (
  <SwitchPrimitive.Root
    data-slot="switch"
    data-size={size}
    className={cn(
    "peer relative inline-flex shrink-0 cursor-pointer items-center",
    "rounded-full transition-all duration-300",
    "border border-gray-200 bg-gray-200",
    "data-[state=checked]:bg-blue-600",
    "focus:outline-none focus:ring-2 focus:ring-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",

        "data-[size=default]:h-6 data-[size=default]:w-11",
        "data-[size=sm]:h-5 data-[size=sm]:w-9",

        className
      )}

      {...props}
  >

    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block rounded-full bg-white shadow-md",
        "transition-transform duration-300",

        "data-[size=default]:h-5 data-[size=default]:w-5",
        "data-[size=sm]:h-4 data-[size=sm]:w-4",

        "data-[state=checked]:translate-x-5",
        "data-[state=unchecked]:translate-x-0"
      )}
    />

  </SwitchPrimitive.Root>
  )
}

export { Switch }
