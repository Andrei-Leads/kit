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
 * `aria-current="page"`. En electricidad-7, separador «›» y enlaces con zona táctil de 44 px.
 *
 * Tokens: --color-texto, --color-texto-suave, --color-foco.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("text-sm text-texto-suave", className)}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 p-0">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex min-w-0 items-center gap-2">
              {ultima ? (
                <span aria-current="page" className="py-3 text-texto">
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
