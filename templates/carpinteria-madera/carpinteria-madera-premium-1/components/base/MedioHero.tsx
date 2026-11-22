import type { Imagen, Video } from "@andrei-leads/core";

import { EtiquetaOrigen, Foto } from "./Foto";
import { VideoControl } from "./VideoControl";

type Props = {
  /** `config.videoHero` (o `videoPano` en el pano). */
  video?: Video;
  /** Respaldo sin vídeo: `config.imagenesHero[0]`. */
  imagen?: Imagen;
  sizes: string;
  /** Solo en el hero: el póster (o la foto) es el LCP. */
  preload?: boolean;
  /** Pano: el vídeo se pide cuando se acerca a la pantalla, nunca se precarga. */
  diferido?: boolean;
  /** Clases del grupo de arriba a la derecha (etiqueta de origen + pausa). */
  claseControles?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx), reestilada en «Oficio»
 * (encargo §8.5): el póster (o la foto) se pinta en el servidor con next/image; el
 * `<video>` sale sin fuente hasta que `VideoControl` se la pone. La etiqueta de origen
 * sale del `poster.origen` y va arriba a la derecha, junto a la pausa, lejos del
 * titular. Sin vídeo ni foto, no pinta nada (el estado vacío lo pone quien la usa).
 */
export function MedioHero({ video, imagen, sizes, preload, diferido, claseControles, className, children }: Props) {
  const foto = video?.poster ?? imagen;
  if (!foto) return null;
  return (
    <Foto
      imagen={foto}
      sizes={sizes}
      proporcion="relleno"
      preload={preload}
      posicionEtiqueta="fuera"
      tono="oscuro"
      className={className}
    >
      {video && <VideoControl src={video.src} srcAv1={video.srcAv1} diferido={diferido} clasePausa={"absolute z-[4] " + (claseControles ?? "")} />}
      {children}
      <div className={"pointer-events-none absolute z-[3] flex h-11 items-center " + (video ? "pr-[52px] " : "") + (claseControles ?? "")}>
        <EtiquetaOrigen imagen={foto} />
      </div>
    </Foto>
  );
}
