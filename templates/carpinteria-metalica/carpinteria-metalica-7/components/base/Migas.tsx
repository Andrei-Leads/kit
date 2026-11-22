import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), reestilada para «Forja»: condensada en
 * mayúsculas con separador «/». La última lleva `aria-current="page"`.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("font-titulo text-[15px] font-bold tracking-[0.06em] text-texto-suave uppercase", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-2">
              {ultima ? (
                <span aria-current="page">{m.texto}</span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
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
