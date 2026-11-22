import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Enlace de navegación «Texto →» con línea de 1 px y flecha que se desplaza 5 px. Nunca de contacto. */
export function EnlaceFlecha({ href, children, externo, className }: { href: string; children: ReactNode; externo?: boolean; className?: string }) {
  const contenido = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="flecha">
        →
      </span>
    </>
  );
  return externo ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("enlace-flecha", className)}>
      {contenido}
    </a>
  ) : (
    <Link href={href} className={cn("enlace-flecha", className)}>
      {contenido}
    </Link>
  );
}
