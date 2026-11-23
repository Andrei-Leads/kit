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

/** Etiqueta de origen (entrega): cursiva serif de 12 px sobre una pastilla hueso al 85 %. */
export const ETIQUETA =
  "pointer-events-none absolute z-[2] bg-fondo/85 px-2 py-[3px] font-titulo text-xs leading-[1.3] text-texto italic";

export type PosicionEtiqueta = "abajo-izquierda" | "arriba-derecha" | "ninguna";

type Props = {
  imagen: Imagen;
  /** Atributo `sizes` de next/image: el ancho real de la foto en cada punto de corte. */
  sizes: string;
  proporcion?: Proporcion;
  /** Solo la foto LCP (una por página): la precarga desde el `<head>`. */
  preload?: boolean;
  /** Calidad de next/image (60 en el hero, encargo §8; por defecto, la de Next). */
  calidad?: number;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Abajo a la izquierda por defecto; arriba a la derecha en el hero y el CTA final (no tapa los botones). */
  posicionEtiqueta?: PosicionEtiqueta;
  className?: string;
  /** Capas extra (velo, «Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada en «Veta» (encargo §8):
 * sin radio ni sombra, etiqueta de origen en cursiva sobre pastilla hueso. Si `imagen.origen` es
 * "ia" o "ficha-google", pinta la etiqueta de `etiquetaOrigen` (la de IA es obligatoria: AI Act,
 * art. 50.4). La etiqueta es texto visible y legible por lector de pantalla.
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-fondo, --color-texto.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  calidad,
  decorativa,
  posicionEtiqueta = "abajo-izquierda",
  className,
  children,
}: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={calidad}
        className="object-cover"
      />
      {children}
      {etiqueta && posicionEtiqueta !== "ninguna" && (
        <span className={cn(ETIQUETA, posicionEtiqueta === "abajo-izquierda" ? "bottom-2.5 left-2.5" : "top-2.5 right-2.5")}>
          {etiqueta}
        </span>
      )}
    </div>
  );
}
