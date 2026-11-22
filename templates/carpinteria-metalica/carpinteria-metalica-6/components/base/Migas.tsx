import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), tal cual salvo los enlaces de 44 px de
 * alto y el separador «›» de la entrega. `<nav aria-label="Migas de pan">` con una lista ordenada;
 * la última lleva `aria-current="page"`. Las legales también las llevan: el `<h1>` lo pone core.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("text-sm text-texto-suave", className)}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex min-w-0 items-center gap-2">
              {ultima ? (
                <span aria-current="page" className="py-2.5 font-bold text-texto">
                  {m.texto}
                </span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center underline underline-offset-4">
                    {m.texto}
                  </Link>
                  <span aria-hidden="true">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
