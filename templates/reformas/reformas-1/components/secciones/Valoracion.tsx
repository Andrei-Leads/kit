import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Estrellas } from "@/components/Iconos";
import { cn } from "@/lib/utils";

/** Línea de estrellas: «★★★★★ 4,8 · 127 reseñas en Google». Sin valoración, nada. */
export function Valoracion({ valoracion, className }: { valoracion: SiteConfig["valoracion"]; className?: string }) {
  if (!valoracion) return null;
  return (
    <p className={cn("flex items-center gap-2.5 text-sm", className)}>
      <Estrellas llenas={Math.round(valoracion.media)} />
      <span>
        {mediaVisible(valoracion.media)} · {valoracion.total} {valoracion.total === 1 ? "reseña" : "reseñas"} en Google
      </span>
    </p>
  );
}
