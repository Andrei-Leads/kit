import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), en mono (encargo §8): «Inicio / Servicios /
 * Puertas de madera». La última lleva `aria-current="page"`. Enlaces de 44 px de alto en móvil.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("font-titulo text-[12.5px] tracking-[0.03em] text-texto-suave", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {ultima ? (
                <span aria-current="page" className="text-texto">
                  {m.texto}
                </span>
              ) : (
                <Link href={m.href} className="inline-flex min-h-11 items-center text-texto-suave lg:min-h-8">
                  {m.texto}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
