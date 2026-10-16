import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

export type Proporcion = "4/3" | "3/2" | "16/9" | "1/1";

type Props = {
  imagen: Imagen;
  /** Proporción fija con object-cover. Por defecto 4:3 (todas las fotos del diseño). */
  proporcion?: Proporcion;
  /** Atributo `sizes` de next/image (ancho real de la foto según el breakpoint). */
  sizes: string;
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
  "16/9": "aspect-video",
  "1/1": "aspect-square",
};

/**
 * Etiqueta «FOTO DE EJEMPLO» (Specs §7): rectángulo tinta, mono 11 px 700 blanco, esquina
 * inferior izquierda, sin radio. Decorativa (aria-hidden): el alt ya describe la foto.
 */
function FotoEjemplo() {
  return (
    <span
      aria-hidden="true"
      className="absolute bottom-0 left-0 bg-tinta px-[9px] py-[5px] font-mono text-[11px] leading-none font-bold tracking-[0.12em] whitespace-nowrap text-white uppercase"
    >
      Foto de ejemplo
    </span>
  );
}

/** Foto con next/image, recta (radio 0) y con borde de 1 px. Si es de ejemplo (`/ejemplo/…`), lleva la etiqueta. */
export function Foto({ imagen, proporcion = "4/3", sizes, priority, decorativa, className, children }: Props) {
  const deEjemplo = imagen.src.startsWith("/ejemplo/");
  return (
    <div className={cn("relative overflow-hidden border border-regla bg-papel-2", PROPORCION[proporcion], className)}>
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
