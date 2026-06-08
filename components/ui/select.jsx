"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Select({ ...props }) {
  return (
    <SelectPrimitive.Root
      data-slot="select"
      {...props}
    />
  )
}

function SelectGroup({ ...props }) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      {...props}
    />
  )
}

function SelectValue({ ...props }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl border border-teal-500/15 bg-[#0f223d]/80 px-5 text-base font-semibold text-slate-200 backdrop-blur-2xl shadow-[0_0_20px_rgba(45,212,191,0.04)] transition-all duration-300 outline-none",
        "hover:border-teal-400/30 hover:shadow-[0_0_25px_rgba(45,212,191,0.08)]",
        "focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[size=default]:h-14 data-[size=sm]:h-11",
        "[&_svg]:size-5 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        align={align}
        className={cn(
          "relative z-50 overflow-hidden rounded-[1.5rem] border border-teal-500/15 bg-[#081726]/95 text-white backdrop-blur-3xl",
          "shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_35px_rgba(45,212,191,0.08)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {/* Top Glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

        <SelectScrollUpButton />

        <SelectPrimitive.Viewport
          className={cn(
            "relative p-2",
            position === "popper" &&
              "min-w-(--radix-select-trigger-width)"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-300 outline-none transition-all duration-300",
        "hover:bg-teal-500/10 hover:text-teal-300",
        "focus:bg-teal-500/10 focus:text-teal-300",
        "data-[state=checked]:bg-teal-500/10",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>

      <span className="absolute right-4 flex h-5 w-5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4 text-emerald-300" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "my-2 h-px bg-teal-500/10",
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex items-center justify-center py-2 text-slate-500",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex items-center justify-center py-2 text-slate-500",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}