import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { totalResenas } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** Línea de confianza: «★ 4,9 · 74 reseñas en Google». Sin valoración, nada. */
export function Valoracion({ valoracion, className }: { valoracion: SiteConfig["valoracion"]; className?: string }) {
  if (!valoracion) return null;
  return (
    <p className={cn("flex items-center gap-1.5 text-[15px] leading-5 text-texto-suave", className)}>
      <span aria-hidden="true" className="text-foco">
        ★
      </span>
      <span>
        <strong className="font-[620] text-texto">{mediaVisible(valoracion.media)}</strong> · {totalResenas(valoracion.total)} en Google
      </span>
    </p>
  );
}
