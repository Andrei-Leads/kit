import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Onda } from "@/components/Onda";

/**
 * Foto a sangre de una página interior (trabajo, empresa), sin texto encima: el
 * h1 va debajo. El velo de la cabecera blanca lo pone la propia cabecera
 * (globals.css); onda arena abajo. Es el
 * LCP de la página: `preload`.
 */
export function FotoSangre({ imagen }: { imagen: Imagen }) {
  return (
    <section data-cabecera-sobre-foto className="relative h-[440px] overflow-hidden bg-tinta md:h-[620px]">
      <Foto
        imagen={imagen}
        sizes="100vw"
        proporcion="relleno"
        preload
        className="absolute inset-0 rounded-none"
        claseImagen="object-[center_60%]"
        claseEtiqueta="bottom-10 right-[clamp(1.25rem,0.6rem+3.2vw,4rem)]"
      />
      <Onda className="absolute inset-x-0 -bottom-px text-fondo" />
    </section>
  );
}
