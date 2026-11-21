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
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Dónde va la etiqueta de origen. Por defecto, abajo a la derecha (diseño de «La furgoneta»). */
  posicionEtiqueta?: "abajo-derecha" | "abajo-izquierda" | "arriba-derecha";
  /** Clases extra de la etiqueta (p. ej. bajarla bajo la cabecera en el hero). */
  claseEtiqueta?: string;
  /** Clases extra de la imagen (p. ej. `object-[center_70%]`). */
  claseImagen?: string;
  className?: string;
  /** Capas extra (degradado, «Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx). Foto con next/image y
 * proporción fija. Si `imagen.origen` es "ia" o "ficha-google", pinta la
 * etiqueta de `etiquetaOrigen` (la de IA es obligatoria: AI Act, art. 50.4).
 * La etiqueta es texto visible y legible por lector de pantalla.
 *
 * Reestilada en «La furgoneta»: etiqueta en piedra tinta, abajo a la derecha.
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-tinta,
 * --color-sobre-tinta.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  decorativa,
  posicionEtiqueta = "abajo-derecha",
  claseEtiqueta,
  claseImagen,
  className,
  children,
}: Props) {
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} className={cn("object-cover", claseImagen)} />
      {children}
      {etiqueta && (
        <span
          className={cn(
            // Piedra pequeña tinta al 80 % con texto sobre-tinta de 12 px.
            "absolute z-[2] max-w-[calc(100%-1.5rem)] rounded-piedra-2 bg-tinta/80 px-2.5 py-1 text-xs leading-snug font-semibold text-sobre-tinta",
            posicionEtiqueta === "abajo-derecha" && "right-3 bottom-3",
            posicionEtiqueta === "abajo-izquierda" && "bottom-3 left-3",
            posicionEtiqueta === "arriba-derecha" && "top-3 right-3",
            claseEtiqueta,
          )}
        >
          {etiqueta}
        </span>
      )}
    </div>
  );
}
