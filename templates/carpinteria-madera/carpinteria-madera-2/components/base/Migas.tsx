import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), reestilada: hereda el color (crema sobre
 * el campo pleno, texto suave sobre claro), separador «›» y enlaces de 44 px de alto.
 * `<nav aria-label="Migas de pan">` con lista ordenada; la última lleva `aria-current="page"`.
 *
 * Tokens: --color-foco.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-1.5">
              {ultima ? (
                <span aria-current="page" className="font-semibold">
                  {m.texto}
                </span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
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
