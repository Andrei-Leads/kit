import type { Imagen, VideoHero } from "@andrei-leads/core";

import { Foto } from "./Foto";
import { VideoDiferido } from "./VideoDiferido";

type Props = {
  /** `config.videoHero`. Solo tipo proyecto. */
  video?: VideoHero;
  /** `config.imagenesHero[0]`: se usa si no hay vídeo. */
  imagen?: Imagen;
  sizes: string;
  className?: string;
  /** Capas encima del medio (velo, texto…). */
  children?: React.ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx), reestilada en «Tu casa»
 * (encargo §5): el póster (o la foto) se pinta en el servidor con next/image y
 * `preload` (es el LCP). El `<video muted loop playsInline preload="none">` lo monta
 * una isla mínima (`VideoDiferido`) después de `load`, solo sin «reducir movimiento»
 * ni `saveData`, con el botón de pausa redondo de 44 px. Sin JS, solo el póster.
 * La etiqueta de origen va abajo a la derecha, por encima de la curva.
 */
export function MedioHero({ video, imagen, sizes, className, children }: Props) {
  const foto = video?.poster ?? imagen;
  if (!foto) return null;
  return (
    <Foto imagen={foto} sizes={sizes} proporcion="relleno" preload posicionEtiqueta="abajo-derecha" className={className}>
      {video && <VideoDiferido src={video.src} srcAv1={video.srcAv1} />}
      {children}
    </Foto>
  );
}
