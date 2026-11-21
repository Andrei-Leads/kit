import type { CSSProperties } from "react";
import Link from "next/link";
import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

/** «Pozuelo de Alarcón · 2026 · 1 día» (solo los datos que existen). */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "duracion">): string {
  return [t.ubicacion, t.anio?.toString(), t.duracion].filter(Boolean).join(" · ");
}

type Props = {
  trabajos: readonly Trabajo[];
  /** Primera tarjeta grande (bento de /trabajos). En listas cortas (ficha de servicio), todas iguales. */
  destacado?: boolean;
  nivel?: "h2" | "h3";
  /** Solo la primera foto de /trabajos, que queda en la primera pantalla en escritorio. */
  precargar?: boolean;
};

/** Bento de trabajos: el más reciente grande; cada tarjeta con su contexto. */
export function TrabajosBento({ trabajos, destacado = true, nivel = "h2", precargar }: Props) {
  const Titulo = nivel;
  const lista = [...trabajos].sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0));
  return (
    <ul className="rejilla-trabajos m-0 grid list-none grid-flow-dense gap-(--hueco-bento) p-0 sm:grid-cols-2 lg:grid-cols-4">
      {lista.map((t, i) => {
        const grande = destacado && i === 0 && lista.length > 2;
        const meta = metaTrabajo(t);
        return (
          <li
            key={t.slug}
            data-servicio={t.servicio}
            data-aparecer
            style={{ "--i": i } as CSSProperties}
            className={cn(grande && "sm:col-span-2 lg:row-span-2", destacado && i === 1 && lista.length > 2 && "lg:col-span-2")}
          >
            <Link href={`/trabajos/${t.slug}`} className="tarjeta-enlace flex h-full flex-col overflow-hidden rounded-tarjeta bg-superficie p-2.5 text-texto no-underline">
              <Foto
                imagen={t.imagenes[0]}
                decorativa
                preload={precargar && i === 0}
                sizes={grande ? "(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw" : "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"}
                proporcion="4/3"
                className={cn(grande && "lg:aspect-auto lg:min-h-[320px] lg:flex-1")}
              />
              <div className="px-3 pt-4 pb-3">
                {meta && <p className="m-0 text-sm font-semibold text-texto-suave">{meta}</p>}
                <Titulo className={cn("m-0 mt-1.5 font-titulo leading-tight font-bold tracking-[-0.02em] text-balance", grande ? "text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]" : "text-[1.25rem]")}>
                  {t.titulo}
                </Titulo>
                {grande && <p className="m-0 mt-2 text-texto-suave">{t.descripcion}</p>}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Sin trabajos: la galería en bento (la primera foto grande). */
export function GaleriaBento({ galeria }: { galeria: readonly (Imagen & { titulo?: string })[] }) {
  return (
    <ul className="m-0 grid list-none grid-flow-dense gap-(--hueco-bento) p-0 sm:grid-cols-2 lg:grid-cols-4">
      {galeria.map((g, i) => {
        const grande = i === 0 && galeria.length > 2;
        return (
          <li key={g.src} data-aparecer style={{ "--i": i } as CSSProperties} className={cn(grande && "sm:col-span-2 lg:row-span-2")}>
            <figure className="m-0 flex h-full flex-col rounded-tarjeta bg-superficie p-2.5">
              <Foto
                imagen={g}
                preload={i === 0}
                sizes={grande ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"}
                proporcion="4/3"
                className={cn(grande && "lg:aspect-auto lg:min-h-[320px] lg:flex-1")}
              />
              {g.titulo && <figcaption className="px-3 pt-3 pb-2 font-semibold">{g.titulo}</figcaption>}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
