import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Arco tintado con la tesela de hidráulico (sin foto). Decorativo salvo lo que lleve dentro. */
export function ArcoTesela({ proporcion = "3/4", className, children }: { proporcion?: "3/4" | "4/5"; className?: string; children?: ReactNode }) {
  return (
    <div
      aria-hidden={children ? undefined : true}
      className={cn("tesela relative flex items-end overflow-hidden", proporcion === "4/5" ? "arco-4x5 aspect-[4/5]" : "arco aspect-[3/4]", className)}
    >
      {children}
    </div>
  );
}
