import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** enlace-flecha (encargo §8.4): solo para navegar, nunca para contactar. */
export function EnlaceFlecha({ href, children, className, externo }: { href: string; children: ReactNode; className?: string; externo?: boolean }) {
  const contenido = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="flecha">
        →
      </span>
    </>
  );
  if (externo) {
    return (
      <a href={href} className={cn("enlace-flecha", className)} rel="noopener">
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={cn("enlace-flecha", className)}>
      {contenido}
    </Link>
  );
}

/** Flecha de una fila o tarjeta que ya es enlace (se mueve con `.grupo-flecha`). */
export function Flecha({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-3 border-b border-current text-[15px] font-medium">
      {children}
      <span aria-hidden="true" className="flecha">
        →
      </span>
    </span>
  );
}
