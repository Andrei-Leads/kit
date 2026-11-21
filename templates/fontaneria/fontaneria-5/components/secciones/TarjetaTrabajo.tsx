import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

/** «2026 · 3 horas» con lo que haya. */
export function metaTrabajo(t: Pick<Trabajo, "anio" | "duracion">): string {
  return [t.anio, t.duracion].filter((x) => x !== undefined && x !== "").join(" · ");
}

/** Etiqueta de ubicación: caja tinta cortada con un nodo de red (el pueblo es el dato estrella). */
export function EtiquetaUbicacion({ ubicacion, className }: { ubicacion: string; className?: string }) {
  return (
    <span
      className={cn(
        "corte-9 inline-flex items-center gap-2 self-start bg-tinta py-1.5 pr-4 pl-2.5 font-titulo text-2xl leading-none font-bold text-sobre-tinta",
        className,
      )}
    >
      <span aria-hidden="true" className="box-border size-3 flex-none rounded-full border-3 border-primario bg-white" />
      {ubicacion}
    </span>
  );
}

/**
 * Tarjeta de trabajo: foto en duotono 4:3, la `ubicacion` grande en etiqueta cortada, título y
 * año · duración. `horizontal`: foto a la izquierda desde 640 px (fichas de servicio).
 */
export function TarjetaTrabajo({
  trabajo,
  horizontal,
  id,
  nivel = "h3",
  preload,
}: {
  trabajo: Trabajo;
  horizontal?: boolean;
  id?: string;
  nivel?: "h2" | "h3";
  /** Foto LCP de la página (solo la primera tarjeta de /trabajos). */
  preload?: boolean;
}) {
  const meta = metaTrabajo(trabajo);
  const Titulo = nivel;
  return (
    <Link
      id={id}
      href={`/trabajos/${trabajo.slug}`}
      className={cn("tarjeta-corte corte block w-full bg-tinta p-0.5 text-texto no-underline", horizontal && "max-w-[820px]")}
    >
      <span className={cn("corte-13 flex h-full flex-col bg-superficie", horizontal && "sm:flex-row")}>
        <Foto
          preload={preload}
          imagen={trabajo.imagenes[0]}
          decorativa
          proporcion="4/3"
          sizes={horizontal ? "(min-width: 640px) 400px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className={cn(horizontal && "sm:w-1/2 sm:flex-none")}
        />
        <span className="flex flex-1 flex-col gap-2 px-5 py-[18px]">
          {trabajo.ubicacion && <EtiquetaUbicacion ubicacion={trabajo.ubicacion} />}
          <Titulo className="m-0 font-titulo text-xl leading-[1.2] font-semibold">{trabajo.titulo}</Titulo>
          {meta && <span className="text-[15px] text-texto-suave">{meta}</span>}
        </span>
      </span>
    </Link>
  );
}
