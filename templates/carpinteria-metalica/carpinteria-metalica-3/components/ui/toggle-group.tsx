"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  );
}

/** Opción: reposo con borde de chapa; activa con relleno tinta y texto blanco. ≥ 44 px. */
function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border-2 border-tinta bg-tarjeta px-4 py-1.5 text-base font-semibold text-tinta transition-colors hover:bg-papel data-[state=on]:bg-tinta data-[state=on]:text-white",
        className
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
