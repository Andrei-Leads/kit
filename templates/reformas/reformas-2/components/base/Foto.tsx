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
  /** Dónde va la etiqueta de origen. Por defecto, abajo a la izquierda. */
  posicionEtiqueta?: "abajo-izquierda" | "arriba-derecha";
  className?: string;
  /** Texto de la etiqueta en lugar del de `etiquetaOrigen` (p. ej. «Imágenes generadas con IA» si la tarjeta lleva dos fotos de IA). */
  etiqueta?: string;
  /** Capas extra (degradado, «Antes»/«Después»…), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada: etiqueta en píldora blanca de
 * 11 px (encargo §8). Foto con next/image y
 * proporción fija. Si `imagen.origen` es "ia" o "ficha-google", pinta la
 * etiqueta de `etiquetaOrigen` (la de IA es obligatoria: AI Act, art. 50.4).
 * La etiqueta es texto visible y legible por lector de pantalla.
 *
 * Tokens: --radius-foto, --color-alterna (fondo mientras carga), --color-texto,
 * --color-fondo.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  decorativa,
  posicionEtiqueta = "abajo-izquierda",
  etiqueta: etiquetaPropia,
  className,
  children,
}: Props) {
  const origen = etiquetaOrigen(imagen);
  const etiqueta = origen && (etiquetaPropia ?? origen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      {children}
      {etiqueta && (
        <span
          className={cn(
            "absolute z-[2] rounded-full bg-superficie px-2 py-[3px] text-[11px] leading-[1.3] font-semibold text-texto",
            posicionEtiqueta === "abajo-izquierda" ? "bottom-2 left-2" : "top-2 right-2",
          )}
        >
          {etiqueta}
        </span>
      )}
    </div>
  );
}
