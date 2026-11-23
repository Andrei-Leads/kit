import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  /** De la home a la página actual. La última es la página actual (sin enlace). */
  migas: readonly Ancla[];
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), en versalitas de 12 px (encargo §8).
 * `<nav aria-label="Migas de pan">` con lista ordenada; la última lleva `aria-current`.
 */
export function Migas({ migas, className }: Props) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("text-xs font-medium tracking-[0.12em] text-texto-suave uppercase", className)}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2.5 gap-y-0 p-0">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-2.5">
              {ultima ? (
                <span aria-current="page" className="text-texto">
                  {m.texto}
                </span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">
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
