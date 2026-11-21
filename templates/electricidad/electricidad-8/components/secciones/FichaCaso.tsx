import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

/** Datos de contexto que existen: «Benicalap · 2025 · 24 viviendas · 3 semanas». */
export function datosFicha(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion" | "precio">): string[] {
  return [t.ubicacion?.split(",")[0]?.trim(), t.anio ? String(t.anio) : undefined, t.superficie, t.duracion, t.precio].filter(
    (x): x is string => Boolean(x),
  );
}

/** Línea de ficha con cotas entre los datos (las cotas son decorativas; el lector lee «·»). */
export function LineaFicha({ datos, className }: { datos: string[]; className?: string }) {
  if (datos.length === 0) return null;
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9375rem] text-texto-suave", className)}>
      {datos.map((d, i) => (
        <span key={d} className="flex items-center gap-2.5">
          {i > 0 && (
            <>
              <span aria-hidden="true" data-dibujar="" className="cota w-6 text-texto" />
              <span className="sr-only">·</span>
            </>
          )}
          <span data-aparecer-texto="">{d}</span>
        </span>
      ))}
    </p>
  );
}

/**
 * Ficha de caso (encargo §7, /trabajos): lámina 3:2 enmarcada con su pie, título en la serif y la
 * línea de ficha con cotas. `data-servicio` para el filtro por anclas de /trabajos.
 */
export function FichaCaso({ trabajo, nivel = "h2" }: { trabajo: Trabajo; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  return (
    <article data-servicio={trabajo.servicio} className="group/caso relative">
      <Foto imagen={trabajo.imagenes[0]} sizes="(min-width: 1024px) 560px, (min-width: 640px) 45vw, 100vw" marco="lamina" />
      <Titulo className="mt-3 font-titulo text-[1.625rem] leading-tight font-normal">
        <Link
          href={`/trabajos/${trabajo.slug}`}
          className="decoration-1 underline-offset-4 group-hover/caso:underline after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-foco"
        >
          {trabajo.titulo}
        </Link>
      </Titulo>
      <LineaFicha datos={datosFicha(trabajo)} className="mt-2" />
    </article>
  );
}
