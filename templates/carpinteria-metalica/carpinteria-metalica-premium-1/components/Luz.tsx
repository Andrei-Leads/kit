import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Cristales del rectángulo de sol: 1 (sin travesaños), 2 o 4. */
  cristales?: 1 | 2 | 4;
  tono?: "claro" | "oscuro";
  /** Proporción de la caja («4/5», «3/2»…) o «relleno» (ocupa a su padre). */
  proporcion?: string;
  /** Fondo de la caja; por defecto, alterna (claro) o tinta suave (oscuro). */
  fondo?: string;
  /** Número grande abajo a la izquierda (bloques de soluciones sin foto). */
  numero?: string;
  tamanoNumero?: string;
  /** Desplaza los cristales con el scroll (pano sin fotos). */
  parallax?: boolean;
  className?: string;
};

/**
 * Pieza propia «Luz» (encargo §5): un rectángulo de sol proyectado en la pared, con
 * cristales y la sombra del travesaño, solo con degradados CSS y `skewY(-8deg)`. Es el
 * estado vacío de todo el template: la web se ve premium sin una sola foto. Decorativa
 * (`aria-hidden`), de servidor, 0 KB de JS.
 */
export function Luz({ cristales = 2, tono = "claro", proporcion = "4/5", fondo, numero, tamanoNumero, parallax, className }: Props) {
  const columnas = cristales >= 2 ? 2 : 1;
  const filas = cristales === 4 ? 2 : 1;
  const relleno = proporcion === "relleno";
  const estilo = {
    aspectRatio: relleno ? undefined : proporcion,
    "--luz-fondo": fondo ?? (tono === "oscuro" ? "var(--color-tinta-suave)" : "var(--color-alterna)"),
  } as CSSProperties;
  return (
    <div aria-hidden="true" className={cn("luz", tono === "oscuro" && "luz-oscura", relleno && "h-full", className)} style={estilo}>
      <div className="luz-halo" />
      <div className={cn("luz-ventana", parallax && "px-luz")} style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)`, gridTemplateRows: `repeat(${filas}, 1fr)` }}>
        {Array.from({ length: cristales }, (_, i) => (
          <div key={i} className="luz-cristal" />
        ))}
      </div>
      {numero && (
        <span className="luz-num" style={{ fontSize: tamanoNumero ?? "clamp(6rem, 4rem + 6vw, 10rem)" }}>
          {numero}
        </span>
      )}
    </div>
  );
}
