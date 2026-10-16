import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (p. ej. la foto a sangre del hero, `absolute inset-0`). */
export type Proporcion = "4/3" | "3/2" | "4/5" | "16/9" | "relleno";

type Props = {
  imagen: Imagen;
  /** Proporción fija con object-cover. Por defecto 4:3 (fotos de trabajos y empresa); servicios 3:2; hero 4:5. */
  proporcion?: Proporcion;
  /** Atributo `sizes` de next/image (ancho real de la foto según el breakpoint). */
  sizes: string;
  /** Solo la foto del hero (LCP). */
  priority?: boolean;
  /** Foto dentro de un enlace con texto propio: `alt=""` (el enlace ya se nombra solo). */
  decorativa?: boolean;
  className?: string;
  /** Etiquetas extra (p. ej. «Antes» / «Después»), colocadas por el llamador. */
  children?: ReactNode;
};

const PROPORCION: Record<Proporcion, string> = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  relleno: "",
};

/**
 * Etiqueta «Foto de ejemplo» (Specs §7): tinta al 78 %, blanco, 13 px, 600, radio de 2 px, esquina
 * SUPERIOR derecha (abajo va el texto del hero). Legible sobre foto clara, capa oscura o piedra.
 * Decorativa (aria-hidden): el alt ya describe la foto.
 */
function FotoEjemplo() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-2.5 right-2.5 z-[2] rounded-[2px] bg-tinta/78 px-2 py-[3px] text-[13px] leading-[1.4] font-semibold text-white"
    >
      {textos.fotoEjemplo}
    </span>
  );
}

/** Foto con next/image, recta (radio 0, sin borde). Si es de ejemplo (`/ejemplo/…`), lleva la etiqueta. */
export function Foto({ imagen, proporcion = "4/3", sizes, priority, decorativa, className, children }: Props) {
  const deEjemplo = imagen.src.startsWith("/ejemplo/");
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-piedra-2", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {deEjemplo && <FotoEjemplo />}
      {children}
    </div>
  );
}
