import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { resenasTexto } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** «★ 4,8 · 96 reseñas en Google» en una línea. Sin valoración, nada. */
export function Valoracion({ valoracion, className }: { valoracion: SiteConfig["valoracion"]; className?: string }) {
  if (!valoracion) return null;
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-[15px] leading-[1.3] lg:text-base", className)}>
      <span aria-hidden="true" className="text-lg text-primario-texto">
        ★
      </span>
      <strong>{mediaVisible(valoracion.media)}</strong>
      <span className="text-texto-suave">· {resenasTexto(valoracion.total)} en Google</span>
    </p>
  );
}
