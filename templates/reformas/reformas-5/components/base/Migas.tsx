import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx). Migas de pan con «›»;
 * la última lleva `aria-current="page"`. Enlaces de 44 px de alto (objetivo táctil).
 *
 * Tokens: --color-texto, --color-texto-suave, --color-foco.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("text-[15px] text-texto-suave", className)}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 p-0">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href + m.texto} className="flex items-center gap-2">
              {ultima ? (
                <span aria-current="page">{m.texto}</span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center underline">
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
