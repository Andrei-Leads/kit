import type { Imagen, VideoHero as Video } from "@andrei-leads/core";

import { VideoHero } from "@/components/cliente/VideoHero";

import { Foto } from "./Foto";

type Props = {
  /** `config.videoHero`: su póster va aquí (LCP) y el vídeo lo monta `VideoHero` tras el `load`. */
  video?: Video;
  /** `config.imagenesHero[0]`: si no hay vídeo. */
  imagen?: Imagen;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx), reestilada en «Perfil»
 * (encargo §5 y §8): póster o foto a sangre con `preload` y `sizes="100vw"` (calidad 60), velo
 * doble (inferior `--color-velo` y uno corto bajo la cabecera) y, con vídeo, la isla
 * `VideoHero` con el botón de pausa de 44 px con filete. La etiqueta de origen la pone el
 * hero (arriba a la izquierda, porque abajo va el `h1`). Sin vídeo ni foto, nada.
 */
export function MedioHero({ video, imagen, className }: Props) {
  const foto = video?.poster ?? imagen;
  if (!foto) return null;
  return (
    <Foto imagen={foto} sizes="100vw" proporcion="relleno" preload calidad={60} etiqueta="no" className={className}>
      {video && <VideoHero src={video.src} srcAv1={video.srcAv1} />}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-[2] h-[120px] bg-(image:--color-velo-alto) lg:h-[160px]" />
      <div aria-hidden="true" className="absolute inset-0 z-[2] bg-(image:--color-velo)" />
    </Foto>
  );
}
