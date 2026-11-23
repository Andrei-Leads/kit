import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { dosCifras } from "@/lib/textos";
import { cn } from "@/lib/utils";

export type Proporcion = "1/1" | "4/3" | "3/2" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
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
  /**
   * Con número, la foto va dentro de un `<figure>` con su pie «FIG. 03 · Imagen generada con IA».
   * Sin número, solo el marco: quien la usa pinta `<PieFigura>` donde le toque (fichas de obra).
   */
  fig?: number;
  className?: string;
  /** Capas encima de la foto (la que la destapa al entrar en pantalla…). */
  children?: ReactNode;
};

/** «FIG. 03 · Imagen generada con IA» («FIG. 03» si la foto no lleva etiqueta de origen). */
export function textoPie(imagen: Pick<Imagen, "origen">, fig?: number, extra?: string): string | undefined {
  const partes = [fig !== undefined && `FIG. ${dosCifras(fig)}`, etiquetaOrigen(imagen), extra].filter(Boolean);
  return partes.length > 0 ? partes.join(" · ") : undefined;
}

/** Pie de figura en mono de 13 px y en texto, fuera de la foto: no tapa nada (encargo §8). */
export function PieFigura({ texto, className }: { texto?: string; className?: string }) {
  if (!texto) return null;
  return <span className={cn("etiqueta block text-texto", className)}>{texto}</span>;
}

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada (encargo §8): marco de 1 px en
 * texto, esquinas rectas, sin sombra. La etiqueta de `origen` («Imagen generada con IA», obligatoria
 * por el AI Act, o «Foto de tu ficha de Google») NO va sobre la imagen: va debajo, como pie de
 * figura (`fig` o `<PieFigura>`). Proporción fija con `object-cover`.
 *
 * Tokens: --color-texto, --color-superficie, --radius-foto.
 */
export function Foto({ imagen, sizes, proporcion = "4/3", preload, decorativa, fig, className, children }: Props) {
  const marco = (
    <div className={cn("relative overflow-hidden rounded-foto border border-texto bg-superficie", PROPORCION[proporcion], className)}>
      <Image src={imagen.src} alt={decorativa ? "" : imagen.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      {children}
    </div>
  );
  if (fig === undefined) return marco;
  return (
    <figure className="m-0 flex flex-col gap-2">
      {marco}
      <figcaption className="etiqueta text-texto">{textoPie(imagen, fig)}</figcaption>
    </figure>
  );
}
