import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Estrellas } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  valoracion: NonNullable<SiteConfig["valoracion"]>;
  /** «de 5» tras la media (bloque de reseñas). */
  deCinco?: boolean;
  /** Estrellas en el color del texto (sobre vídeo) o en barro cocido. */
  claras?: boolean;
  className?: string;
};

/** «★★★★★ 4,9 · 88 reseñas en Google» (resumen de la ficha; no va al JSON-LD). */
export function Valoracion({ valoracion, deCinco, claras, className }: Props) {
  const media = mediaVisible(valoracion.media);
  return (
    <p className={cn("m-0 flex flex-wrap items-center gap-x-2 text-base", className)}>
      <Estrellas puntuacion={valoracion.media} className={cn("text-[17px]", !claras && "text-acento")} />
      <span>
        <strong className="font-semibold">
          {media}
          {deCinco ? " de 5" : <span className="sr-only"> de 5</span>}
        </strong>{" "}
        · {valoracion.total} reseñas en Google
      </span>
    </p>
  );
}
