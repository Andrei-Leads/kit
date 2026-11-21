import type { SiteConfig } from "@andrei-leads/core";

import { textosValoracion } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** «4,9 ★ · 211 reseñas en Google» en una línea. Sin `valoracion`, nada. */
export function Valoracion({ valoracion, className }: { valoracion?: SiteConfig["valoracion"]; className?: string }) {
  if (!valoracion) return null;
  const { media, total } = textosValoracion(valoracion);
  return (
    <p className={cn("m-0 text-[0.9375rem] text-texto-suave", className)}>
      <strong className="font-bold text-texto">
        {media}
        <span aria-hidden="true"> ★</span>
        <span className="sr-only"> de 5</span>
      </strong>{" "}
      · {total}
    </p>
  );
}
