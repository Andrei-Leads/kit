import { etiquetaOrigen, type Imagen, type VideoHero } from "@andrei-leads/core";

import { ControlVideo } from "./ControlVideo";
import { Foto } from "./Foto";

type Props = {
  /** `config.videoHero`. Solo tipo proyecto. */
  video?: VideoHero;
  /** `config.imagenesHero[0]`: se usa si no hay vídeo. */
  imagen?: Imagen;
};

const CAPA_VIDEO = "capa-video";

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx), reestilada para
 * «Estancia» (encargo §5.1): medio a sangre (póster con `preload`, el LCP) y, arriba
 * a la derecha, la **línea de portada**: «En portada · {alt}» con la etiqueta de
 * origen integrada como pie de foto de revista, y a su izquierda la pausa circular
 * (solo con vídeo). Sin vídeo ni foto, no pinta nada (la portada tipográfica la
 * resuelve `Portada`).
 *
 * El vídeo lo monta `ControlVideo` tras `load`, encima del póster (idéntico a su
 * primer fotograma, sin fundido).
 */
export function MedioHero({ video, imagen }: Props) {
  const poster = video?.poster ?? imagen;
  if (!poster) return null;
  const origen = etiquetaOrigen(poster);
  return (
    <>
      <div className="absolute inset-0">
        <Foto imagen={poster} sizes="100vw" proporcion="relleno" preload etiqueta="ninguna" className="absolute inset-0 rounded-none" />
        {video && <div id={CAPA_VIDEO} className="absolute inset-0" />}
        <div aria-hidden="true" className="absolute inset-0 [background:var(--velo-hero)]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 [background:var(--velo-cabecera)]" />
      </div>
      <div className="absolute top-[calc(var(--alto-cabecera)+12px)] right-[var(--gutter)] left-[var(--gutter)] z-[2] flex items-start justify-end gap-3">
        {video && <ControlVideo src={video.src} srcAv1={video.srcAv1} capa={CAPA_VIDEO} />}
        <p className="m-0 max-w-[340px] rounded-[2px] bg-tinta/55 px-2.5 py-1.5 text-[11px] leading-snug text-fondo backdrop-blur-[8px]">
          En portada · {poster.alt}
          {origen && <span className="text-fondo/80"> · {origen}</span>}
        </p>
      </div>
    </>
  );
}
