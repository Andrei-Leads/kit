import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

/** «Ruzafa, Valencia · 2025 · 1 día»: solo los datos que existan. */
export function lineaFicha(t: Pick<Trabajo, "ubicacion" | "anio" | "duracion">): string {
  return [t.ubicacion, t.anio, t.duracion].filter(Boolean).join(" · ");
}

/** Tarjeta de trabajo (encargo §7): foto 4:3, línea de ficha, título, descripción y enlace. */
export function TarjetaTrabajo({ trabajo, nivel = "h2", descripcion = true }: { trabajo: Trabajo; nivel?: "h2" | "h3"; descripcion?: boolean }) {
  const Titulo = nivel;
  const ficha = lineaFicha(trabajo);
  return (
    <article className="h-full">
      <Link href={`/trabajos/${trabajo.slug}`} className="flex h-full flex-col border border-carril bg-superficie text-texto no-underline hover:border-texto">
        <Foto imagen={trabajo.imagenes[0]} decorativa sizes="(min-width: 1280px) 390px, (min-width: 700px) 45vw, 92vw" />
        <span className="flex flex-col gap-1.5 px-4 pt-3.5 pb-4">
          {ficha && <span className="cifras border-b border-carril pb-1.5 text-sm text-texto-suave">{ficha}</span>}
          <Titulo className="text-xl leading-[1.2] font-semibold">{trabajo.titulo}</Titulo>
          {descripcion && <span className="text-[15px] text-pretty text-texto-suave">{trabajo.descripcion}</span>}
          <span className="enlace text-[15px]">Ver el trabajo ›</span>
        </span>
      </Link>
    </article>
  );
}
