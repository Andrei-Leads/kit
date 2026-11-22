import Link from "next/link";
import { ViewTransition } from "react";
import type { Trabajo } from "@andrei-leads/core";

import { Flecha } from "@/components/EnlaceFlecha";
import { Foto } from "@/components/base/Foto";
import { etiquetaObra } from "@/lib/textos";

/** Tarjeta de obra 4:5 de /trabajos; su foto pasa al hero de la ficha (recurso 6). */
export function TarjetaObra({ trabajo, servicio, sizes }: { trabajo: Trabajo; servicio?: string; sizes: string }) {
  return (
    <Link href={`/trabajos/${trabajo.slug}`} className="grupo-flecha block">
      <ViewTransition name={`obra-${trabajo.slug}`} share="morph" default="none">
        <Foto imagen={trabajo.imagenes[0]} sizes={sizes} proporcion="4/5" decorativa />
      </ViewTransition>
      <p className="etiqueta mt-4 text-texto-suave">{etiquetaObra(trabajo, servicio)}</p>
      <h3 className="titulo mt-2 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.1]">{trabajo.titulo}</h3>
      <p className="mt-3 max-w-[44ch] text-base leading-[1.55] text-texto-suave">{trabajo.descripcion}</p>
      <span className="mt-4 inline-block">
        <Flecha>Ver obra</Flecha>
      </span>
    </Link>
  );
}
