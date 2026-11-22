import Link from "next/link";
import { ViewTransition } from "react";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { metaObra, num } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  /** Número de la obra en el sumario («Obra 02»). */
  numero: number;
  sizes: string;
  /** Título de la tarjeta: h3 bajo un h2 de sección, h2 en el sumario. */
  nivel?: "h2" | "h3";
  className?: string;
  /** Índice para el revelado escalonado. */
  i?: number;
};

/**
 * Tarjeta de obra 4:5 (sumario, «En portada», obras del servicio). La foto lleva el
 * nombre de transición `obra-{slug}`: al abrir la ficha, pasa de la tarjeta a la doble
 * página (recurso 6). La foto crece un 3 % al pasar o enfocar.
 */
export function TarjetaObra({ trabajo, numero, sizes, nivel = "h3", className, i = 0 }: Props) {
  const Titulo = nivel;
  return (
    <Link
      href={`/trabajos/${trabajo.slug}`}
      data-aparecer
      style={{ "--i": i } as React.CSSProperties}
      className={cn("tarjeta-obra group block no-underline", className)}
    >
      <ViewTransition name={`obra-${trabajo.slug}`} share="obra" default="none">
        <Foto imagen={trabajo.imagenes[0]} sizes={sizes} proporcion="4/5" decorativa className="foto-zoom" />
      </ViewTransition>
      <p className="etiqueta mt-4 text-texto-suave">Obra {num(numero)}</p>
      <Titulo className="m-0 mt-2 text-h3 leading-[1.15] tracking-[-0.01em]">
        <span className="bg-[linear-gradient(currentColor_0_0)] bg-[length:0_1px] bg-left-bottom bg-no-repeat pb-0.5 group-hover:bg-[length:100%_1px] motion-safe:transition-[background-size] motion-safe:duration-500">
          {trabajo.titulo}
        </span>
      </Titulo>
      {metaObra(trabajo) && <p className="m-0 mt-1.5 text-sm text-texto-suave">{metaObra(trabajo)}</p>}
    </Link>
  );
}
