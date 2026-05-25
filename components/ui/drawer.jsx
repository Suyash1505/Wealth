"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

function Drawer({ ...props }) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[#020817]/80 backdrop-blur-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "duration-500",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />

      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex flex-col overflow-hidden",
          "border border-teal-500/15 bg-[#0b1d36]/95 backdrop-blur-2xl",
          "shadow-[0_0_80px_rgba(45,212,191,0.10)]",
          "transition-all duration-500",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:rounded-b-[2rem]",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:rounded-t-[2.5rem]",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-[90%] sm:max-w-xl data-[vaul-drawer-direction=right]:rounded-l-[2rem]",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-[90%] sm:max-w-xl data-[vaul-drawer-direction=left]:rounded-r-[2rem]",
          className,
        )}
        {...props}
      >
        {/* Top Glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent" />

        {/* Background Glow */}
        <div className="absolute left-[-10%] top-[-20%] h-75 w-75 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="absolute right-[-10%] bottom-[-20%] h-75 w-75 rounded-full bg-amber-400/10 blur-3xl" />

        {/* Drag Handle */}
        <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-linear-to-r from-teal-400 to-emerald-400 shadow-[0_0_15px_rgba(45,212,191,0.35)] group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />

        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "relative flex flex-col gap-2 border-b border-white/5 px-6 pb-5 pt-6",
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col gap-4 border-t border-white/5 px-6 py-5",
        className,
      )}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-3xl font-black tracking-tight text-white", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-base leading-7 text-slate-400", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
