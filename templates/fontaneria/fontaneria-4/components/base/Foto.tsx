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
  /** Solo la foto LCP (una por página). En este template el LCP es el teléfono: no se usa. */
  preload?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /**
   * "polaroid" (por defecto): borde blanco con la etiqueta de origen escrita en el borde inferior.
   * "pequena": polaroid de borde fino (fichas de servicio). "ninguno": solo la foto, con la etiqueta
   * encima (capas de AntesDespues, que ya van dentro de una polaroid).
   */
  marco?: "polaroid" | "pequena" | "ninguno";
  /** Con marco "ninguno": no pinta la etiqueta encima porque la escribe quien la envuelve (AntesDespues, en su borde). */
  sinEtiqueta?: boolean;
  /** Texto extra a la derecha del borde (p. ej. el número de paso). */
  pie?: ReactNode;
  className?: string;
  /** Capas extra sobre la foto («Antes»/«Después»…). */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada como polaroid (encargo §8):
 * la etiqueta de `origen` («Imagen generada con IA», «Foto de tu ficha de Google») va escrita en el
 * borde blanco inferior, en mono de 11 px y --color-texto-suave sobre blanco (≥ 4,5:1), sin tapar la foto.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/5",
  preload,
  decorativa,
  marco = "polaroid",
  pie,
  sinEtiqueta = false,
  className,
  children,
}: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  const foto = (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], marco === "ninguno" && className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      {children}
      {marco === "ninguno" && !sinEtiqueta && etiqueta && (
        <span className="absolute bottom-1.5 left-1.5 z-[2] bg-superficie px-1.5 py-0.5 font-titulo text-[11px] text-texto-suave">
          {etiqueta}
        </span>
      )}
    </div>
  );
  if (marco === "ninguno") return foto;
  return (
    <figure className={cn("polaroid", marco === "pequena" && "polaroid-sm", className)}>
      {foto}
      <figcaption className="polaroid-pie justify-between gap-2">
        <span>{etiqueta}</span>
        {pie && <span aria-hidden="true">{pie}</span>}
      </figcaption>
    </figure>
  );
}
