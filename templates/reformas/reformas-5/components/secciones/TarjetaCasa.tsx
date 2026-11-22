import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  meta: string;
  nivel?: "h2" | "h3";
  sizes?: string;
  /** Posición en la rejilla (escalonado de la aparición). */
  i?: number;
  className?: string;
};

/** Tarjeta de casa: foto en arco 3:4, sello «Antes y después» si hay `antes`, título y contexto. */
export function TarjetaCasa({ trabajo, meta, nivel = "h3", sizes = "(min-width: 1024px) 33vw, 100vw", i = 0, className }: Props) {
  const Titulo = nivel;
  return (
    <Link
      href={`/trabajos/${trabajo.slug}`}
      data-aparecer
      style={{ "--i": i } as React.CSSProperties}
      className={cn("tarjeta-arco flex flex-col gap-3 text-texto no-underline", className)}
    >
      <div className="relative">
        <Foto imagen={trabajo.imagenes[0]} sizes={sizes} arco decorativa calidad={60} />
        {trabajo.antes && (
          <span className="absolute top-[16%] -right-1 z-[3] grid size-[78px] rotate-[-8deg] place-items-center rounded-full border border-borde bg-superficie text-center text-xs leading-[1.15] font-semibold shadow-[0_3px_10px_rgb(43_35_29/0.12)]">
            Antes y
            <br />
            después
          </span>
        )}
      </div>
      <Titulo className="remate m-0 mt-1 text-[22px] leading-tight">{trabajo.titulo}</Titulo>
      {meta && <p className="m-0 text-[15px] text-texto-suave">{meta}</p>}
    </Link>
  );
}
