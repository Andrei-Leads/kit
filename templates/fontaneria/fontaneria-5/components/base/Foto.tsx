import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa. */
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
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Dónde va la etiqueta de origen. Por defecto, abajo a la izquierda. */
  posicionEtiqueta?: "abajo-izquierda" | "arriba-derecha";
  className?: string;
  /** Capas extra («Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «Llegamos»: DUOTONO.
 * El contenedor es primario y la foto va en escala de grises con más contraste y
 * `mix-blend-mode: multiply` (--duotono-mezcla): sombras en casi negro y luces en el primario del
 * cliente. `isolate` limita la mezcla al contenedor. La etiqueta de `origen` va encima, fuera de la
 * mezcla, en una caja tinta con la esquina cortada (texto blanco de 12 px). La mezcla nunca se anima.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  decorativa,
  posicionEtiqueta = "abajo-izquierda",
  className,
  children,
}: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative isolate overflow-hidden rounded-foto bg-primario", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        className="object-cover contrast-[1.15] grayscale [mix-blend-mode:var(--duotono-mezcla)]"
      />
      {children}
      {etiqueta && (
        <span
          className={cn(
            "corte-6 absolute z-[2] bg-tinta py-1.5 pr-3.5 pl-2 text-xs leading-none font-semibold text-white",
            posicionEtiqueta === "abajo-izquierda" ? "bottom-0 left-0" : "top-0 right-0",
          )}
        >
          {etiqueta}
        </span>
      )}
    </div>
  );
}
