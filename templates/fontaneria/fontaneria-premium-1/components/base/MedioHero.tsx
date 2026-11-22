import type { Imagen, VideoHero } from "@andrei-leads/core";

import { Foto } from "./Foto";
import { VideoHeroControl } from "./VideoHeroControl";

type Props = {
  /** `config.videoHero`. Solo tipo proyecto. */
  video?: VideoHero;
  /** `config.imagenesHero[0]`: se usa si no hay vídeo. */
  imagen?: Imagen;
  sizes: string;
  encuadre?: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx), en «Caudal» con el
 * control del encargo §8: el póster (o la foto) se pinta en el servidor con
 * next/image y `preload` (es el LCP). El `<video preload="none">` sin
 * `autoplay` en el HTML lo monta `VideoHeroControl` (≤ 1 KB) después de `load`,
 * solo sin «reducir movimiento» ni `Save-Data`, con botón de pausa de 44 px.
 * Sin JS, solo el póster. Sin vídeo ni foto, no pinta nada.
 */
export function MedioHero({ video, imagen, sizes, encuadre, className }: Props) {
  const foto = video?.poster ?? imagen;
  if (!foto) return null;
  return (
    <Foto imagen={foto} sizes={sizes} proporcion="relleno" preload posicionEtiqueta="hero" encuadre={encuadre} className={className}>
      {video && <VideoHeroControl src={video.src} srcAv1={video.srcAv1} />}
    </Foto>
  );
}
