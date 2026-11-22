import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

export type Proporcion = "3/2" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  relleno: "",
};

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  proporcion?: Proporcion;
  /** Solo la foto LCP (una por página). En este diseño no hay foto en la primera pantalla. */
  preload?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Miniatura: la cinta dice «IA» (el texto completo queda para el lector de pantalla). */
  mini?: boolean;
  /** Sustituye el texto de la etiqueta de origen (p. ej. «Vídeo generado con IA» en el póster). */
  etiqueta?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada (encargo §8): filete interior de
 * 1 px y la etiqueta de `imagen.origen` como un trozo de cinta de carrocero pegado en la esquina
 * superior izquierda (`--color-cinta`, mono de 11 px, girada 1,5°).
 */
export function Foto({ imagen, sizes, proporcion = "3/2", preload, decorativa, mini, etiqueta, className, children }: Props) {
  const texto = etiquetaOrigen(imagen) && (etiqueta ?? etiquetaOrigen(imagen));
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna shadow-[inset_0_0_0_1px_var(--color-borde)]", PROPORCION[proporcion], className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      {children}
      {texto && (
        <span className="mono absolute top-2.5 -left-[3px] z-[2] -rotate-[1.5deg] bg-cinta py-[5px] pr-2 pl-[11px] text-[11px] leading-none font-medium whitespace-nowrap text-sobre-cinta">
          {mini ? (
            <>
              <span aria-hidden="true">IA</span>
              <span className="sr-only">{texto}</span>
            </>
          ) : (
            texto
          )}
        </span>
      )}
    </div>
  );
}
