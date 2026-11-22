import type { Imagen, Video } from "@andrei-leads/core";

import { Foto } from "./Foto";

type Props = {
  /** `config.videoPano`: su `poster` se pinta aquí; el vídeo lo monta `ControlVideo`. */
  video?: Video;
  /** Foto de respaldo si no hay vídeo (`galeria[0]` o `trabajos[0].imagenes[0]`). */
  imagen?: Imagen;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MedioHero.tsx), reestilada como medio del
 * pano de «Marco» (encargo §5.2): el póster (o la foto de respaldo) en el servidor, en
 * diferido (`sizes="100vw"`, sin `preload`: no es LCP). El `<video>` no se pinta aquí:
 * lo monta la isla `ControlVideo` dentro de `[data-pano-medio]` cuando el pano se
 * acerca, solo sin «reducir movimiento» ni ahorro de datos. Etiqueta de origen dentro.
 */
export function MedioHero({ video, imagen, className }: Props) {
  const foto = video?.poster ?? imagen;
  if (!foto) return null;
  return (
    <Foto imagen={foto} sizes="100vw" proporcion="relleno" etiqueta="dentro" tono="oscuro" className={className} claseCaja="[&>video]:z-[1]">
      <span data-pano-medio className="absolute inset-0" />
    </Foto>
  );
}
