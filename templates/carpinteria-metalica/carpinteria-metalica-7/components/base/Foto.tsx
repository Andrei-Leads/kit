import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. `absolute inset-0` en un hero a sangre). */
export type Proporcion = "1/1" | "4/3" | "3/2" | "4/5" | "16/9" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  relleno: "",
};

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  proporcion?: Proporcion;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Calidad de next/image (60 en la foto del hero; next.config.ts permite 60 y 75). */
  quality?: 60 | 75;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Dónde va la placa de origen. Por defecto, arriba a la izquierda. */
  posicionEtiqueta?: "arriba-izquierda" | "abajo-izquierda" | "abajo-derecha";
  /** Placa pequeña para miniaturas (104 px). */
  etiquetaCompacta?: boolean;
  /** Clases extra de la placa (p. ej. bajarla por debajo de la cápsula en el hero). */
  claseEtiqueta?: string;
  className?: string;
  /** Capas extra (velo, «Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

const POSICION = {
  "arriba-izquierda": "top-0 left-0",
  "abajo-izquierda": "bottom-0 left-0",
  "abajo-derecha": "bottom-0 right-0",
} as const;

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «Forja»: la etiqueta de
 * `imagen.origen` («Imagen generada con IA», obligatoria por el AI Act; «Foto de tu ficha de
 * Google») va en una placa de hierro con la esquina cortada, en condensada de 13 px.
 * Sin radios; el fondo mientras carga es hierro.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  quality,
  decorativa,
  posicionEtiqueta = "arriba-izquierda",
  etiquetaCompacta,
  claseEtiqueta,
  className,
  children,
}: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-superficie", PROPORCION[proporcion], className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} quality={quality} className="object-cover" />
      {children}
      {etiqueta && (
        <span
          className={cn(
            "corte-placa absolute z-[2] bg-superficie font-titulo leading-[1.25] font-bold text-sobre-hierro uppercase",
            etiquetaCompacta ? "py-0.5 pr-2.5 pl-1.5 text-[10px] tracking-[0.03em]" : "py-1 pr-3.5 pl-2 text-[13px] tracking-[0.06em]",
            POSICION[posicionEtiqueta],
            claseEtiqueta,
          )}
        >
          {etiqueta}
        </span>
      )}
    </div>
  );
}
