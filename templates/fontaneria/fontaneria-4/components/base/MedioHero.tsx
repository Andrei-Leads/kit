import type { Imagen, VideoHero } from "@andrei-leads/core";

import { Foto, type Proporcion } from "./Foto";

type Props = {
  /** `config.videoHero`. Solo tipo proyecto. */
  video?: VideoHero;
  /** `config.imagenesHero[0]`: se usa si no hay vídeo. */
  imagen?: Imagen;
  sizes: string;
  proporcion?: Proporcion;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx). El medio del hero:
 * vídeo en bucle sin sonido con su póster, o una foto. Sin vídeo ni foto, no
 * pinta nada (el hero tipográfico lo resuelve el template).
 *
 * - El póster va con `Foto` y `preload`: es el LCP y lo que se ve mientras
 *   carga el vídeo, sin JavaScript o con «reducir movimiento».
 * - Con `prefers-reduced-motion: reduce`, el vídeo no se muestra.
 * - El vídeo es decorativo (`aria-hidden`): el `alt` del póster describe la escena.
 */
export function MedioHero({ video, imagen, sizes, proporcion = "relleno", className }: Props) {
  if (video) {
    return (
      <Foto imagen={video.poster} sizes={sizes} proporcion={proporcion} preload className={className}>
        <video
          className="absolute inset-0 size-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          {video.srcAv1 && <source src={video.srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />}
          <source src={video.src} type="video/mp4" />
        </video>
      </Foto>
    );
  }
  if (imagen) return <Foto imagen={imagen} sizes={sizes} proporcion={proporcion} preload className={className} />;
  return null;
}
