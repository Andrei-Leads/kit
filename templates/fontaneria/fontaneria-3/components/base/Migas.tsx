import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx). Migas de pan:
 * `<nav aria-label="Migas de pan">` con una lista ordenada; la última lleva
 * `aria-current="page"`. Las legales pueden llevarlas: el `<h1>` lo pone core.
 *
 * Reestilada en «La furgoneta»: enlaces en negrita y subrayados (mínimo 44 × 44 px) y separador «›».
 * Tokens: --color-texto, --color-texto-suave, --color-foco.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("text-sm text-texto-suave", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-2">
              {ultima ? (
                <span aria-current="page" className="inline-flex min-h-11 items-center">
                  {m.texto}
                </span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 min-w-11 items-center font-semibold text-texto underline underline-offset-4 hover:decoration-2">
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
