import Image from "next/image";
import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** "relleno": sin proporción propia; la fija quien la usa (celda 2×2 del mosaico). */
export type Proporcion = "1/1" | "3/2" | "4/5" | "relleno";

const PROPORCION: Record<Proporcion, string> = {
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  relleno: "",
};

/** Etiqueta corta de las miniaturas (64–104 px): «IA» / «Google», con el texto completo para el lector de pantalla. */
const CORTA: Record<string, string> = {
  "Imagen generada con IA": "IA",
  "Foto de tu ficha de Google": "Google",
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
  /** Blanco y negro estático (`filter: grayscale(1)`, nunca animado): collage 2 y 3, obrador. */
  gris?: boolean;
  /** larga: franja de 18 px con 11 px; corta: «IA» en una franja de 14 px (miniaturas); ninguna: la pinta quien la usa. */
  etiqueta?: "larga" | "corta" | "ninguna";
  /**
   * Tarjeta sin foto (encargo §5): bloque `alterna` con el número enorme y el título, debajo de la
   * foto. Se ve mientras carga y si la foto no existe (el `alt` de una foto rota va transparente).
   */
  respaldo?: ReactNode;
  className?: string;
  /** Capas encima (rótulos del antes y después), colocadas por quien la usa. */
  children?: ReactNode;
};

/**
 * Pieza base del registro (kit/registry/base/Foto.tsx), reestilada para «Galería» (entrega §12):
 * radio 0, sin sombra, y la etiqueta de `imagen.origen` («Imagen generada con IA», obligatoria: AI
 * Act, art. 50.4; «Foto de tu ficha de Google») en una franja blanca de 18 px pegada al borde
 * inferior izquierdo, en condensada de 11 px: legible en una tarjeta de 170 px. El texto nunca va
 * sobre la foto.
 */
export function Foto({ imagen, sizes, proporcion = "4/5", preload, eager, decorativa, gris, etiqueta = "larga", respaldo, className, children }: Props) {
  const origen = etiquetaOrigen(imagen);
  return (
    <div className={cn("relative overflow-hidden rounded-foto bg-alterna", PROPORCION[proporcion], className)}>
      {respaldo}
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={eager && !preload ? "eager" : undefined}
        className={cn("object-cover text-transparent", gris && "grayscale")}
      />
      {children}
      {origen && etiqueta === "larga" && (
        <span className="pie-ficha absolute bottom-0 left-0 z-[2] flex h-[18px] max-w-full items-center bg-superficie px-1.5 text-[11px] leading-none tracking-[0.04em] whitespace-nowrap text-texto">
          {origen}
        </span>
      )}
      {origen && etiqueta === "corta" && (
        <span className="pie-ficha absolute bottom-0 left-0 z-[2] flex h-3.5 items-center bg-superficie px-1 text-[10px] leading-none tracking-[0.04em] text-texto">
          <span aria-hidden="true">{CORTA[origen] ?? origen}</span>
          <span className="sr-only">{origen}</span>
        </span>
      )}
    </div>
  );
}
