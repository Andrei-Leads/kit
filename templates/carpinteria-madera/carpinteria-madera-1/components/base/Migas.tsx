import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), reestilada en «Veta» (encargo §8): en
 * cursiva serif de 15 px, separador «/» y enlaces de 44 px de alto (decisión aprobada en reformas).
 * `<nav aria-label="Migas de pan">` con una lista ordenada; la última lleva `aria-current="page"`.
 * Las legales pueden llevarlas: el `<h1>` lo pone core.
 *
 * Tokens: --color-texto, --color-texto-suave, --color-foco.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("font-titulo text-[15px] leading-[1.4] text-texto-suave italic", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-1.5">
              {ultima ? (
                <span aria-current="page">{m.texto}</span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center text-texto-suave underline underline-offset-4 hover:text-texto">
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
