import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), en mono de 13 px como pide el encargo:
 * «Inicio / Servicios / …». `<nav aria-label="Migas de pan">` con una lista ordenada; la última
 * lleva `aria-current="page"`. Enlaces subrayados de 44 px de alto.
 *
 * Tokens: --color-texto, --font-titulo, --color-foco.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("font-titulo text-[13px]", className)}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex min-h-11 items-center gap-2">
              {ultima ? (
                <span aria-current="page">{m.texto}</span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
                    {m.texto}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
