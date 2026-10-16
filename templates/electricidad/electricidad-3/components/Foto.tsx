import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

export type Proporcion = "16/9" | "4/3" | "1/1" | "4/5";
/** organica: 16:9, 4:3 y 1:1 · organica-b: 4:5 y empresa · recta: trabajos y antes/después (16 px). */
export type Forma = "organica" | "organica-b" | "recta";

type Props = {
  imagen: Imagen;
  /** Proporción fija con object-cover. Por defecto 4:3. Se puede cambiar por breakpoint con `className` (aspect-video lg:aspect-[4/5]). */
  proporcion?: Proporcion;
  /** Contorno: orgánico (por defecto), orgánico-b o recto con 16 px de radio. */
  forma?: Forma;
  /** Atributo `sizes` de next/image (ancho real de la foto según el breakpoint). */
  sizes: string;
  priority?: boolean;
  /** Foto dentro de un enlace con texto propio: `alt=""` (el enlace ya se nombra solo). */
  decorativa?: boolean;
  /** Miniaturas: etiqueta «Foto de ejemplo» más pequeña (10,5 px). */
  compacta?: boolean;
  className?: string;
  /** Etiquetas extra (p. ej. «Antes y después», «Antes» / «Después»), colocadas por el llamador. */
  children?: ReactNode;
};

const PROPORCION: Record<Proporcion, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
};

const FORMA: Record<Forma, string> = {
  organica: "rounded-organico",
  "organica-b": "rounded-organico-b",
  recta: "rounded-foto-recta",
};

/**
 * Etiqueta «Foto de ejemplo» (Specs §7): pastilla luz con texto noche, centrada abajo (9 % del alto;
 * 10 px en fotos rectas) y siempre DENTRO del contorno orgánico, que no la recorta. Decorativa
 * (aria-hidden): el alt ya describe la foto.
 */
function FotoEjemplo({ forma, compacta }: { forma: Forma; compacta?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 -translate-x-1/2 rounded-pastilla bg-luz leading-none font-semibold whitespace-nowrap text-noche",
        forma === "recta" ? "bottom-2.5" : "bottom-[9%]",
        compacta ? "px-[7px] py-1 text-[10.5px]" : "px-[11px] py-1.5 text-xs"
      )}
    >
      Foto de ejemplo
    </span>
  );
}

/** Foto con next/image, proporción fija y contorno orgánico o recto. Si es de ejemplo (`/ejemplo/…`), lleva la etiqueta. */
export function Foto({
  imagen,
  proporcion = "4/3",
  forma = "organica",
  sizes,
  priority,
  decorativa,
  compacta,
  className,
  children,
}: Props) {
  const deEjemplo = imagen.src.startsWith("/ejemplo/");
  return (
    <div className={cn("relative w-full overflow-hidden bg-superficie-2", PROPORCION[proporcion], FORMA[forma], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {deEjemplo && <FotoEjemplo forma={forma} compacta={compacta} />}
      {children}
    </div>
  );
}
