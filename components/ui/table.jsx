"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <table
        data-slot="table"
        className={cn("w-full text-sm", className)}
        {...props}
      />{" "}
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-gray-50 border-b border-gray-200", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-gray-50 border-t border-gray-200 font-medium",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-gray-100 transition-all duration-200",
        "hover:bg-blue-50/60 hover:scale-[1.001]",
        "data-[state=selected]:bg-blue-100",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-4 py-3 text-gray-700 align-middle", className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
