import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** La palabra destacada de un titular: en señal (encargo §5.1). Una por titular. */
export function Senal({ children }: { children: ReactNode }) {
  return <span className="text-acento">{children}</span>;
}

type Props = {
  /** Cada elemento es una línea (máx. 3, partidas por frase). */
  lineas: readonly ReactNode[];
  id?: string;
  /** "h2" por defecto; "p" para el lema (no es un título). Nunca un h1: el h1 no se anima. */
  como?: "h2" | "p";
  /** "display" para el lema y los CTA finales. */
  tamano?: "seccion" | "display";
  className?: string;
};

/**
 * Titular por líneas con máscara (recurso 2). El servidor envuelve cada línea
 * en un `<span class="linea">` con `overflow: clip` y su hijo sube desde
 * detrás (globals.css, solo con animation-timeline y sin «reducir
 * movimiento»). Sin soporte o sin JS: quieto y visible.
 */
export function Titular({ lineas, id, como: Etiqueta = "h2", tamano = "seccion", className }: Props) {
  return (
    <Etiqueta id={id} className={cn(tamano === "display" ? "titulo-display" : "titulo-seccion", className)}>
      {lineas.map((l, i) => (
        <span key={i} className="linea" style={{ "--i": i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Etiqueta>
  );
}

/** Antetítulo en mayúsculas de 12 px en el color de acento. */
export function Antetitulo({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("etiqueta m-0 text-acento", className)}>{children}</p>;
}

/**
 * enlace-flecha: solo para navegar (nunca para contactar). Línea de 1 px y «→»
 * separada 12 px que se desplaza 5 px en hover (globals.css).
 */
export function EnlaceFlecha({ href, children, externo, className }: { href: string; children: ReactNode; externo?: boolean; className?: string }) {
  const contenido = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="flecha">
        →
      </span>
    </>
  );
  if (externo) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" className={cn("enlace-flecha self-start", className)}>
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={cn("enlace-flecha self-start", className)}>
      {contenido}
    </Link>
  );
}

/** Un título de los datos con su última palabra en señal («Reforma eléctrica *integral*»). */
export function UltimaDestacada({ texto }: { texto: string }) {
  const i = texto.trimEnd().lastIndexOf(" ");
  if (i < 0) return <Senal>{texto}</Senal>;
  return (
    <>
      {texto.slice(0, i + 1)}
      <Senal>{texto.slice(i + 1)}</Senal>
    </>
  );
}
