import type { Imagen, Video } from "@andrei-leads/core";

import { ControlVideo } from "@/components/ControlVideo";

import { Foto } from "./Foto";

type Props = {
  /** `videoPano` (o su respaldo `videoHero`). */
  video?: Video;
  /** Foto de respaldo sin vídeo (`imagenesHero[3]`). */
  imagen?: Imagen;
  sizes: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx), adaptada para el
 * **pano** de «Tensión» (encargo §8: nunca en el hero, que es tipográfico).
 * - El póster va con `Foto`, sin `preload` y en diferido: el pano está lejos de
 *   la primera pantalla.
 * - El vídeo lo monta `ControlVideo` cuando el pano se acerca, nunca con
 *   «reducir movimiento» ni ahorro de datos; sin JS, solo el póster.
 * - Sin vídeo ni foto: la trama DIN.
 */
export function MedioHero({ video, imagen, sizes, className }: Props) {
  const poster = video?.poster ?? imagen;
  return (
    <div className={className}>
      {poster ? (
        <Foto imagen={poster} proporcion="relleno" sizes={sizes} etiqueta="ninguna" className="absolute inset-0" />
      ) : (
        <div className="trama-din absolute inset-0 bg-alterna" />
      )}
      {video && <ControlVideo src={video.src} srcAv1={video.srcAv1} />}
    </div>
  );
}
