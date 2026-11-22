import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (celda 2×2 del mosaico, collage). */
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
  /** Sin `preload`, pero sin esperar al scroll (piezas pequeñas del collage). */
  eager?: boolean;
  /** Foto dentro de un enlace que ya tiene texto: `alt=""`. */
  decorativa?: boolean;
  /** Blanco y negro de archivo (`--filtro-archivo`): rejilla, piezas pequeñas, «Estado previo», empresa. */
  archivo?: boolean;
  /** false: quien la usa pinta el crédito de origen aparte (collage: uno solo para las tres). */
  credito?: boolean;
  /** Calidad de next/image (rejilla: 60). */
  calidad?: number;
  className?: string;
  /** Capas encima (banda negra de obra), colocadas por quien la usa. */
  children?: ReactNode;
};

/** Crédito de origen pegado bajo la foto, como un pie de revista: 11 px, texto suave, a la derecha. */
export function Credito({ texto, className }: { texto?: string; className?: string }) {
  if (!texto) return null;
  return <span className={cn("mt-1 block text-right text-[11px] leading-[1.3] text-texto-suave", className)}>{texto}</span>;
}

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «Obra
 * con nombre»: radio 0, variante `archivo` (blanco y negro por CSS: las fotos
 * se entregan en color) y la etiqueta de `imagen.origen` («Imagen generada con
 * IA», obligatoria: AI Act, art. 50.4) **debajo** de la foto y no encima,
 * porque la esquina inferior ya lleva la banda de obra (encargo §8). Devuelve
 * la foto y su crédito como hermanos: quien la usa los mete en una columna.
 */
export function Foto({
  imagen,
  sizes,
  proporcion = "4/3",
  preload,
  eager,
  decorativa,
  archivo,
  credito = true,
  calidad,
  className,
  children,
}: Props) {
  return (
    <>
      <div className={cn("tarjeta-foto relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
        <Image
          src={imagen.src}
          alt={decorativa ? "" : imagen.alt}
          fill
          sizes={sizes}
          preload={preload}
          loading={eager && !preload ? "eager" : undefined}
          quality={calidad}
          className={cn("object-cover", archivo && "archivo")}
        />
        {children}
      </div>
      {credito && <Credito texto={etiquetaOrigen(imagen)} />}
    </>
  );
}
